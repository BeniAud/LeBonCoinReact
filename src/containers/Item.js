import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Item.css";

class Item extends Component {
  render() {
    console.log("Item", this.props.annonces);
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
          <img src={"/assets/img/placeholder.png"} width="150" height="100" />
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
