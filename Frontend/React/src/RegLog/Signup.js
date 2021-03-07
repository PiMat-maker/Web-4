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
    this.setState({
      [e.target.name]: e.target.value,
      errorMessage: ""
    });
    this.props.setAnswer("");
  };

  submit = (e) => {
    e.preventDefault();
    this.props.setAnswer("");
    this.setState({
        errorMessage: ""
    })
    if (this.state.username.search(/ /g) !== -1 || this.state.password.search(/ /g) !== -1) {
      this.setState({ errorMessage: "Please fill all the fields or remove spaces" });
      console.log(this.state.errorMessage);
    } else {
        this.props.userPostFetch(this.state);
    }
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
        <label className="error string"> {this.state.errorMessage} </label>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
    setAnswer: (error) => dispatch(setAnswer(error)),
  userPostFetch: (userInfo) => dispatch(userPostFetch(userInfo))
});

export default connect(null, mapDispatchToProps)(Signup);
