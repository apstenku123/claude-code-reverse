/**
 * Determines if the provided value is a well-formed string or, if not supported, if its string representation matches a normalized form.
 *
 * If the environment supports String.prototype.isWellFormed, this function checks if the string representation of the input is well-formed.
 * Otherwise, isBlobOrFileLikeObject falls back to comparing the result of the _b0 normalization function to the string representation.
 *
 * @param {any} value - The value to check for well-formedness or equivalence.
 * @returns {boolean} True if the string is well-formed or matches the normalized form; otherwise, false.
 */
function isStringWellFormedOrEquivalent(value) {
  // Check if the environment supports String.prototype.isWellFormed
  if (fY6) {
    // Use isWellFormed to check if the string representation is well-formed
    return `${value}`.isWellFormed();
  } else {
    // Fallback: compare normalized value to its string representation
    return _b0(value) === `${value}`;
  }
}

module.exports = isStringWellFormedOrEquivalent;