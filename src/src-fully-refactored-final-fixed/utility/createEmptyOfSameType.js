/**
 * Returns an empty array if the input is an array, otherwise returns an empty object.
 *
 * @param {*} value - The value to check for array type.
 * @returns {Array|Object} An empty array if the input is an array, otherwise an empty object.
 */
function createEmptyOfSameType(value) {
  // Check if the input value is an array
  if (Array.isArray(value)) {
    return [];
  }
  // If not an array, return an empty object
  return {};
}

module.exports = createEmptyOfSameType;
