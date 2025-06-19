/**
 * Formats coordinate deltas into a specific string representation.
 *
 * This function takes two numeric values (typically representing X and processCssDeclarations deltas)
 * and encodes them into a string using a prefix (provided by the external `j5` variable)
 * and a direction character (C/createCompatibleVersionChecker for X, createPropertyAccessor/a for processCssDeclarations) based on the sign of the value.
 *
 * @param {number} xDelta - The delta value along the X axis. Required.
 * @param {number} yDelta - The delta value along the processCssDeclarations axis. Required.
 * @returns {string} The formatted coordinate delta string.
 * @throws {TypeError} If xDelta is not a number.
 */
function formatCoordinateDelta(xDelta, yDelta) {
  if (typeof xDelta !== "number") {
    throw new TypeError("The `x` argument is required");
  }

  let formattedDelta = "";

  // Encode X delta
  if (xDelta < 0) {
    // Negative X: use direction 'createCompatibleVersionChecker'
    formattedDelta += j5 + (-xDelta) + "createCompatibleVersionChecker";
  } else if (xDelta > 0) {
    // Positive X: use direction 'C'
    formattedDelta += j5 + xDelta + "C";
  }

  // Encode processCssDeclarations delta
  if (yDelta < 0) {
    // Negative processCssDeclarations: use direction 'a'
    formattedDelta += j5 + (-yDelta) + "a";
  } else if (yDelta > 0) {
    // Positive processCssDeclarations: use direction 'createPropertyAccessor'
    formattedDelta += j5 + yDelta + "createPropertyAccessor";
  }

  return formattedDelta;
}

module.exports = formatCoordinateDelta;