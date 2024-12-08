// 1
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
// 2

// import React, { createContext, useEffect, useState } from "react";

// export const ShopContext = createContext(null);

// const getDefaultCart = (productCount = 0) => {
//     let cart = {};
//     for (let index = 0; index < productCount; index++) {
//         cart[index] = 0;
//     }
//     return cart;
// };

// const ShopContextProvider = (props) => {
//     const [all_product, setAll_Product] = useState([]);
//     const [cartItems, setCartItems] = useState({});

//     useEffect(() => {
//         fetch('http://localhost:4000/allproducts')
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setAll_Product(data);
//                 setCartItems(getDefaultCart(data.length));
//             })
//             .catch((error) => console.error('Failed to fetch products:', error));
//     }, []);

//     const addToCart = (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//         if(localStorage.getItem('auth-token')){
//             fetch('http://localhost:4000/addtocart',{
//                 method: 'POST',
//                 headers: {
//                     Accept : 'application/form-data',
//                     'auth-token': `${localStorage.getItem('auth-token')}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({"itemId": itemId}),
//             })
//             .then((response)=>response.json())
//             .then((data)=> console.log(data));
//         }
//     };

//     const removeFromCart = (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
//     };
//     // const addToCart = (itemId) => {
//     //     setCartItems((prev) => {
//     //         // Use the spread operator to avoid mutating the original state
//     //         const updatedCart = { ...prev };
//     //         updatedCart[itemId] = updatedCart[itemId] + 1;  // Increment the quantity of the selected item
//     //         return updatedCart;  // Return the updated cart state
//     //     });
//     // };
    
//     // const removeFromCart = (itemId) => {
//     //     setCartItems((prev) => {
//     //         const updatedCart = { ...prev };
//     //         if (updatedCart[itemId] > 0) {
//     //             updatedCart[itemId] = updatedCart[itemId] - 1;  // Decrement the quantity of the selected item
//     //         }
//     //         return updatedCart;
//     //     });
//     // };

//     /*
//     const getTotalCartAmount = () => {
//         let totalAmount = 0;
//         for (const item in cartItems) {
//             if (cartItems[item] > 0) {
//                 const itemInfo = all_product.find((product) => product.id === Number(item));
//                 if (itemInfo) { 
//                     totalAmount += itemInfo.new_price * cartItems[item];
//                 }
//             }
//         }
//         return totalAmount;
//     };

//     const getTotalCartItems = () => {
//         return Object.values(cartItems).reduce((total, count) => total + count, 0);
//     };
//     */

//     const getTotalCartAmount = React.useCallback(() => {
//         let totalAmount = 0;
//         for (const item in cartItems) {
//             if (cartItems[item] > 0) {
//                 const itemInfo = all_product.find((product) => product.id === Number(item));
//                 if (itemInfo) {
//                     totalAmount += itemInfo.new_price * cartItems[item];
//                 }
//             }
//         }
//         return totalAmount;
//     }, [cartItems, all_product]);
    
//     const getTotalCartItems = React.useCallback(() => {
//         return Object.values(cartItems).reduce((total, count) => total + count, 0);
//     }, [cartItems]);
    

//     const contextValue = React.useMemo(() => ({
//         getTotalCartItems,
//         getTotalCartAmount,
//         all_product,
//         cartItems,
//         addToCart,
//         removeFromCart,
//     }), [cartItems, all_product]);

//     return (
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     );
// };

// export default ShopContextProvider;

// 3

import React, { createContext, useEffect, useState, useCallback } from "react";

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

    // Fetch all products and initialize the cart
    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setAll_Product(data))
            .catch((error) => console.error('Failed to fetch products:', error));
    }, []);

    useEffect(() => {
        if (all_product.length > 0) {
            setCartItems(getDefaultCart(all_product.length));
        }
    }, [all_product]);

    // Add to cart

    // this is ginv NaN error 
    // const addToCart = (itemId) => {
    //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    //     if (localStorage.getItem('auth-token')) {
    //         fetch('http://localhost:4000/addtocart', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/form-data',
    //                 'auth-token': localStorage.getItem('auth-token'),
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ itemId }),
    //         })
    //             .then((response) => response.json())
    //             .then((data) => console.log(data))
    //             .catch((error) => console.error('Failed to add to cart:', error));
    //     }
    // };
    // here NaN error resolved
    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1, // Initialize with 0 if undefined
        }));
    
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Failed to add to cart:', error));
        }
    };
    

    // Remove from cart
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
    };

    // Calculate total cart amount
    const getTotalCartAmount = useCallback(() => {
        return Object.entries(cartItems).reduce((total, [itemId, count]) => {
            const product = all_product.find((product) => product.id === Number(itemId));
            return total + (product?.new_price || 0) * count;
        }, 0);
    }, [cartItems, all_product]);

    // Calculate total cart items
    const getTotalCartItems = useCallback(() => {
        return Object.values(cartItems).reduce((total, count) => total + count, 0);
    }, [cartItems]);

    // Memoized context value
    const contextValue = React.useMemo(() => ({
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
    }), [cartItems, all_product, getTotalCartAmount, getTotalCartItems]);

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
