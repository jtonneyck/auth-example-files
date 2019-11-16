import React from 'react';

export default function Profile({ username, profilePicture }) {
  debugger
  return (
    <div>
      <h1>Hi, {username}!</h1>
      <h2>Welcome to your profile</h2>
      <img src={profilePicture} alt=""/>
    </div>
  );
}
