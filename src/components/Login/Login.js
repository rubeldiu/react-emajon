import React, { useContext, useState } from "react";

import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  createUserWithEmailAndPassword,
  handleFbSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from "./LoginManager";

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    password: "",
    error: "",
    success: false,
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
    //   setUser(res);
    //   setLoggedInUser(res);
    //   history.replace(from);
    handleResponse(res,true)
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
    //   setUser(res);
    //   setLoggedInUser(res);
    handleResponse(res,false)
    });
  };

  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
        handleResponse(res,true)
    });
  };

  const handleSubmit = (e) => {
    // console.log(user.email,user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
        //   setUser(res);
        //   setLoggedInUser(res);
        //   history.replace(from);
        handleResponse(res,true)
        }
      );
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        // setUser(res);
        // setLoggedInUser(res);
        // history.replace(from);
        handleResponse(res,true)
      });
    }
    e.preventDefault();
  };
  const handleBlur = (event) => {
    // debugger;
    let isFieldValid = true;

    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={signOut}> Sign out</button>
      ) : (
        <button onClick={googleSignIn}> Sign In</button>
      )}
      <br />
      <button onClick={fbSignIn}>Login using Facebook</button>
      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name} </p>
          <p>Email : {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <h1>Our own Authentication</h1>
      {/* <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New user Sign up </label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            placeholder="Your name"
            onBlur={handleBlur}
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="Email address"
          required
        />{" "}
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="Password"
          required
        />
        <br></br>
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>
      <p style={{ color: "Red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "Created" : "Logged In"} Successfullly!!!
        </p>
      )}
    </div>
  );
};

export default Login;
