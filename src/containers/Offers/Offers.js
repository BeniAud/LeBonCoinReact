import React from "react";
import axios from "axios";
import "./styles.css";
class Offer extends React.Component {
  state = {
    listItems: []
  };

  displayItems = () => {
    console.log("display");
    return this.state.listItems.map(item => {
      return (
        <div
          key={item._id}
          className="card-offers"
          onClick={() => {
            this.props.history.push("/offer/" + item._id);
          }}
        >
          <div className="picture-offers" />
          <div>
            <div className="title-offers">{item.title}</div>
            <div className="price-offers">{`${item.price} €`}</div>
          </div>
        </div>
      );
    });
  };
  render() {
    return <div className="container-offers">{this.displayItems()}</div>;
  }

  componentDidMount() {
    axios
      .get("https://leboncoin-api.herokuapp.com/api/offer/")
      .then(response => {
        this.setState({ listItems: response.data });
        console.log(response.data);
      });
  }
}

export default Offer;
