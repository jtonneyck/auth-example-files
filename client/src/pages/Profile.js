import React, { Component } from "react";
// I wanna my see mah name
// I wanna logout

export default class Profile extends Component {
  render() {
    return <div>{this.props.user.username}</div>;
  }
}
