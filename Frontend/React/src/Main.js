import React from "react";
import "./styles.css";
import Canvas from "./Canvas";
import Form from "./Form";
import Table from "./Table";
import { logout_user } from "./redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import {unset} from "./redux/reducers/formReducer";
//import { Redirect } from "react-router-dom";

export default function Main() {
  const dispatch = useDispatch();
  //const currentUser = useSelector((state) => state.user.currentUser)

  const click = (e) => {
    //console.log(currentUser.username)
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch(unset());
    dispatch(logout_user());
  };

  return (
    <div className="main">
        <header>
            <label htmlFor={"logout"}>user: {localStorage.getItem("username")}  </label>
            <button id = "logout" className="mainButton" onClick={click}> Logout </button>
        </header>
      <Canvas />
      <Form />
      <Table />
    </div>
  );
}
