/*
import React, { createContext, useEffect, useState } from "react";
// import all_product from "../Assets/Frontend_Assets/all_product"


export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);

    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))
    },[])

    // console.log(cartItems);
    
    const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(cartItems);
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }
    
    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;
*/
import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = (productCount = 0) => {
    let cart = {};
    for (let index = 0; index < productCount; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState({});

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setAll_Product(data);
                setCartItems(getDefaultCart(data.length));
            })
            .catch((error) => console.error('Failed to fetch products:', error));
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method: 'POST',
                headers: {
                    Accept : 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId": itemId}),
            })
            .then((response)=>response.json())
            .then((data)=> console.lof(data));
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
    };
    // const addToCart = (itemId) => {
    //     setCartItems((prev) => {
    //         // Use the spread operator to avoid mutating the original state
    //         const updatedCart = { ...prev };
    //         updatedCart[itemId] = updatedCart[itemId] + 1;  // Increment the quantity of the selected item
    //         return updatedCart;  // Return the updated cart state
    //     });
    // };
    
    // const removeFromCart = (itemId) => {
    //     setCartItems((prev) => {
    //         const updatedCart = { ...prev };
    //         if (updatedCart[itemId] > 0) {
    //             updatedCart[itemId] = updatedCart[itemId] - 1;  // Decrement the quantity of the selected item
    //         }
    //         return updatedCart;
    //     });
    // };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((total, count) => total + count, 0);
    };

    const contextValue = React.useMemo(() => ({
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
    }), [cartItems, all_product]);

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
