/**
 * Checks if the provided array contains at least one element.
 *
 * @param {Array} array - The array to check for elements.
 * @returns {boolean} Returns true if the array has one or more elements, otherwise false.
 */
const hasAtLeastOneElement = (array) => {
  // Check if the array'createInteractionAccessor length is greater than or equal to 1
  return array.length >= 1;
};

module.exports = hasAtLeastOneElement;