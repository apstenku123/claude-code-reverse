/**
 * Checks whether the provided value is neither undefined nor null.
 *
 * @param {*} value - The value to check for definedness and non-nullness.
 * @returns {boolean} True if the value is defined and not null; otherwise, false.
 */
function isDefinedAndNotNull(value) {
  // Returns true only if value is not undefined and not null
  return value !== undefined && value !== null;
}

module.exports = isDefinedAndNotNull;