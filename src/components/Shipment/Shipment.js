import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import ProcessPayment from "../ProcessPayment/ProcessPayment";
import "./Shipment.css";

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const [shippingData,setShippingData]=useState(null);
  const onSubmit = (data) => {
    setShippingData(data);
  };

  const handlePaymentSuccess = (paymentId)=>{
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: shippingData,
      orderTime: new Date(),
      paymentId

    };
    fetch("https://aqueous-temple-36330.herokuapp.com/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          processOrder();
          alert("Your order has been placed successfully");
        }
      });

  }
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  return (
    <div className="row">
      <div style={{display:shippingData ? 'none' :'block'}} className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            name="name"
            defaultValue={loggedInUser.name}
            ref={register({ required: true })}
            placeholder="Your Name"
          />
          {errors.name && <span className="error">Name is required</span>}

          <input
            name="email"
            defaultValue={loggedInUser.email}
            ref={register({ required: true })}
            placeholder="Your Email"
          />
          {errors.email && <span className="error">Email is required</span>}

          <input
            name="address"
            ref={register({ required: true })}
            placeholder="Your Address"
          />
          {errors.address && <span className="error">Address is required</span>}

          <input
            name="phone"
            ref={register({ required: true })}
            placeholder="Your Phone Number"
          />
          {errors.phone && <span className="error">Phone is required</span>}

          <input type="submit" />
        </form>
      </div>
      <div style={{display:shippingData ? 'block' :'none'}} className="col-md-6">
        <h2>Please Pay for me</h2>
        <ProcessPayment handlePayment={handlePaymentSuccess}/>
      </div>
    </div>
  );
};

export default Shipment;
