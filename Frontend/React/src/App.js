import React from "react";
import "./styles.css";
import Signup from "./RegLog/Signup";
import Main from "./Main";
import Login from "./RegLog/Login";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileFetch } from "./redux/actions/Fetch";
//import {setAnswer} from "./redux/reducers/formReducer";

class App extends React.Component {
  state = {
    url: "/"
  };

  clicked = (e) => {
    this.setState({
      url: e.target.name
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
        <input
          type="submit"
          name="/signup"
          onClick={this.clicked}
          value="For Sign Up"
          className="headButton"
        />
        <input
          type="submit"
          name="/login"
          onClick={this.clicked}
          value="For Login"
          className="headButton"
        />
        <Redirect to={this.state.url} />

        <Switch>
          <Route path="/signup">
            {" "}
            <Signup />{" "}
          </Route>
          <Route path="/login">
            {" "}
            <Login />{" "}
          </Route>
        </Switch>
          <br/>
          <label className="error"> {this.props.form.answer} </label>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
    //setAnswer: (error) => dispatch(setAnswer(error)),
  getProfileFetch: () => dispatch(getProfileFetch())
});

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
    form: state.form
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
