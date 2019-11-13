import React, { Component } from 'react';
import './App.css';
import AuthService from './api/authService';
import { Switch, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import Loader from './components/Loader';
import NavBar from './components/NavBar';
import AuthPage from './pages/AuthPage';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      isLoadingUser: true
    };
    this.authService = new AuthService();
  }

  //Every time starts check if user session exists and retrieve user data.
  componentDidMount = async () => {
    let user;
    try {
      //Making the actual API call.
      user = await this.authService.isLoggedIn();
    } catch (err) {
      user = null;
    } finally {
      //Irregardless of the result we want to set state.
      this.setUserState(user);
    }
  };

  setUserState = user => {
    // If user is loggedIn state will be set with user,
    // otherwise user will be null.
    this.setState({ user, isLoadingUser: false, err: null });
  };

  logout = async () => {
    //destroy session.
    try {
      await this.authService.logout();
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ user: null });
    }
  };

  render() {
    // Initially we do not know yet whether an user is logged in or not so we just return a loader.
    if (this.state.isLoadingUser)
      return <Loader className="full-screen-loader" />;
    return (
      <div className="App">
        <NavBar user={this.state.user} logout={this.logout} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/auth"
            render={props => (
              <AuthPage {...props} setUserState={this.setUserState} />
            )}
          />
          <PrivateRoute
            path="/profile"
            user={this.state.user}
            component={Profile}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}
