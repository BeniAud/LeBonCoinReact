// import React, { Component, Fragment } from "react";
// import "./FormElement.css";

// class FormElement extends Component {
//   renderElement(element, type, placeholder) {
//     if (element === "input") {
//       return (
//         <input
//           type={type}
//           placeholder={placeholder}
//           onChange={this.props.onChange}
//         />
//       );
//     }
//     return (
//       <textarea onChange={this.props.onChange} placeholder={placeholder} />
//     );
//   }
//   render() {
//     const { label, element, type, placeholder, hint } = this.props;
//     return (
//       <div>
//         <div className="element-label">{label}</div>
//         {this.renderElement(element, type, placeholder)}
//         <div className="element-hint">{hint}</div>
//       </div>
//     );
//   }
// }

// export default FormElement;
