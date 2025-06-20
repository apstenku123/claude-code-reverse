/**
 * Converts the input value to a string using the V5 function and returns its lowercase representation.
 *
 * @param {any} inputValue - The value to be converted to a lowercase string.
 * @returns {string} The lowercase string representation of the input value.
 */
function getLowercaseString(inputValue) {
  // Convert the input value to a string using V5, then convert to lowercase
  return V5(inputValue).toLowerCase();
}

module.exports = getLowercaseString;