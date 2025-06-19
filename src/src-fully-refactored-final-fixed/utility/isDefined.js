/**
 * Checks whether the provided value is neither undefined nor null.
 *
 * @param {*} value - The value to check for definition.
 * @returns {boolean} True if the value is defined (not undefined and not null), false otherwise.
 */
function isDefined(value) {
  // Returns true if value is not undefined and not null
  return value !== undefined && value !== null;
}

module.exports = isDefined;