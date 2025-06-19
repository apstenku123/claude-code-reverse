/**
 * Checks if a given value exists in a list of numbers or within any of the specified numeric ranges.
 *
 * @param {Array<number | [number, number]>} listOrRanges - An array containing either numbers or two-element arrays representing numeric ranges [start, end].
 * @param {number} value - The value to check for presence in the list or within any of the ranges.
 * @returns {boolean} True if the value is found in the list or within any range, otherwise false.
 */
function isValueInListOrRanges(listOrRanges, value) {
  return listOrRanges.some(item => {
    // If the item is a number, check for direct equality
    if (typeof item === "number") {
      return item === value;
    }
    // Otherwise, assume item is a range [start, end] and check if value falls within the range (inclusive)
    return value >= item[0] && value <= item[1];
  });
}

module.exports = isValueInListOrRanges;
