import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
function RegisterScreen(props) {
  //email va password uchun hozircha react hook yozib turamiz
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  console.log(redirect);

  // muvafaqqiyatli signin qilingan user ma'lumotlarini olish
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (event) => {
    // bu submit tugmasi bosilganda sahifa refrech bo'lmasligi uchun
    event.preventDefault();
    // to do: action
    if (password !== confirmPassword) {
      alert(`parolni to'g'ri takrorlang`);
    } else {
      dispatch(register(name, email, password));
    }
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
          <h1>Create Account</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div></div>
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
          <label htmlFor="comfirmPassword">Confirm Password</label>
          <input
            type="password"
            id="comfirmPassword"
            placeholder="Enter your confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          Alredy have your account?{" "}
          {
            // Linkni ma'nosi siginin qilingan bo'lsa redurectni muhit o'zgaruvchisiga o'tkazish
          }
          <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterScreen;
