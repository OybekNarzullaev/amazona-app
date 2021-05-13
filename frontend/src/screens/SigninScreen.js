import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
function SigninScreen(props) {
  //email va password uchun hozircha react hook yozib turamiz
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  console.log(redirect);

  // muvafaqqiyatli signin qilingan user ma'lumotlarini olish
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (event) => {
    // bu submit tugmasi bosilganda sahifa refrech bo'lmasligi uchun
    event.preventDefault();
    // to do: action
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
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
