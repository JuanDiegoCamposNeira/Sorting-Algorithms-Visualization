import React from "react";
import "./navbar.css";

export default class NavBar extends React.Component {
  // Constructor of the class
  constructor(props) {
    super(props);
    // Initial state
    this.state = {
      sort_method: null, // The initial sort method
      min: 10, // Minimum number of the range
      max: parseInt(Math.floor(window.innerWidth / 8)) - 40, // Maximum number of the range input
      bars: this.props.bar.quantity, // The number of bars on the screen
    };
  }

  // Set the sort method
  storeSortMethod(method) {
    // If the method is not valid
    if (!method.target.value) return;
    // Otherwise, set the state as the actual sorting method
    let sort = method.target.value;
    this.setState({ sort_method: sort });
  }
  // Handle sort method
  handleSortMethod() {
    // Call the method on the app
    let sort_method = this.state.sort_method;
    this.props.sort(sort_method);
  }
  // Handle the change of the array
  handleArrayChange(value) {
    // Set the number of bars
    this.setState({ bars: value.target.value });
    // Call the the function on the app component to generate the new array
    this.props.generate(value.target.value);
  }

  // Render function
  render() {
    return (
      <div className="container">
        <div className="name-option">
          <h1>Sorting Visualiser</h1>
          <select onChange={this.storeSortMethod.bind(this)}>
            <option defaultValue value="">
              Select algorithm
            </option>
            <option value="bubble">Bubble Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="heap">Heap Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="quick">Quick Sort</option>
          </select>
          <label className="input">
            Array size
            <input
              type="range"
              min={this.state.min}
              max={this.state.max}
              value={this.state.bars}
              onChange={this.handleArrayChange.bind(this)}
            />
          </label>
        </div>
        <div className="sort">
          <button onClick={this.handleSortMethod.bind(this)}>Sort</button>
        </div>
        <div className="array">
          <button onClick={this.props.generate}>Generate New Array</button>
        </div>
      </div>
    );
  }
}
