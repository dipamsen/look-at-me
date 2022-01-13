import React, { Component } from "react";
import { Text, View } from "react-native";

export default class BoundingBox extends Component {
  render() {
    const { pos = { x: 0, y: 0 } } = this.props;
    const size = 10;
    return (
      <View
        style={{
          position: "absolute",
          top: pos.y - size / 2,
          left: pos.x - size / 2,
          width: size,
          height: size,
          backgroundColor: "red",
          borderRadius: size,
        }}
      />
    );
  }
}
