// import React from "react";
// import "./Caroussel.css";
// class Caroussel extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       currentImageIndex: 0
//     };

//     this.nextSlide = this.nextSlide.bind(this);
//     this.previousSlide = this.previousSlide.bind(this);
//   }

//   previousSlide() {
//     const { data } = this.props;
//     const lastIndex = data.length - 1;
//     const { currentImageIndex } = this.state;
//     const shouldResetIndex = currentImageIndex === 0;
//     const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

//     this.setState({
//       currentImageIndex: index
//     });
//   }

//   nextSlide() {
//     const { data } = this.props;
//     const lastIndex = data.length - 1;
//     const { currentImageIndex } = this.state;
//     const shouldResetIndex = currentImageIndex === lastIndex;
//     const index = shouldResetIndex ? 0 : currentImageIndex + 1;

//     this.setState({
//       currentImageIndex: index
//     });
//   }

//   renderSlides() {
//     const { data } = this.props;
//     const pictures = data.map((obj, i) => (
//       <ImageSlide key={i} url={obj.secure_url} />
//     ));
//     return pictures;
//     console.log("pictures", pictures);
//   }

//   render() {
//     return (
//       <div className="carousel">
//         <Arrow
//           direction="left"
//           clickFunction={this.previousSlide}
//           glyph="&#9664;"
//         />
//         {this.renderSlides()}
//         <Arrow
//           direction="right"
//           clickFunction={this.nextSlide}
//           glyph="&#9654;"
//         />
//       </div>
//     );
//   }
// }

// const Arrow = ({ direction, clickFunction, glyph }) => (
//   <div className={`slide-arrow ${direction}`} onClick={clickFunction}>
//     {glyph}
//   </div>
// );

// const ImageSlide = ({ url }) => {
//   const styles = {
//     backgroundImage: `url(${url})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center"
//   };

//   return <div className="image-slide" style={styles} />;
// };

// export default Caroussel;
