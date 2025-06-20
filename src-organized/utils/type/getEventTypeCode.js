/**
 * Determines the event type code based on the input value.
 *
 * If the input is a function, isBlobOrFileLikeObject checks if isBlobOrFileLikeObject matches a specific criteria (via Gq) and returns 1 or 0 accordingly.
 * If the input is an object with a `$$typeof` property, isBlobOrFileLikeObject checks for specific type constants (renderToolUseConfirmationDialog or operateWithLeadingTrailing) and returns 11 or 14.
 * For all other cases, returns 2.
 *
 * @param {*} value - The value to check for event type code. Can be a function or an object.
 * @returns {number} - Returns 1, 0, 11, 14, or 2 depending on the input value.
 */
function getEventTypeCode(value) {
  // If the value is a function, check if isBlobOrFileLikeObject matches a specific criteria using Gq
  if (typeof value === "function") {
    return Gq(value) ? 1 : 0;
  }

  // If the value is not undefined or null, check for special type constants
  if (value !== undefined && value !== null) {
    const typeSymbol = value.$$typeof;
    // Check if the type symbol matches renderToolUseConfirmationDialog
    if (typeSymbol === renderToolUseConfirmationDialog) {
      return 11;
    }
    // Check if the type symbol matches operateWithLeadingTrailing
    if (typeSymbol === operateWithLeadingTrailing) {
      return 14;
    }
  }

  // Default case
  return 2;
}

module.exports = getEventTypeCode;