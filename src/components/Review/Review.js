import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import  './Review.css'
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';
const Review = () => {
    const [cart,setCart]=useState([]);
    const [orderPlaced,setOrderPlaced]=useState(false);
    const history=useHistory();


    const handleProceedCheckout = () =>{
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
        history.push('/shipment');
    }

    let thankYou;
    if(orderPlaced){
       thankYou=<img src={happyImage} alt=""/>
    } 
    
    const removeProduct=(producyKey)=>{
        //console.log("removed clicked",producyKey);
        const newCart=cart.filter(pd=>pd.key!==producyKey);
        setCart(newCart);
        removeFromDatabaseCart(producyKey);
    }
    useEffect(()=>{
      const savedCart= getDatabaseCart();
      const productKeys=Object.keys(savedCart);
      const cartProducts= productKeys.map(key =>{
         const product=fakeData.find(pd =>pd.key===key);
         product.quantity=savedCart[key];
         return product;
     })
     setCart(cartProducts);
    },[])
    return (
        <div className="shop-container">
            <div className="product-container">
            {
              cart.map(pd=><ReviewItem key={pd.key} product={pd} removeProduct={removeProduct}/>)  
            }
            {
                thankYou
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                   <button className="main-button" onClick={handleProceedCheckout}>Proceed Checkout</button> 
                </Cart>
            </div>
        </div>
    );
};

export default Review;