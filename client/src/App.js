import React, { Component } from "react";
import "./App.css";
import AuthService from "./api/authService";
import { Switch, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      user: null,
      err: null,
      isLoadingUser: true
    };
    this.authService = new AuthService();
  }

  componentDidMount = async () => {
    try {
      const user = await this.authService.isLoggedIn();
      debugger;
      this.setState({ user, err: null, isLoadingUser: false });
    } catch (err) {
      console.log(err);
      this.setState({ isLoadingUser: false });
    }
  };

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  logoutUser = async () => {
    try {
      const loggedOut = await this.authService.logout();
    } catch (err) {
      console.log(err);
    } finally {
      debugger;
      this.setState({ user: null });
    }
  };

  submitHandler = async e => {
    e.preventDefault();
    try {
      const userInput = {
        username: this.state.username,
        password: this.state.password
      };
      const user = await this.authService.login(userInput);
      this.setState({ user, err: null });
    } catch (err) {
      const { message } = err.response.data;
      this.setState({ err: message });
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <form onSubmit={this.submitHandler}>
          <input
            onChange={this.onChangeHandler}
            type="text"
            name="username"
            placeholder="Your username"
          />
          <input
            onChange={this.onChangeHandler}
            type="password"
            name="password"
            placeholder="Your password"
          />
          <button type="submit">Login!</button>
        </form>
        {this.state.err && <p>{this.state.err}</p>}
        <p onClick={this.logoutUser}>Logout</p>

        {!this.state.isLoadingUser ? (
          <Switch>
            <PrivateRoute
              path="/profile"
              user={this.state.user}
              component={Profile}
            />
          </Switch>
        ) : (
          <p>...Loading</p>
        )}
      </div>
    );
  }
}
