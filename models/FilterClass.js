import { Image } from "react-native";
export const categories = {
  CROWN: "crown",
  FLOWER: "flower",
  HEAD: "head",
  OTHER: "other",
};
export const POSITIONS = {
  TOP_LEFT: "topLeft",
  TOP_CENTER: "topCenter",
  TOP_RIGHT: "topRight",
  MIDDLE_LEFT: "middleLeft",
  MIDDLE_CENTER: "middleCenter",
  MIDDLE_RIGHT: "middleRight",
  BOTTOM_LEFT: "bottomLeft",
  BOTTOM_CENTER: "bottomCenter",
  BOTTOM_RIGHT: "bottomRight",
};
/** Stores Information about a filter */
export default class Filter {
  constructor(image, category, { faceScale, position, move }) {
    this.image = image;
    const { height, width, uri } = Image.resolveAssetSource(this.image);
    this.faceScale = faceScale;
    this.imgHeight = height;
    this.imgWidth = width;
    this.url = uri;
    this.width = width;
    this.height = height;
    this.category = category;
    this.position = position;
    this.translate = {
      top: move[0],
      left: move[1],
    };
    // this.id =
  }
  calcSize(face) {
    this.width = (face.width / this.imgWidth) * this.faceScale * this.imgWidth;
    this.height =
      (face.width / this.imgWidth) * this.faceScale * this.imgHeight;
  }
  calcPosition(pos, topLeft, size) {
    switch (pos) {
      case POSITIONS.TOP_LEFT:
        return { x: topLeft.x, y: topLeft.y };
      case POSITIONS.TOP_CENTER:
        return { x: topLeft.x + size.width / 2, y: topLeft.y };
      case POSITIONS.TOP_RIGHT:
        return { x: topLeft.x + size.width, y: topLeft.y };
      case POSITIONS.MIDDLE_LEFT:
        return { x: topLeft.x, y: topLeft.y + size.height / 2 };
      case POSITIONS.MIDDLE_CENTER:
        return {
          x: topLeft.x + size.width / 2,
          y: topLeft.y + size.height / 2,
        };
      case POSITIONS.MIDDLE_RIGHT:
        return { x: topLeft.x + size.width, y: topLeft.y + size.height / 2 };
      case POSITIONS.BOTTOM_LEFT:
        return { x: topLeft.x, y: topLeft.y + size.height };
      case POSITIONS.BOTTOM_CENTER:
        return { x: topLeft.x + size.width / 2, y: topLeft.y + size.height };
      case POSITIONS.BOTTOM_RIGHT:
        return { x: topLeft.x + size.width, y: topLeft.y + size.height };
      default:
        return { x: 0, y: 0 };
    }
  }
}
