/**
 * Checks if the provided value is strictly equal to itself (i.e., not NaN)
 * and also not considered a VB (special value as determined by the VB function).
 *
 * @param {*} value - The value to be checked for validity and VB exclusion.
 * @returns {boolean} Returns true if the value is not NaN and not a VB value; otherwise, false.
 */
function isValidNonVBValue(value) {
  // Check for NaN by comparing value to itself (NaN !== NaN)
  // and ensure value is not a VB value
  return value === value && !VB(value);
}

module.exports = isValidNonVBValue;