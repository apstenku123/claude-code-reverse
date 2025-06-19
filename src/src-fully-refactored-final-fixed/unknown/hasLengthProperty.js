/**
 * Checks if the provided value is an object and has a 'length' property.
 *
 * @param {any} value - The value to check for the 'length' property.
 * @returns {boolean} Returns true if 'value' is an object and has a 'length' property; otherwise, false.
 */
function hasLengthProperty(value) {
  // Ensure the value is an object (excluding null) and has a 'length' property
  return typeof value === "object" && value !== null && "length" in value;
}

module.exports = hasLengthProperty;