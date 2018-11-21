import React from "react";
import axios from "axios";
import "./styles.css";
class Offer extends React.Component {
  state = {
    title: "",
    price: "",
    description: "",
    creator: {}
  };
  render() {
    console.log("offer");
    console.log(this.state);
    if (this.state.title)
      return (
        <div className="container-offer">
          <div className="card-offer">
            <div className="card-offer-header">
              <div className="picture-offer" />
              <div className="title-price-offer">
                <div className="title-offer">{this.state.title}</div>
                <div className="price-offer">{`${this.state.price} €`}</div>
              </div>
            </div>
            <div className="description-offer-title">Description</div>
            <div className="description-offer">{this.state.description}</div>
          </div>
          <div className="card-user-offer">
            <div className="card-user-offer-content">
              <div className="icon-name-offer">
                <div className="awsome-icon">
                  <i class="fas fa-user fa-2x" />
                </div>
                &nbsp;&nbsp;
                {this.state.creator.account.username}
              </div>
              <button>
                <i class="fas fa-phone fa-flip-horizontal fa-2x" />
                &nbsp;&nbsp;Voir le numéro
              </button>
              <div>{this.state.creator.account.phone}</div>
            </div>
          </div>
        </div>
      );
    return null;
  }

  componentDidMount() {
    axios
      .get(
        "https://leboncoin-api.herokuapp.com/api/offer/" +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          creator: response.data.creator
        });
        console.log(response.data);
      });
  }
}

export default Offer;
