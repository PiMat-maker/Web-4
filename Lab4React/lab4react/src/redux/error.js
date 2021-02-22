import {setAnswer} from "./reducers/formReducer";

export function serverError(error, dispatch){
        let answer = "Internal Error";
        if (error.response !== undefined){
                let status = error.response.status;
                if (status === 400 || status === 415) answer = "Wrong data format";
                if (status === 401) answer = "You've not been authorized. Try again";
                if (status === 404) answer = "Connection failed";
                if (status === 403) answer = "User with the same already existed";
        } else{
                answer = "Connection lost";
        }
        dispatch(setAnswer(answer));
}