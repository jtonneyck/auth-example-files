import React from 'react';
import FormWithFile from "../components/FormWithFile";
import "./Profile.css";
import UploadService from "../api/uploadService";

export default class Profile extends React.Component {
  //({ username, profilePicture, ...props })

  constructor(props) {
    super(props);
    this.uploadProfilePicture = new UploadService().uploadProfilePicture;
  }

  render() {
    return (
      <div className="profile">
        <h1>Hi, {this.props.username}!</h1>
        <h2>Welcome to your profile</h2>
        <img src={this.props.profilePicture} alt=""/>
        <FormWithFile {...this.props} username={this.props.username} uploadProfilePicture={this.uploadProfilePicture} />
      </div>
    );
  }
}
