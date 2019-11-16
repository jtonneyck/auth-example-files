import React, { Component } from 'react';
import UploadService from "../api/uploadService";

export default class AuthForm extends Component {
  constructor() {
    super();
    this.uploadService = new UploadService();
    this.formRef = React.createRef();
  }
  submitHandler = async e => {
    e.preventDefault();
    try {
      const formData = new FormData(this.formRef.current)
      const {profilePicture} = await this.uploadService(formData));
    } catch (err) {
      const { message } = err.response.data;
      this.setState({ err: message });
    }
  };

  render() {
    return (
      <div>
        <form ref={this.formRef} onSubmit={this.submitHandler}>
          <input
            type="file"
            name="picture"
          />
          <button type="submit">{this.props.btnText}</button>
        </form>
        {this.state.err && <p className="error">{this.state.err}</p>}
      </div>
    );
  }
}
