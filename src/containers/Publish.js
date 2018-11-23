import React, { Component } from "react";
import axios from "axios";
import "./Publish.css";
import ReactFileReader from "react-file-reader";
class Publish extends Component {
  state = {
    files: [],
    title: "",
    text: "",
    price: ""
  };
  handleFiles = files => {
    console.log(files);
    const newFiles = [...this.state.files, ...files.base64];
    this.setState({
      files: newFiles
    });
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({ [name]: value });
  };
  // redirectToLoginPage=()=>{
  //   this.props.history.push("/log_in/");
  // };
  onSubmit = event => {
    axios
      .post(
        "https://leboncoin-api.herokuapp.com/api/offer/publish",
        {
          title: this.state.title,
          description: this.state.description,
          price: Number(this.state.price),
          files: this.state.files
        },
        {
          headers: {
            authorization: "Bearer " + this.props.user.token
          }
        }
      )
      .then(response => {
        console.log(response.data);
        if (response.data) {
          this.props.history.push("/offer/" + response.data._id);
        }
      })
      .catch(err => {
        console.log(err);
      });
    event.preventDefault(); // eviter le comportement par defaut
  };

  render() {
    const filesArray = [];
    for (let i = 0; i < this.state.files.length; i++) {
      filesArray.push(
        <img
          key={i}
          onClick={() => {
            // En cliquant sur l'image, le fichier sera supprimé
            const newFiles = [...this.state.files];
            newFiles.splice(i, 1);
            this.setState({ files: newFiles });
          }}
          src={this.state.files[i]}
          alt="Annonce"
        />
      );
    }
    return (
      <div>
        <div className="publish">
          <div className="votreannonce">
            <h2>Votre annonce</h2>
          </div>
          <form onSubmit={this.onSubmit}>
            <div>
              <label htmlFor="title">Titre de votre annonce</label>
            </div>

            <div>
              <input
                className="input-publish"
                id="title"
                name="title"
                type="text"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <ReactFileReader
                fileTypes={[".png", ".jpg"]}
                base64={true}
                multipleFiles={true} // `false si une seule image`
                handleFiles={this.handleFiles}
              >
                <button type="button" className="btn">
                  Télécharger des photos
                </button>
                <span style={{ color: "red" }}>
                  <br />
                  Attention ! Format .png et .jpg UNIQUEMENT{" "}
                </span>
              </ReactFileReader>

              {filesArray}
            </div>
            <div>
              <label htmlFor="description">Texte de votre annonce</label>
            </div>
            <div>
              <textarea
                className="input-publish"
                id="description"
                name="description"
                type="text"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="price">Prix</label>
            </div>
            <div>
              <input
                className="input-publish"
                id="price"
                name="price"
                type="number"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>
            <button className="submit-btn" type="submit">
              Valider
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Publish;
