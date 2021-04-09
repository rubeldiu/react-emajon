import React, { useEffect, useState } from "react";
import "./Shop.css";

import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { Link } from "react-router-dom";
const Shop = () => {
  //const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search,setSearch]=useState('')
  //console.log(products);
  document.title="Shop More";


  useEffect(()=>{
     fetch('https://aqueous-temple-36330.herokuapp.com/products?search='+search)
     .then(res => res.json())
     .then(data => setProducts(data))
  },[search])

// Server Side Code 
// const search=req.query.search;
// productCollection.find({name: {$regex:search}})
    
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    fetch('https://aqueous-temple-36330.herokuapp.com/productByKeys', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))

  }, []);

  const handleAddToCart = (product) => {
    //console.log('product added',product);
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };
  
  const handleSearch=(event)=>{
    setSearch(event.target.value);
  }

  return (
    <div className="shop-container">
      <div className="product-container">
      <input type="text" onBlur={handleSearch} placeholder="search product"/>
        {products.length===0 && <p>loading....</p>}
        {products.map((product) => (
          <Product
            key={product.key}
            showAddToCart={true}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="main-button">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
