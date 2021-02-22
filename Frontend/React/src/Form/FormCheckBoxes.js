import React, { useState } from "react";
import checkboxValues from "./constants";
import { Checkbox } from "primereact/checkbox";
import "primeicons/primeicons.css";
//import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { useSelector, useDispatch } from "react-redux";
import { setX, setR, setAnswer } from "../redux/reducers/formReducer";

export default function FormCheckBoxes(props) {
  const [variable] = useState(props.variable);
  const form = useSelector((state) => state.form);
  const selectedIndexes = variable === "X" ? form.x : form.r;
  const dispatch = useDispatch();

  //console.log(selectedIndexes.some(item => item === 1));

  const onIndexChange = (e) => {
    //clean error if we have it
    dispatch(setAnswer(""))
    let selectedItems = [...selectedIndexes];
    console.log(selectedItems);

    if (e.checked) {
      selectedItems.push(e.value);
    } else {
      for (let i = 0; i < selectedItems.length; i++) {
        if (selectedItems[i] === e.value) {
          selectedItems.splice(i, 1);
          break;
        }
      }
    }

    if (variable === "X") {
      dispatch(setX(selectedItems));
    } else {
      dispatch(setR(selectedItems));
    }
  };

  console.log("check" + variable);

  const checkbox = checkboxValues.map((index) => (
    <div key={index} className={"checkbox" + variable}>
      <Checkbox
        inputId={index + variable}
        value={index}
        onChange={onIndexChange}
        checked={selectedIndexes.some((item) => item === index)}
      />
      <label htmlFor={index + variable} className="checkbox-label">
        {index}
      </label>
    </div>
  ));

  return (
    <div className="block">
      <table>
        <tbody>
          <tr>
            <td>{checkbox[0]}</td>
            <td>{checkbox[1]}</td>
            <td>{checkbox[2]}</td>
          </tr>
          <tr>
            <td>{checkbox[3]}</td>
            <td>{checkbox[4]}</td>
            <td>{checkbox[5]}</td>
          </tr>
          <tr>
            <td>{checkbox[6]}</td>
            <td>{checkbox[7]}</td>
            <td>{checkbox[8]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
