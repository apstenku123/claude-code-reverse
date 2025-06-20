/**
 * Checks whether the provided value is neither undefined nor null.
 *
 * @param {*} value - The value to check for defined and non-null status.
 * @returns {boolean} True if the value is defined and not null, false otherwise.
 */
function isDefinedAndNotNull(value) {
  // Return true only if value is not undefined and not null
  return value !== undefined && value !== null;
}

module.exports = isDefinedAndNotNull;