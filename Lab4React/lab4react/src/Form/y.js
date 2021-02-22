import React from "react";
import { Slider } from "primereact/slider";
import "primeicons/primeicons.css";
import "primereact/resources/themes/md-light-deeppurple/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./Slider.css";
import { setY } from "../redux/reducers/formReducer";
import { useSelector, useDispatch } from "react-redux";

export default function Y() {
  console.log("Slider");
  const value = useSelector((state) => state.form.y);
  console.log(value);
  const dispatch = useDispatch();

  return (
    <div className="y">
      <label className="string" htmlFor="slider">
        Y from -5 to 5
      </label>
      <Slider
        id="slider"
        min={-50000}
        max={50000}
        value={value*10000}
        onChange={(e) => dispatch(setY(e.value/10000))}
      />
      <label className="string" htmlFor="slider">
        Value: {value}{" "}
      </label>
    </div>
  );
}
