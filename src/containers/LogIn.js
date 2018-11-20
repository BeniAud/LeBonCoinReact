import React, { Component } from "react";
import axios from "axios";
import "./LogIn.css";
import { Link } from "react-router-dom";
class LogIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({ [name]: value });
  };

  onSubmit = event => {
    axios
      .post("https://leboncoin-api.herokuapp.com/api/user/log_in", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response.data);
        // {
        //   account: {
        //     username: "farid";
        //   }
        //   token: "WKOCjBUoSZRfbicPLNVlCzrZPGKNA2YkcKBB9vwb8r9ysZJgoGCjJu0bhXJZgOZ8";
        //   _id: "5bf3c652d3e6e00014dd74bf";
        // }

        if (response.data && response.data.token) {
          this.props.setUser({
            token: response.data.token,
            username: response.data.account.username,
            _id: response.data._id
          });

          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  };

  render() {
    return (
      <div className="connexion">
        <div className="containerConnect">
          <form onSubmit={this.onSubmit}>
            <div className="title">
              <span>Connexion</span>
            </div>

            <div className="form">
              <label htmlFor="email">Adresse email</label>
              <input
                id="email"
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <button className="submit-btn" type="submit">
                Se connecter
              </button>
              <hr className="hr" />

              <span className="no-compt">Vous n'avez pas de compte ?</span>
            </div>
          </form>
          <Link
            to={{
              pathname: "/sign_up"
            }}
          >
            <button className="newButton" type="">
              Créer un compte
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
export default LogIn;
