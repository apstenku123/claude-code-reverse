/**
 * Checks if the provided value is equal to itself (i.e., not NaN) and not considered 'VB' by the VB function.
 *
 * @param {*} value - The value to be checked for validity and VB exclusion.
 * @returns {boolean} Returns true if the value is not NaN and VB(value) returns false; otherwise, false.
 */
function isValidAndNotVB(value) {
  // Check if value is not NaN (since NaN !== NaN)
  // and ensure VB(value) returns false
  return value === value && !VB(value);
}

module.exports = isValidAndNotVB;