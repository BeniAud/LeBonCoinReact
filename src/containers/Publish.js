import React, { Component } from "react";
import axios from "axios";
import "./Publish.css";

class Publish extends Component {
  state = {
    title: "",
    text: "",
    price: ""
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({ [name]: value });
  };

  onSubmit = event => {
    axios
      .post(
        "https://leboncoin-api.herokuapp.com/api/offer/publish",
        {
          title: this.state.title,
          description: this.state.description,
          price: Number(this.state.price)
        },
        {
          headers: {
            authorization: "Bearer " + this.props.user.token
          }
        }
      )
      .then(response => {
        console.log(response.data);
        if (response.data) {
          this.props.history.push("/offer/" + response.data._id);
        }
      })
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <div className="publish">
          <div className="votreannonce">
            <h2>Votre annonce</h2>
          </div>
          <form onSubmit={this.onSubmit}>
            <div>
              <label htmlFor="title">Titre de votre annonce</label>
            </div>
            <div>
              <input
                className="input-publish"
                id="title"
                name="title"
                type="text"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Texte de votre annonce</label>
            </div>
            <div>
              <textarea
                className="input-publish"
                id="description"
                name="description"
                type="text"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="price">Prix</label>
            </div>
            <div>
              <input
                className="input-publish"
                id="price"
                name="price"
                type="number"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>
            <button className="submit-btn" type="submit">
              Valider
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Publish;
