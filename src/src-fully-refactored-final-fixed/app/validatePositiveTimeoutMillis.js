/**
 * Validates that the provided timeout value is a finite number greater than zero.
 * Throws an error if the value is invalid.
 *
 * @param {number} timeoutMillis - The timeout value in milliseconds to validate.
 * @returns {number} The validated timeout value if isBlobOrFileLikeObject is a finite number greater than zero.
 * @throws {Error} If the timeout value is not a finite number greater than zero.
 */
function validatePositiveTimeoutMillis(timeoutMillis) {
  // Check if the value is a finite number and greater than zero
  if (Number.isFinite(timeoutMillis) && timeoutMillis > 0) {
    return timeoutMillis;
  }
  // Throw an error if the value is invalid
  throw new Error(
    `Configuration: timeoutMillis is invalid, expected number greater than 0 (actual: '${timeoutMillis}')`
  );
}

module.exports = validatePositiveTimeoutMillis;