import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart=props.cart;
   // const itemPrice=cart.reduce((ack,item)=>ack+item.price*item.quantity,0);
   let  itemPrice=0;
   for (let i = 0; i < cart.length; i++) {
       const product = cart[i];
       itemPrice=itemPrice+product.price*product.quantity;
   }
   const taxPrice=itemPrice*0.14;
    //const shippingPrice = itemPrice > 50 ? 0: 4;
    let shipping=0;
    if(itemPrice >35){
        shipping=0;
    }
    else if(itemPrice >15){
        shipping=4.99;
    }else if(itemPrice > 0){
        shipping=12.99;
    }
    const totalPrice= itemPrice+taxPrice+shipping;
    

    const formatNumber=num=>{
        const precision=num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h4>Order Summery</h4>
            <p>Item Ordered : {cart.length}</p>
            <p>Product Price: {formatNumber(itemPrice)}</p>
            <p>Tax: {formatNumber(taxPrice)}</p>
            <p>Shipping : {formatNumber(shipping)}</p>
            <p>Total : {formatNumber(totalPrice)}</p>
            <br/>
            {
                props.children
            }
            
            
        </div>
    );
};

export default Cart;