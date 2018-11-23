import React, { Component } from "react";
import axios from "axios";
import "./Offer.css";

class Offer extends Component {
  state = {
    annonce: {}
  };
  renderPicture(annonce) {
    console.log(annonce);
    const tabPicture = [];
    for (let i = 0; i < annonce.pictures.length; i++) {
      tabPicture.push(
        <img
          src={annonce.pictures[i].secure_url}
          width="100"
          height="100"
          alt="imgpublish"
        />
      );
    }

    for (let j = annonce.pictures.length; j < 3; j++) {
      tabPicture.push(
        <img
          src="assets/Img/placeholder.png"
          width="150"
          height="160"
          alt="imgpublish"
        />
      );
    }
    return tabPicture;
  }

  render() {
    if (this.state.annonce._id) {
      return (
        <div>
          <div className="container-selection">
            <div className="annonceSelectionnee">
              <div className="PHOTO">
                {this.renderPicture(this.state.annonce)}
              </div>
              <div className="titleSelection">
                <h3>{this.state.annonce.title}</h3>
              </div>
              <div className="priceSelection"> {this.state.annonce.price}€</div>
            </div>
            <div className="pageContact">
              <div className="faCircle">
                <i class="fas fa-user-circle fa-5x" />
              </div>
              <div className="userCreator">
                {this.state.annonce.creator.account.username}
              </div>

              <button className="buttonContact" type="">
                <i class="fas fa-mobile-alt fa-2x" />
                voir le numero
              </button>
            </div>
          </div>
          <div className="offerDescription">
            <h3>Description :</h3>
            {this.state.annonce.description}
          </div>
        </div>
      );
    }

    return <p>En cours de chargement ...</p>;
  }

  componentDidMount() {
    axios
      .get(
        "https://leboncoin-api.herokuapp.com/api/offer/" +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({
          annonce: response.data
        });
      });
  }
}

export default Offer;
