import React, { useEffect, useState } from 'react'
import './NewCollections.css'
// import new_collections from '../../Assets/Frontend_Assets/new_collections'
import Item from '../Item/Item'

const NewCollections = () => {
    const [new_collections, setNew_Collection] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:4000/newcollections')
        .then((response)=>response.json())
        .then((data)=>setNew_Collection(data));
    },[])
    // here, [] means, useEffect will be executed only once

    return (
        <div className='new_collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className='new_collections_item'>
                {new_collections.map((item, index)=>{
                    return <Item 
                        key={index} 
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default NewCollections
