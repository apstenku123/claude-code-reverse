/**
 * Determines if the provided config satisfies the isNonNullObject condition and does NOT satisfy the isRegExpOrDateOrCustomType condition.
 *
 * @param {any} config - The configuration object or value to be checked.
 * @returns {boolean} True if config passes isNonNullObject and does not pass isRegExpOrDateOrCustomType; otherwise, false.
 */
function isCy4AndNotLy4(config) {
  // Returns true only if isNonNullObject returns true and isRegExpOrDateOrCustomType returns false for the given config
  return isNonNullObject(config) && !isRegExpOrDateOrCustomType(config);
}

module.exports = isCy4AndNotLy4;