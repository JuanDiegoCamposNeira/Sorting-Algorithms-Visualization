import React from "react";
import "./App.css";

import NavigationBar from "../Navbar/navbar";
import Screen from "../Screen/screen";

import { insertion_sort } from "../Sorting_Algorithms/insertion_sort";
import { heap_sort } from "../Sorting_Algorithms/heap_sort";
import { bubble_sort } from "../Sorting_Algorithms/bubble_sort";

export default class App extends React.Component {
  // State of the class
  constructor(props) {
    super(props);
    // State of the class
    this.state = {
      array: [],
      bar: {
        quantity: 10, // Initial amount of bars
        max_height: bar_max_height(), // The maximun height of the bar
        bar_width: bar_width(), // Width of every bar
      },
    };
  }

  // Chechk for the width and heigth every time the component is loaded
  componentDidMount() {
    let new_bar = this.state.bar; // Create a reference to the 'bar' object
    new_bar.max_height = bar_max_height(); // Calculate the maximum height of the bars

    // Set the new state for the bar
    this.setState({ bar: new_bar });
  }

  // Generate the array to sort
  generateArray(value = 0) {
    const number_of_bars = value > 0 ? value : this.state.bar.quantity; // Number of bars in the screen

    const new_bar = this.state.bar; // Create a reference to the 'bar' object
    new_bar.quantity = number_of_bars; // Set thte new value for the number of bars in the screen
    new_bar.bar_width = bar_width(number_of_bars); // Calculate the width that will have every bar

    const max_heigth = this.state.bar.max_height; // Store the maximum height for a bar

    let new_array = this.state.array; // Create a reference of the old array

    // Clear the array
    while (new_array.length > 0) new_array.pop();

    // Iterate the array to fill it
    for (let i = 0; i < number_of_bars; i++) {
      new_array[i] = getRndInteger(20, max_heigth);
    }

    // Set the new array to the state
    this.setState({ array: new_array, bar: new_bar });
  }

  // Handle sort button
  handleSort(method) {
    // Check if the parameter is empty
    if (!method) return;

    // Otherwise, call the correct sorting method
    let sorted_array = [];
    let indexes = [];
    if (method === "insertion")
      [sorted_array, indexes] = insertion_sort(this.state.array);
    else if (method === "heap")
      [sorted_array, indexes] = heap_sort(this.state.array);
    else if (method === "bubble")
      [sorted_array, indexes] = bubble_sort(this.state.array);

    // Make the animation
    let animation_time = 2000 / this.state.bar.quantity; // Speed of the animation
    const bars = document.getElementsByClassName("bar"); // Get the bars on the screen
    for (let i = 0; i < sorted_array.length; i++) {
      setTimeout(() => {
        let visualize = this.state.array;
        for (let j = 0; j < sorted_array[i].length; j++) {
          visualize[j] = sorted_array[i][j];
          // Change the color for the bars
          if (j === indexes[i][0] || j === indexes[i][1])
            bars[j].style.backgroundColor = "#ee2e31";
          else bars[j].style.backgroundColor = "#62a194";
        }
        this.setState({ array: visualize });
      }, animation_time * i);
    }
  }

  // Render function
  render() {
    return (
      <div>
        <NavigationBar
          generate={this.generateArray.bind(this)}
          sort={this.handleSort.bind(this)}
          bar={this.state.bar}
        />
        <Screen
          generate={this.generateArray.bind(this)}
          array={this.state.array}
          bar={this.state.bar}
        />
      </div>
    );
  }
}

// Function to generate a random number
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Generate the width for every bar in the screen
function bar_width(number_of_bars) {
  const window_width = window.innerWidth / 8; // Get the size of the screen
  return parseInt((window_width / number_of_bars) * 6); // Divide the area evenly for every bar
}
// Generate the maximum heigth for every bar in the screen
function bar_max_height() {
  // Calulate the height of the screen
  const window_height = window.innerHeight;
  // Set the maximum height to 80% of the screen
  return window_height * 0.8;
}
