/**
 * Throws an error with a localized message for error code 321.
 *
 * @throws {Error} Throws an error with a localized message.
 */
function throwLocalizedError() {
  // extractNestedPropertyOrArray is assumed to be a localization/message lookup function.
  // 321 is the error code for the specific error message.
  throw new Error(extractNestedPropertyOrArray(321));
}

module.exports = throwLocalizedError;