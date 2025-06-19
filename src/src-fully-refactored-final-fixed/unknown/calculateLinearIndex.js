/**
 * Calculates a linear index from a two-dimensional coordinate array.
 *
 * Given a coordinate array [rowIndex, columnIndex] and a row size constant (KG1),
 * this function computes the corresponding linear index as if the 2D array were flattened.
 *
 * @param {number[]} coordinate - An array containing two elements: [rowIndex, columnIndex].
 * @returns {number} The computed linear index in the flattened array.
 */
function calculateLinearIndex(coordinate) {
  // KG1 is expected to be a globally defined constant representing the row size
  // Linear index = rowIndex * rowSize + columnIndex
  return coordinate[0] * KG1 + coordinate[1];
}

module.exports = calculateLinearIndex;
