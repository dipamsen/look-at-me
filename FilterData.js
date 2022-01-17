import FilterClass, { POSITIONS } from "./models/FilterClass";

export const CROWN_1 = loadFilter(
  require("./assets/crown-pic1.png"),
  "CROWN",
  POSITIONS.TOP_LEFT,
  [0, 0.5],
  0.5
);
export const CROWN_2 = loadFilter(
  require("./assets/crown-pic2.png"),
  "CROWN",
  POSITIONS.MIDDLE_CENTER,
  [0, 0],
  1.2
);

function loadFilter(source, category, position, translate, faceScale) {
  return new FilterClass(source, category, {
    faceScale: faceScale,
    position: position,
    move: translate,
  });
}
