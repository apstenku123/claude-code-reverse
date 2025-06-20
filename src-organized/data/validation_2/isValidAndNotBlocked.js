/**
 * Checks if the provided value is valid according to the bT validation function
 * and ensures that the global Cq flag is not set (i.e., not blocked).
 *
 * @param {any} value - The value to validate.
 * @returns {boolean} True if the value is valid and not blocked; otherwise, false.
 */
function isValidAndNotBlocked(value) {
  // bT: external validation function
  // Cq: external global flag indicating a blocked state
  return bT(value) && !Cq;
}

module.exports = isValidAndNotBlocked;