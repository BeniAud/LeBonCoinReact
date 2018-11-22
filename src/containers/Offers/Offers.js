import React from "react";
import axios from "axios";
import "./styles.css";
class Offer extends React.Component {
  state = {
    listItems: [],
    title: "",
    priceMin: "",
    priceMax: "",
    sort: "",
    skip: "",
    limit: ""
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
  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    console.log(target.type, name, value);
    this.setState({ [name]: value });
    if (target.type === "select-one") {
      this.searchFilters(event);
    }
  };
  searchFilters = event => {
    event.preventDefault();
    axios
      .get("https://leboncoin-api.herokuapp.com/api/offer/", {
        params: {
          title: this.state.title,
          priceMin: this.state.priceMin,
          priceMax: this.state.priceMax,
          sort: this.state.sort,
          skip: this.state.skip,
          limit: this.state.limit
        }
      })
      .then(response => {
        this.setState({ listItems: response.data });
        console.log(response.data);
      });
  };
  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.searchFilters}>
            <div>
              <input
                placeholder="Que recherchez vous?"
                id="title"
                type="text"
                name="title"
                onChange={this.handleChange}
              />
              <button>Rechercher</button>
            </div>
            <div>
              <label htmlFor="priceMin">Prix entre</label>
              <input
                placeholder="prix min"
                id="priceMin"
                type="number"
                name="priceMin"
                onChange={this.handleChange}
              />
              <label htmlFor="priceMin">et</label>
              <input
                placeholder="prix max"
                id="priceMax"
                type="number"
                name="priceMax"
                onChange={this.handleChange}
              />

              <select onChange={this.handleChange} name="sort">
                <option selected value="date-desc">
                  Plus récentes
                </option>
                <option value="date-asc">Plus anciennes</option>
                <option value="price-asc">Moins chères</option>
                <option value="price-desc">Plus chères</option>
              </select>
            </div>
          </form>
        </div>
        <div className="container-offers">{this.displayItems()}</div>
      </div>
    );
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
