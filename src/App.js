import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";
import Home from "./containers/Home";
import SignUp from "./containers/SignUp";
import LogIn from "./containers/LogIn";
import Profile from "./containers/Profile";
import Publish from "./containers/Publish/Publish";
import Header from "./components/Header";
import Offer from "./containers/Offer/Offer";
import Offers from "./containers/Offers/Offers";

class App extends Component {
  state = {
    user: {
      token: Cookies.get("token") || "",
      username: Cookies.get("username") || "",
      _id: Cookies.get("_id") || ""
    }
  };

  setUser = user => {
    Cookies.set("token", user.token);
    Cookies.set("username", user.username);
    Cookies.set("_id", user._id);

    this.setState({ user: user });
  };
  // logIn = (_id, username,email,token) => {
  //   this.setState({
  //     _id:_id,
  //       username: username,
  //       email: email,
  //      token:token
  //     });
  //     Cookies.set("_id",_id);
  //     Cookies.set("username",username);
  //     Cookies.set("email",email);
  //      Cookies.set("token",token);
  //   };

  logOut = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("_id");

    this.setState({
      user: {
        token: "",
        username: "",
        _id: ""
      }
    });
  };

  render() {
    const { user } = this.state;
    return (
      <Router>
        <Fragment>
          <Header user={user} logOut={this.logOut} />
          <div className="container">
            <Route
              exact
              path="/"
              render={props => <Home {...props} user={user} />}
            />
            <Route
              path="/sign_up"
              //component={SignUp}
              // fonction qui se declenche losque app sera raffraichi
              // render={props => /<SignUp {...props} logIn={this.logIn} / }
              //{...props} Spread Operator = history={props.history} location={props.location}
              render={props => (
                <SignUp {...props} user={user} setUser={this.setUser} />
              )}
            />
            <Route
              path="/log_in"
              render={props => (
                <LogIn {...props} user={user} setUser={this.setUser} />
              )}
            />
            <Route path="/offer/:id" render={props => <Offer {...props} />} />
            <Route
              path="/offers/"
              render={props => (
                <Offers {...props} user={user} setUser={this.setUser} />
              )}
            />
            <Route
              path="/profile/:id"
              render={props => <Profile {...props} user={user} />}
            />
            <Route
              path="/publish"
              render={props => <Publish {...props} user={user} />}
            />
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
