import React, { Component } from "react";
import AuthService from "../api/authService";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      err: null
    };
    this.authService = new AuthService();
  }

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = async e => {
    e.preventDefault();
    try {
      const user = await this.authService.login(this.state);
      this.props.setUserState(user);
      this.props.history.push("/profile");
    } catch (err) {
      const { message } = err.response.data;
      this.setState({ err: message });
    }
  };

  render() {
    return (
      <div>
        <h1>Login!</h1>
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
        {this.state.err && <p className="error">{this.state.err}</p>}
      </div>
    );
  }
}
