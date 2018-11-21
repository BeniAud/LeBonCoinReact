import React from "react";
import Axios from "axios";
import Item from "./Item";
// import "./Home.css";
// import Publish from "./Publish";

class Home extends React.Component {
  state = {
    annonces: []
  };

  render() {
    return <Item annonces={this.state.annonces} />;
  }
  componentDidMount() {
    Axios.get("https://leboncoin-api.herokuapp.com/api/offer").then(
      response => {
        this.setState({
          annonces: response.data
        });
      }
    );
  }
  //     .then(response => {
  //       console.log(response.data);

  //       if (response.data) {
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
}

export default Home;
