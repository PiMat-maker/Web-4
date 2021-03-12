import {setAnswer, setTable} from "../reducers/formReducer";
import axios from "axios";
import {serverError} from "../error";

export const FormPostFetch = (arrays) => {

  return (dispatch) => {
    return axios(
      //"http://127.0.0.1:16161/Lab4a_war_exploded/api/points/" +
        "http://localhost:16021/Lab4a_war/api/points/" +
        localStorage.getItem("username"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer,${localStorage.getItem("token")}`
        },
        data: "x=" + encodeURI(arrays.x) + "&y=" + encodeURI(arrays.y) + "&r=" + encodeURI(arrays.r)
      }
    ).then((resp) => {
        if (resp) {
          dispatch(setTable(resp.data));
        } else {
            dispatch(setAnswer("Empty request"));
        }
      })
        .catch(error => serverError(error, dispatch))
  };
};
