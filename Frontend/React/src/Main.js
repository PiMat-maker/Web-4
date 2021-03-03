import React from "react";
import "./styles.css";
import Canvas from "./Canvas";
import Form from "./Form";
import Table from "./Table";
import { logout_user } from "./redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import {unset} from "./redux/reducers/formReducer";

export default function Main() {
  const dispatch = useDispatch();

  const click = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch(unset());
    dispatch(logout_user());
  };

    return (
        <div className="main">
            <div className="canvas">
                <Canvas />
                <div id="back">
                    <label htmlFor={"logout"}>user: {localStorage.getItem("username")}  </label>
                    <button id = "logout" className="mainButton" onClick={click}> Logout </button>
                </div>
            </div>
            <div className="form"><Form /></div>
            <div className="table"><Table /></div>
        </div>
    );
}
