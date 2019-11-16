import React, { Component } from 'react';

export default class AuthForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      err: null
    };
  }

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = async e => {
    e.preventDefault();
    debugger
    try {
      const user = await this.props.authService(this.state);
      this.props.setUserState(user);
      this.props.history.push('/profile');
    } catch (err) {
      const { message } = err.response.data;
      this.setState({ err: message });
    }
  };

  render() {
    debugger
    return (
      <div>
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
          <button type="submit">{this.props.btnText}</button>
        </form>
        {this.state.err && <p className="error">{this.state.err}</p>}
      </div>
    );
  }
}
