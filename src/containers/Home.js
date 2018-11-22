import React from "react";
import Axios from "axios";
import Item from "./Item";
import OffersFilter from "./OffersFilter";
// import "./Home.css";
// import Publish from "./Publish";

class Home extends React.Component {
  state = {
    annonces: []
  };
  updateAnnonceList = annonces => {
    // annonces -> tableaux d'annonces
    this.setState({
      annonces: annonces
    });
  };
  render() {
    return (
      <div>
        <OffersFilter updateAnnonceList={this.updateAnnonceList} />
        <Item annonces={this.state.annonces} />;
      </div>
    );
  }
  componentDidMount() {
    Axios.get("https://leboncoin-api.herokuapp.com/api/offer", {
      params: {
        limit: 25
      }
    }).then(response => {
      this.setState({
        annonces: response.data
      });
    });
  }
}

export default Home;
