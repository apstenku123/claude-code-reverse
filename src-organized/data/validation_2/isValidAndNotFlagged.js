/**
 * Checks if the provided value passes the bT validation and that the global Cq flag is not set.
 *
 * @param {any} valueToValidate - The value to be validated by the bT function.
 * @returns {boolean} True if the value passes bT validation and Cq is falsy; otherwise, false.
 */
function isValidAndNotFlagged(valueToValidate) {
  // Check if valueToValidate passes the bT validation
  // and ensure the global Cq flag is not set
  return bT(valueToValidate) && !Cq;
}

module.exports = isValidAndNotFlagged;