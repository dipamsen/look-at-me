import React, { Component } from "react";
import { Text, View } from "react-native";

export default class BoundingBox extends Component {
  render() {
    const { pos = { x: 0, y: 0 }, size = { width: 20, height: 20 } } =
      this.props;

    return (
      <View
        style={{
          position: "absolute",
          top: pos.y,
          left: pos.x,
          width: size.width,
          height: size.height,
          borderWidth: 2,
          borderColor: "red",
        }}
      />
    );
  }
}
