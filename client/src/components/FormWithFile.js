import React, { Component } from 'react';
import UploadService from "../api/uploadService";

export default class FormWithFile extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
        err: null
    }
  }
  submitHandler = async e => {
    e.preventDefault();
    try {
      const formData = new FormData(this.formRef.current)
      const {profilePicture} = await this.props.uploadProfilePicture(formData);
      this.props.setUserState({username: this.props.username, profilePicture});
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
          <button type="submit">Upload</button>
        </form>
        {this.state.err && <p className="error">{this.state.err}</p>}
      </div>
    );
  }
}
