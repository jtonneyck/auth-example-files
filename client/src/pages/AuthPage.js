import React, { Component } from 'react';
import AuthService from '../api/authService';
import Form from '../components/Form';

export default class Register extends Component {
  constructor() {
    super();
    this.authService = new AuthService();
  }

  render() {
    return (
      <div className="flex-container">
        <div>
          <h1>Login</h1>
          <Form
            {...this.props}
            authService={this.authService.login}
            btnText="Login"
          />
        </div>

        <h1>or</h1>

        <div>
          <h1>Register</h1>
          <Form
            {...this.props}
            authService={this.authService.register}
            btnText="Register"
          />
        </div>
      </div>
    );
  }
}
