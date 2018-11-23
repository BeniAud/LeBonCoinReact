import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Item.css";

class Item extends Component {
  renderPicture(toto) {
    if (toto.pictures.length === 0) {
      return (
        <img
          src="assets/Img/placeholder.png"
          width="150"
          height="160"
          alt="imgpublish"
        />
      );
    } else {
      return (
        <img
          src={toto.pictures[0].secure_url}
          width="150"
          height="160"
          alt="imgpublish"
        />
      );
    }
  }
  render() {
    const tabItem = [];
    for (let i = 0; i < this.props.annonces.length; i++) {
      tabItem.push(
        <Link
          style={{
            textDecoration: "none",
            color: "#4979af",
            fontWeight: "bold"
          }}
          className="container-annonce"
          to={"/offer/" + this.props.annonces[i]._id}
        >
          <div>{this.renderPicture(this.props.annonces[i])}</div>
          <div className="infoAnnonce">
            <div className="titleDescription">
              <p>
                {this.props.annonces[i].title}{" "}
                {this.props.annonces[i].description}
              </p>
            </div>
            <p className="priceColor">{this.props.annonces[i].price}€</p>
          </div>
        </Link>
      );
    }
    return (
      <div className="container-Des-annonces">
        <div>{tabItem}</div>
      </div>
    );
  }
}

export default Item;
