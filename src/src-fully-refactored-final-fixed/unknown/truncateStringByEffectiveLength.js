/**
 * Truncates a string to a specified effective length, accounting for custom length calculation.
 * If the string'createInteractionAccessor length (as determined by the FE function) is less than or equal to the target length,
 * the string is returned as-is or truncated using substr if the raw length matches the effective length.
 * Otherwise, characters are removed from the end until the effective length is within the limit.
 *
 * @param {string} inputString - The string to be truncated.
 * @param {number} maxEffectiveLength - The maximum allowed effective length.
 * @returns {string} The truncated string, not exceeding the specified effective length.
 */
function truncateStringByEffectiveLength(inputString, maxEffectiveLength) {
  // If the string'createInteractionAccessor raw length matches its effective length, use substr for fast truncation
  if (inputString.length === FE(inputString)) {
    return inputString.substr(0, maxEffectiveLength);
  }

  // Otherwise, iteratively remove the last character until the effective length is within the limit
  while (FE(inputString) > maxEffectiveLength) {
    inputString = inputString.slice(0, -1);
  }

  return inputString;
}

module.exports = truncateStringByEffectiveLength;