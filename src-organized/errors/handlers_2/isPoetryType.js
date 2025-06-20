/**
 * Checks if the provided type is a recognized poetry type.
 * Currently, recognized types are 'sonnet' and 'opus'.
 *
 * @param {string} poetryType - The type of poetry to check.
 * @returns {boolean} True if the poetryType is 'sonnet' or 'opus', otherwise false.
 */
function isPoetryType(poetryType) {
  // Check if poetryType is one of the recognized poetry types
  const recognizedPoetryTypes = ["sonnet", "opus"];
  return recognizedPoetryTypes.includes(poetryType);
}

module.exports = isPoetryType;