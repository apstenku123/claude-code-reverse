/**
 * Returns the first defined (not undefined) value from the provided iterable.
 *
 * @param {Iterable<any>} values - An iterable (such as an array) of values to search through.
 * @returns {any} The first value in the iterable that is not undefined, or undefined if all values are undefined.
 */
function getFirstDefinedValue(values) {
  // Iterate over each value in the iterable
  for (const value of values) {
    // Return the first value that is not undefined
    if (value !== undefined) {
      return value;
    }
  }
  // If all values are undefined, implicitly returns undefined
}

module.exports = getFirstDefinedValue;
