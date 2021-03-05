import React from "react";
import "./screen.css";

export default class Screen extends React.Component {
  // Constructor of th class
  constructor(props) {
    super(props);
    this.state = {
      array: this.props.array,
    };
  }

  // First state of the component
  componentDidMount() {
    this.props.generate();
  }

  // Render function
  render() {
    // Variables
    let id = 0; // Id
    let _width = this.props.bar.bar_width; // Width of every bar
    return (
      <div className="background">
        <div id="graphics">
          {this.state.array.map((_heigth) => {
            return (
              <div
                className="bar"
                key={id++}
                style={{ height: _heigth, width: _width }}
              ></div>
            );
          })}
        </div>
      </div>
    );
  }
}
