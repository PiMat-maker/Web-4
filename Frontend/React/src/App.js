import React from "react";
import "./styles.css";
import Signup from "./RegLog/Signup";
import Main from "./Main";
import Login from "./RegLog/Login";
import {Switch, Route, withRouter, Redirect, Link} from "react-router-dom";
import { connect } from "react-redux";
import { getProfileFetch } from "./redux/actions/Fetch";

class App extends React.Component {
  state = {
    url: "/"
  };

  clicked = (e) => {
    this.setState({
      url: e.target.to
    });
  };

  render() {
    return this.props.currentUser.username ? (
      <div className="main">
        <Route path="/main">
          <Main />
        </Route>
        <Redirect to="/main" />
      </div>
    ) : (
      <div className="route">
          <Redirect to="/"/>
        <Link
          type="submit"
          to="/signup"
          onClick={this.clicked}
          value="For Sign Up"
          className="headButton"
        >For Sign Up</Link>
        <Link
          type="submit"
          to="/login"
          onClick={this.clicked}
          value="For Login"
          className="headButton"
        >For Login</Link>


        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
          <br/>
          <label className="error"> {this.props.form.answer} </label>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProfileFetch: () => dispatch(getProfileFetch())
});

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
    form: state.form
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
