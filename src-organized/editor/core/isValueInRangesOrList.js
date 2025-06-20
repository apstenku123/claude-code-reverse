/**
 * Checks if a given value is present in a list of numbers or within any of the specified numeric ranges.
 *
 * @param {Array<number | [number, number]>} rangesOrValues - An array containing numbers and/or two-element arrays representing inclusive numeric ranges.
 * @param {number} value - The value to check for presence in the list or ranges.
 * @returns {boolean} True if the value is found as a number in the list or falls within any of the ranges; otherwise, false.
 */
function isValueInRangesOrList(rangesOrValues, value) {
  return rangesOrValues.some(item => {
    // If the item is a number, check for direct equality
    if (typeof item === "number") {
      return item === value;
    }
    // Otherwise, assume the item is a two-element array representing a range [min, max]
    // Check if the value falls within the inclusive range
    return value >= item[0] && value <= item[1];
  });
}

module.exports = isValueInRangesOrList;