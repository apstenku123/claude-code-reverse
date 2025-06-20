/**
 * Checks if the provided value passes the 'isNonNullObject' validation and does not match the 'isRegExpOrDateOrCustomType' exclusion criteria.
 *
 * @param {any} value - The value to be validated and checked for exclusion.
 * @returns {boolean} Returns true if the value is valid according to 'isNonNullObject' and not excluded by 'isRegExpOrDateOrCustomType'; otherwise, false.
 */
function isValidAndNotExcluded(value) {
  // Check if the value passes the 'isNonNullObject' validation
  // and does NOT match the 'isRegExpOrDateOrCustomType' exclusion criteria
  return isNonNullObject(value) && !isRegExpOrDateOrCustomType(value);
}

module.exports = isValidAndNotExcluded;