import React from "react";
import { connect } from "react-redux";
import { userPostFetch } from "../redux/actions/Fetch";
import {setAnswer} from "../redux/reducers/formReducer";

class Signup extends React.Component {
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
    this.props.userPostFetch(this.state);
  };

  render() {
    return (
      <form id = "singup_form"  onSubmit={this.submit}>
        <h1 className="headers"> Sign Up </h1>

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
          value={this.state.password}
          onChange={this.change}
          type="password"
          className="input"
        />
        <br />
        <br />

        <input className="mainButton" type="submit" value="Sign Up" />

        <br />
        <br />
        <label className="error"> {this.state.errorMessage} </label>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
    setAnswer: (error) => dispatch(setAnswer(error)),
  userPostFetch: (userInfo) => dispatch(userPostFetch(userInfo))
});

export default connect(null, mapDispatchToProps)(Signup);
