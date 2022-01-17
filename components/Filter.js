import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import BoundingBox from "./BoundingBox";
import Dot from "./Dot";
import FilterClass from "../models/FilterClass";
export default class Filter extends Component {
  render() {
    /** @type {{face: any, filter: FilterClass}} */
    const { face, filter } = this.props;
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
    origin.y -= size.height / 5;
    size.height *= 6 / 5;
    const img = filter.image;
    const pos = filter.calcPosition(filter.position, origin, size);
    filter.calcSize(size);
    return (
      <>
        <Image
          style={{
            position: "absolute",
            top:
              pos.y - filter.height / 2 + filter.translate.top * filter.height,
            left:
              pos.x - filter.width / 2 + filter.translate.left * filter.width,
            width: filter.width,
            height: filter.height,
            borderColor: "red",
            borderWidth: globalThis.debug ? 1 : 0,
          }}
          source={img}
        />
        {globalThis.debug && <BoundingBox pos={origin} size={size} />}
      </>
    );
  }
}
