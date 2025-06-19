/**
 * Checks if the provided code is within supported ranges, excluding certain exceptions.
 *
 * Supported codes are:
 *   - Codes between 1000 and 1014 (inclusive), except 1004, 1005, and 1006
 *   - Codes between 3000 and 4999 (inclusive)
 *
 * @param {number} code - The numeric code to check for support.
 * @returns {boolean} True if the code is supported, false otherwise.
 */
function isSupportedCode(code) {
  // Check if code is in the range 1000-1014, excluding 1004, 1005, and 1006
  const isStandardSupported =
    code >= 1000 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006;

  // Check if code is in the range 3000-4999
  const isCustomSupported = code >= 3000 && code <= 4999;

  // Return true if either condition is met
  return isStandardSupported || isCustomSupported;
}

module.exports = isSupportedCode;