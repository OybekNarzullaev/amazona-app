import React, { useState } from "react";
import { Link } from "react-router-dom";
function SigninScreen() {
  //email va password uchun hozircha react hook yozib turamiz
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (event) => {
    // bu submit tugmasi bosilganda sahifa refrech bo'lmasligi uchun
    event.preventDefault();
    // to do: action
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          New user? <Link to="/register">Create your account</Link>
        </div>
      </form>
    </div>
  );
}

export default SigninScreen;
