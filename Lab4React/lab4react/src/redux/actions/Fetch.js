import { login_user } from "../reducers/userReducer";
import axios from "axios";
import {setAnswer, setTable} from "../reducers/formReducer";
import {serverError} from "../error";

export const userPostFetch = (user) => {

    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("password", user.password);

  return (dispatch) => {
    return axios({
      url:
        "http://127.0.0.1:16161/Lab4a_war_exploded/api/user/register/" +
          user.username,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: formData
    }).then((resp) => {
          console.log(resp)
        if (resp.data.message) {
            dispatch(setAnswer("Empty request"));
        } else {
            localStorage.setItem("username", resp.data.username)
            localStorage.setItem("password", resp.data.password)
            localStorage.setItem("token", resp.data.token)
          dispatch(
            login_user({
              username: resp.data.username,
              password: resp.data.password,
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
          url: "http://127.0.0.1:16161/Lab4a_war_exploded/api/user/login/" +
              user.username,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
            Authorization: `Bearer,${user.password}`
        }
      }
    ).then(resp => {
            console.log(resp.data.username)
            if (resp.data.message) {
                dispatch(setAnswer("Empty request"));
            } else {
                localStorage.setItem("username", resp.data.username)
                localStorage.setItem("password", resp.data.password)
                localStorage.setItem("token", resp.data.token)
                dispatch(
                    login_user({
                        username: resp.data.username,
                        password: resp.data.password,
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
            "http://127.0.0.1:16161/Lab4a_war_exploded/api/form/" +
            localStorage.getItem("username"),
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer,${localStorage.getItem("password")},${localStorage.getItem("token")}`
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
