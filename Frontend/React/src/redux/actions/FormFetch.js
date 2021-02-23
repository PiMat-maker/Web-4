import {setAnswer, setTable} from "../reducers/formReducer";
import axios from "axios";
import {serverError} from "../error";

export const FormPostFetch = (formData) => {

  return (dispatch) => {
    return axios(
      "http://127.0.0.1:16161/Lab4a_war_exploded/api/points/" +
        localStorage.getItem("username"),
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer,${localStorage.getItem("password")},${localStorage.getItem("token")}`
        },
        data: formData
      }
    ).then((resp) => {
        console.log("DATA FROM FORMPOSTFETCH = " + resp.data);
        if (resp) {
          dispatch(setTable(resp.data));
        } else {
            dispatch(setAnswer("Empty request"));
        }
      })
        .catch(error => serverError(error, dispatch))
  };
};
