import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ user, logout }) {
  if (user)
    return (
      <nav>
        <Link to="/profile">See Profile</Link>
        <Link to="/">Home</Link>
        <Link onClick={logout} to="/">
          Logout
        </Link>
      </nav>
    );
  return (
    <nav>
      <Link to="/auth">Login or register</Link>
      <Link to="/">Home</Link>
    </nav>
  );
}
