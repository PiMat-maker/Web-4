import React from "react";
import { connect } from "react-redux";
import { userLoginFetch } from "../redux/actions/Fetch";
import {setAnswer} from "../redux/reducers/formReducer";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    errorMessage: ""
  };

  change = (e) => {
      this.props.setAnswer("");
    this.setState({
      [e.target.name]: e.target.value,
      errorMessage: ""
    });
  };

  submit = (e) => {
    e.preventDefault();
    if (this.state.username === "" || this.state.password === "") {
      this.setState({ errorMessage: "Please fill all the fields" });
      console.log(this.state.errorMessage);
      return;
    }
    this.props.userLoginFetch(this.state);
  };

  render() {
    return (
      <form onSubmit={this.submit}>
        <h1 className="headers"> Login </h1>
        <label> Username </label>
        <input
          name="username"
          placeholder="Username"
          value={this.state.username}
          onChange={this.change}
          className="input"
        />
        <br />

        <label> Password </label>
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={this.state.password}
          onChange={this.change}
          className="input"
        />
        <br />
        <br />

        <input className="mainButton" type="submit" value="Login" />

        <br />
        <br />
        <label className="error"> {this.state.errorMessage} </label>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
    setAnswer: (error) => dispatch(setAnswer(error)),
  userLoginFetch: (userInfo) => dispatch(userLoginFetch(userInfo))
});

export default connect(null, mapDispatchToProps)(Login);
