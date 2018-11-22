import React from "react";

class Home extends React.Component {
  render() {
    return <h1>{this.props.history.push("/offers/")}</h1>;
  }
}

export default Home;
