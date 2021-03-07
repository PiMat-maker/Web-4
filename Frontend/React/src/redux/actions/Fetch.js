import { login_user } from "../reducers/userReducer";
import axios from "axios";
import {setAnswer, setTable} from "../reducers/formReducer";
import {serverError} from "../error";

export const userPostFetch = (user) => {

  return (dispatch) => {
    return axios({
      url:
        //"http://127.0.0.1:16161/Lab4a_war_exploded/api/user/register/" +
      "http://localhost:16021/Lab4a_war/api/user/register/" +
          user.username,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: "password=" + user.password
    }).then((resp) => {
          console.log(resp)
        if (resp.data.message) {
            dispatch(setAnswer("Empty request"));
        } else {
            localStorage.setItem("username", user.username)
            localStorage.setItem("token", resp.data)
          dispatch(
            login_user({
              username: user.username,
                token: resp.data.token
            })
          );
            dispatch(getProfileFetch());
        }
      })
        .catch(error => serverError(error, dispatch))
  };
};

export const userLoginFetch = (user) => {

    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("password", user.password);

  return (dispatch) => {
    return axios({
          url: //"http://127.0.0.1:16161/Lab4a_war_exploded/api/user/login/" +
        "http://localhost:16021/Lab4a_war/api/user/login/" +
              user.username,
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "password=" + user.password
      }
    ).then(resp => {
            console.log(user.username)
            if (resp.data.message) {
                dispatch(setAnswer("Empty request"));
            } else {
                localStorage.setItem("username", user.username)
                localStorage.setItem("token", resp.data)
                dispatch(
                    login_user({
                        username: user.username,
                        token: resp.data.token
                    })
                );
                dispatch(getProfileFetch());
            }
        })
        .catch(error => serverError(error, dispatch))
  };
};

export const getProfileFetch = () => {
  console.log("getProfileFetch");
  return (dispatch) => {
    const token = localStorage.token;
    if (token) {
        return axios(
            //"http://127.0.0.1:16161/Lab4a_war_exploded/api/points/" +
            "http://localhost:16021/Lab4a_war/api/points/" +
            localStorage.getItem("username"),
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer,${localStorage.getItem("token")}`
                }
            }
      )
          .then((resp) => {
              console.log("DATA FROM Profile = " + resp.data);
              if (resp) {
                  dispatch(setTable(resp.data));
                  console.log("setTable in profile");
              } else {
                  dispatch(setAnswer("Empty request"));
              }
          })
            .catch(error => serverError(error, dispatch))
    }
  };
};
