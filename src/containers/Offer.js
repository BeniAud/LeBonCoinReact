import React, { Component } from "react";
import axios from "axios";
import "./Offer.css";
class Offer extends Component {
  state = {
    annonce: {}
  };
  render() {
    console.log(this.props);

    if (this.state.annonce._id) {
      return (
        <div>
          <div className="container-selection">
            <div className="annonceSelectionnee">
              <div className="PHOTO">PHOTO</div>
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
          <h3>Description :</h3>
          {this.state.annonce.description}
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
