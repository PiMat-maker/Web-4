import {setAnswer, setTable} from "../reducers/formReducer";
import axios from "axios";
import {serverError} from "../error";

export const FormPostFetch = (arrays) => {

    let str = ""
    for (let i = 0;i<arrays.x.length;++i){
        str += `x[]=${arrays.x[i]}&`
    }
    for (let i = 0;i<arrays.y.length;++i){
        str += `y[]=${arrays.y[i]}&`
    }
    for (let i = 0;i<arrays.r.length;++i){
        if (i + 1 === arrays.r.length) {
            str += `r[]=${arrays.r[i]}`
        } else {
            str += `r[]=${arrays.r[i]}&`
        }
    }
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
        data: str
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
