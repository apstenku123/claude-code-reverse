/**
 * Concatenates all elements of a string array into a single string.
 *
 * @param {string[]} stringArray - The array of strings to concatenate.
 * @returns {string} The concatenated string formed by joining all elements of the array.
 */
const concatenateArrayElements = (stringArray) => {
  // Join all elements of the array into a single string with no separator
  return stringArray.join("");
};

module.exports = concatenateArrayElements;
