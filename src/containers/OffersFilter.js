import React, { Component } from "react";
import axios from "axios";
import "./OffersFilter.css";
const ITEMS_PER_PAGE = 25;
class OffersFilter extends Component {
  state = {
    title: "",
    priceMin: "",
    priceMax: "",
    sort: "",
    skip: 0
    // sort: "price-desc" || "price-asc" || "date-desc" || "date-asc"
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  updateAnnonceList = () => {
    axios
      .get("https://leboncoin-api.herokuapp.com/api/offer", {
        params: {
          title: this.state.title,
          priceMin: this.state.priceMin,
          priceMax: this.state.priceMax,
          sort: this.state.sort,
          limit: ITEMS_PER_PAGE,
          skip: this.state.skip
        }
      })
      .then(response => {
        this.props.updateAnnonceList(response.data);
      });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      skip: 0
    });

    this.updateAnnonceList();
  };
  getPreviousPage = () => {
    if (this.state.skip <= 0) {
      return;
    }
    this.setState(
      {
        skip: this.state.skip - ITEMS_PER_PAGE // page 1: skip 0 éléments, page 2: skip 25 éléments
      },
      this.updateAnnonceList
    );
  };
  getNextPage = () => {
    this.setState(
      {
        skip: this.state.skip + ITEMS_PER_PAGE
      },
      this.updateAnnonceList
    );
  };
  //   handleChange = event => {
  //     const { name, value } = event.target;
  //     this.setState({
  //       [name]: value
  //     });
  //   };

  //   handleSubmit = event => {
  //     event.preventDefault();

  //     axios
  //       .get("https://leboncoin-api.herokuapp.com/api/offer", {
  //         params: {
  //           title: this.state.title,
  //           priceMin: this.state.priceMin,
  //           priceMax: this.state.priceMax,
  //           sort: this.state.sort,
  //           limit: ITEMS_PER_PAGE,
  //           skip: this.state.skip
  //         }
  //       })
  //       .then(response => {
  //         this.props.updateAnnonceList(response.data);
  //       });
  //   };

  render() {
    return (
      <div className="offers-filter-background">
        <div className="offers-filter-container">
          <form onSubmit={this.handleSubmit}>
            <input
              className="input-OffersFilter"
              id="title"
              name="title"
              placeholder="Que recherchez-vous?"
              onChange={this.handleChange}
              value={this.state.title}
            />
            <button className="submit-btnOffer" type="submit">
              Rechercher
            </button>
            <div className="offers-filter-containerSlection">
              <div className="offers-filter-price">
                {" "}
                Prix entre{" "}
                <input
                  className="input-OffersFilter-price"
                  id="priceMin"
                  name="priceMin"
                  placeholder="Prix mini"
                  onChange={this.handleChange}
                  value={this.state.priceMin}
                />{" "}
                et{" "}
                <input
                  className="input-OffersFilter-price"
                  id="priceMax"
                  name="priceMax"
                  placeholder="Prix max"
                  onChange={this.handleChange}
                  value={this.state.priceMax}
                />
              </div>
              <div className="slecetWrapper">
                <select
                  className="select"
                  name="sort"
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                  <option value="date-desc">Tri : Plus récentes</option>
                  <option value="date-asc">Tri : Plus anciennes</option>
                  <option value="price-asc">Tri : Prix croissants</option>
                  <option value="price-desc">Tri : Prix décroissants</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="button-container-page">
          <button onClick={this.getPreviousPage} className="buttonpage" type="">
            <i class="fas fa-chevron-left fa-4x" />
            Page précédente
          </button>
          <button onClick={this.getNextPage} className="buttonpage" type="">
            Page suivante
            <i class="fas fa-chevron-right fa-4x" />
          </button>
        </div>
      </div>
    );
  }
}

export default OffersFilter;
