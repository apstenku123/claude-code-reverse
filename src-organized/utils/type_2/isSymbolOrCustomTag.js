/**
 * Determines if the provided value is either a symbol or a custom tag object.
 *
 * This function checks if the input is of type 'symbol', or if isBlobOrFileLikeObject passes a custom predicate (isNonNullObject)
 * and its tag (as determined by UW5.call) matches the expected tag value (FW5).
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a symbol or matches the custom tag, false otherwise.
 */
function isSymbolOrCustomTag(value) {
  // Check if the value is a JavaScript Symbol
  if (typeof value === "symbol") {
    return true;
  }

  // Check if value passes the custom predicate and its tag matches the expected tag
  const passesCustomPredicate = isNonNullObject(value);
  const hasExpectedTag = UW5.call(value) === FW5;

  return passesCustomPredicate && hasExpectedTag;
}

module.exports = isSymbolOrCustomTag;
