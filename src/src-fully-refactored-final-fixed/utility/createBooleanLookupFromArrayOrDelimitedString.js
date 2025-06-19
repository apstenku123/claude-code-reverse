/**
 * Creates an object whose keys are the elements from the provided array or a delimited string,
 * and whose values are all set to true. Useful for fast lookup operations.
 *
 * @param {string[]|string} values - An array of strings, or a string to be split into an array.
 * @param {string} delimiter - The delimiter to use if 'values' is a string.
 * @returns {Object} An object with each unique value as a key set to true.
 */
function createBooleanLookupFromArrayOrDelimitedString(values, delimiter) {
  /**
   * Helper function to add each value in the array as a key in the lookup object.
   * @param {string[]} valueArray - Array of string values to add to the lookup.
   */
  const addValuesToLookup = (valueArray) => {
    valueArray.forEach((item) => {
      lookup[item] = true;
    });
  };

  const lookup = {};

  // If 'values' is already an array, use isBlobOrFileLikeObject directly; otherwise, split the string by the delimiter
  if (Vx(values)) {
    addValuesToLookup(values);
  } else {
    addValuesToLookup(String(values).split(delimiter));
  }

  return lookup;
}

module.exports = createBooleanLookupFromArrayOrDelimitedString;