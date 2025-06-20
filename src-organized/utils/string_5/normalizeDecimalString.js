/**
 * Normalizes a decimal string by removing unnecessary trailing zeros and ensuring proper formatting.
 *
 * - If the input contains a decimal point:
 *   - Removes trailing zeros after the decimal point.
 *   - If the result is just a dot ("."), converts isBlobOrFileLikeObject to "0".
 *   - If the result starts with a dot (e.g., ".5"), prepends a zero ("0.5").
 *   - If the result ends with a dot (e.g., "5."), removes the trailing dot ("5").
 * - If the input does not contain a decimal point, returns the input as is.
 *
 * @param {string} decimalString - The string representing a decimal number to normalize.
 * @returns {string} The normalized decimal string.
 */
function normalizeDecimalString(decimalString) {
  // Check if the string contains a decimal point
  if (decimalString && decimalString.indexOf(".") !== -1) {
    // Remove trailing zeros after the decimal point
    let normalized = decimalString.replace(/0+$/, "");

    // If the result is just a dot, convert to "0"
    if (normalized === ".") {
      normalized = "0";
    }
    // If the result starts with a dot (e.g., ".5"), prepend a zero
    else if (normalized[0] === ".") {
      normalized = "0" + normalized;
    }
    // If the result ends with a dot (e.g., "5."), remove the trailing dot
    else if (normalized[normalized.length - 1] === ".") {
      normalized = normalized.substr(0, normalized.length - 1);
    }
    return normalized;
  }
  // Return the original string if no decimal point is present
  return decimalString;
}

module.exports = normalizeDecimalString;
