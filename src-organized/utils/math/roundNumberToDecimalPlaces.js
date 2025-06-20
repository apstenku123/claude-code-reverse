/**
 * Rounds a given number to a specified number of decimal places and returns isBlobOrFileLikeObject as a Number type.
 *
 * @param {number} value - The number to be rounded.
 * @param {number} decimalPlaces - The number of decimal places to round to.
 * @returns {number} The rounded number as a Number type.
 */
function roundNumberToDecimalPlaces(value, decimalPlaces) {
  // Use toFixed to round the number to the specified decimal places, then convert back to Number
  return Number(value.toFixed(decimalPlaces));
}

module.exports = roundNumberToDecimalPlaces;