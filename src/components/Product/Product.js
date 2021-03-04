import React from 'react';
import  './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
   // console.log(props);
    const{img,name,seller,price,stock,key}=props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className="product-name">
                   <Link to={"/product/"+key}>{name}</Link>
                </h4>
                <p>Seller : {seller}</p>
                <p>Price : {price}</p>
                <p>Stock : {stock}</p>
               { props.showAddToCart && <button className="main-btn" onClick={()=>props.handleAddToCart(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart}/>
                    Add to cart
                 </button>}
            </div>
            
        </div>
    );
};

export default Product;