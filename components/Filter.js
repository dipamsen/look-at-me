import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import BoundingBox from "./BoundingBox";
import Dot from "./Dot";

export default class Filter extends Component {
  render() {
    const { face } = this.props;
    // console.log(face);
    const {
      bounds: { size, origin },
      BOTTOM_MOUTH,
      LEFT_CHEEK,
      LEFT_EAR,
      LEFT_EYE,
      LEFT_MOUTH,
      NOSE_BASE,
      RIGHT_CHEEK,
      RIGHT_EAR,
      RIGHT_EYE,
      RIGHT_MOUTH,
    } = face;
    const topCenter = {
      x: origin.x + size.width / 2,
      y: origin.y,
    };
    const img = require("../assets/crown-pic1.png");
    const imgDim = Image.resolveAssetSource(img);
    const scale = 1.2;
    const newW = imgDim.width * scale;
    const newH = imgDim.height * scale;
    return (
      <Image
        style={{
          position: "absolute",
          top: topCenter.y - newH + 10,
          left: topCenter.x - newW,
          width: newW,
          height: newH,
        }}
        source={img}
      />
    );
  }
}
