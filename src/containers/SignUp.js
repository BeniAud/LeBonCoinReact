import React, { Component } from "react";
import axios from "axios";
import "./SignUp.css";
class SignUp extends Component {
  state = {
    email: "",
    password: "",
    username: "",
    passwordConfirm: "",
    message: null,
    acceptTerms: false,
    receiveOffers: false,
    passwordIncorrect: false
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({ [name]: value });
  };

  onSubmit = event => {
    if (this.state.password === this.state.passwordConfirm) {
      axios
        .post("https://leboncoin-api.herokuapp.com/api/user/sign_up", {
          email: this.state.email,
          password: this.state.password,
          username: this.state.username
        })
        .then(response => {
          // console.log(response.data);
          if (response.data && response.data.token) {
            this.props.setUser({
              token: response.data.token,
              username: response.data.account.username,
              _id: response.data._id
            });
            // faire de la navigation en "programmatic"
            //this.props.history est transmis par Router
            //link seulement pour un changement de page
            this.props.history.push("/");
          }
        })
        .catch(err => {
          console.log(err);
        });
      event.preventDefault();
    } else {
      this.setState({
        message: "les mots de passe ne sont pas identiques",
        passwordIncorrect: true
      });
      event.preventDefault();
    }
    // event.preventDefault();
  };
  renderError() {
    if (this.state.errorMessage) {
      return <p>{this.state.errorMessage}</p>;
    } else {
      return null;
    }
  }
  render() {
    return (
      <div className="container-signup ">
        <div className="explain">
          <h2>Pourquoi créer un compte?</h2>

          <div className="container-explain">
            <div className="container-explain-info">
              <div className="logoblue">
                <i className="far fa-clock fa-3x" />
              </div>
              <div>
                <h3>Gagner du Temps</h3>

                <p>
                  Publier vos annonces rapidement, avec vos informations
                  pré-remplies chaque fois que vous souhaitez déposer une
                  nouvelle annonce.
                </p>
              </div>
            </div>
          </div>
          <div className="container-explain">
            <div className="container-explain-info">
              <div className="logoblue">
                <i className="fas fa-bell fa-3x" />
              </div>
              <div>
                <h3>Soyer les premiers informés</h3>

                <p>
                  Créer des alertes Immo ou Emploi et ne manquez jamais
                  l'annonce qui vous intérésse.
                </p>
              </div>
            </div>
          </div>
          <div className="container-explain">
            <div className="container-explain-info">
              <div className="logoblue">
                <i className="fas fa-eye fa-3x" />
              </div>
              <div>
                <h3>Visibilité</h3>

                <p>
                  Suivez les statistiques de vos annonces (nombre de fois où
                  votre annonce a été vue, nombre de contacts reçus).
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="formulaire">
          <div>
            <h2> Créer un compte</h2>
          </div>
          <form onSubmit={this.onSubmit}>
            <div className="container-form">
              <label htmlFor="email">Email</label>

              <input
                className="input-Signup"
                id="email"
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              />

              <label htmlFor="username">Nom</label>

              <input
                className="input-Signup"
                id="username"
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>

            <div className="container-form">
              <div className="container-form-password">
                <div className="container-form-password-first">
                  <label htmlFor="password">Mot de passe</label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={
                      this.state.passwordIncorrect === true
                        ? "password-red"
                        : ""
                    }
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="container-form-password-second">
                  <label htmlFor="passwordConfirm">
                    Confirmer mot de passe
                  </label>

                  <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    value={this.state.passwordConfirm}
                    onChange={this.handleChange}
                  />
                  <div className="messageerror">{this.state.message}</div>
                </div>
              </div>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="receiveOffers"
                name="receiveOffers"
                value={this.state.receiveOffers}
                onChange={this.handleChange}
              />

              <label htmlFor="receiveOffers">
                Je souhaite recevoir des offres des partenaires du site
                leboncoin susceptibles de m'intéresser
              </label>
            </div>

            <div className="checkbox">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                value={this.state.acceptTerms}
                onChange={this.handleChange}
              />

              <label htmlFor="acceptTerms">
                "J'accepte le
                <a href="https://www.leboncoin.fr/dc/cgv/0">
                  Conditions Générales de Vente"
                </a>
              </label>
            </div>
            {this.renderError()}

            <button className="submit-btn" type="submit">
              Créer mon compte personnel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
