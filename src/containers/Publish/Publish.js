import React, { Component } from "react";
import axios from "axios";
import "./styles.css";
class Publish extends Component {
  state = {
    title: "",
    description: "",
    price: null
  };
  onSubmit = event => {
    event.preventDefault();
    axios
      .post(
        "https://leboncoin-api.herokuapp.com/api/offer/publish",
        {
          title: this.state.title,
          description: this.state.description,
          price: this.state.price
        },
        {
          headers: { authorization: "Bearer " + this.props.user.token }
        }
      )
      .then(response => {
        console.log(response.data);
        if (response.data && response.data._id) {
          this.props.history.push("/offer/" + response.data._id);
          alert(`Annonce de ${response.data.title} publiée `);
        } else alert("erreur dans la publication");
      })
      .catch(err => {
        alert("erreur ", err.message);
      });
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-card-publish">
            <h1>Votre annonce</h1>
            <label htmlFor="title">Titre de l'annonce</label>
            <input
              id="title"
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <label htmlFor="description">Texte de l'annonce</label>
            <textarea
              id="description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <label htmlFor="price">Prix</label>
            <input
              id="price"
              name="price"
              type="number"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </div>
          <button className="btn-publish" type="submit">
            Valider
          </button>
        </form>
      </div>
    );
  }
}

export default Publish;
