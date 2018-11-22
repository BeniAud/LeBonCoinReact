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
    limit: 25,
    nbPages: 1,
    olbTotalPages: 1,
    page: 1
  };
  pagesToDisplay = () => {
    let pagesToDisplayTab = [];
    for (let i = 0; i < this.state.nbPages / this.state.limit; i++) {
      pagesToDisplayTab.push(i + 1);
    }

    return pagesToDisplayTab;
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

  getPages = (page, event) => {
    event.preventDefault();
    console.log("go to page : ", page);
    this.setState({ page, skip: (page - 1) * this.state.limit });

    axios
      .get("https://leboncoin-api.herokuapp.com/api/offer/", {
        params: {
          title: this.state.title,
          priceMin: this.state.priceMin,
          priceMax: this.state.priceMax,
          sort: this.state.sort,
          skip: (page - 1) * this.state.limit,
          limit: this.state.limit
        }
      })
      .then(response => {
        this.setState({
          listItems: response.data.slice(0, this.state.limit)
        });
        console.log("response page: ", response.data);
      });
  };

  searchFilters = event => {
    event.preventDefault();

    axios
      .get("https://leboncoin-api.herokuapp.com/api/offer/", {
        params: {
          title: this.state.title,
          priceMin: this.state.priceMin,
          priceMax: this.state.priceMax,
          sort: this.state.sort
        }
      })
      .then(response => {
        this.setState({
          listItems: response.data.slice(0, this.state.limit),
          nbPages: response.data.length
        });
        console.log(response.data);
      });
  };
  render() {
    const nbPagesDisplayed = this.pagesToDisplay();

    const pagesRender = nbPagesDisplayed.map(page => {
      return (
        <li key={page} onClick={event => this.getPages(page, event)}>
          {page}
        </li>
      );
    });
    return (
      <div>
        <div>
          <form className="form-offers" onSubmit={this.searchFilters}>
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
              <label htmlFor="priceMin">
                Prix entre &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input
                placeholder="Prix min"
                id="priceMin"
                type="number"
                name="priceMin"
                onChange={this.handleChange}
              />
              <label htmlFor="priceMin">
                &nbsp;&nbsp;&nbsp;et&nbsp;&nbsp;&nbsp;
              </label>
              <input
                placeholder="Prix max"
                id="priceMax"
                type="number"
                name="priceMax"
                onChange={this.handleChange}
              />

              <select onChange={this.handleChange} name="sort">
                <option defaultValue value="date-desc">
                  Tri : Plus récentes
                </option>
                <option value="date-asc">Plus anciennes</option>
                <option value="price-desc">Moins chères</option>
                <option value="price-asc">Plus chères</option>
              </select>
            </div>
          </form>
        </div>
        <div className="list-pages">{pagesRender}</div>
        <div className="container-offers">{this.displayItems()}</div>
        <div className="list-pages">{pagesRender}</div>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get("https://leboncoin-api.herokuapp.com/api/offer/")
      .then(response => {
        this.setState({
          listItems: response.data.slice(0, this.state.limit),
          nbPages: response.data.length,
          oldTotalPages: response.data.length
        });
        console.log(response.data);
      });
  }
}

export default Offer;
