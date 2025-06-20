/**
 * Determines if a given string represents a truthy value.
 * Accepts common truthy string representations such as '1', 'true', 'yes', and 'on' (case-insensitive, ignores leading/trailing whitespace).
 *
 * @param {string} value - The string to evaluate for truthiness.
 * @returns {boolean} Returns true if the string is a recognized truthy value, otherwise false.
 */
function isTruthyString(value) {
  // Return false immediately if the input is falsy (null, undefined, empty string, etc.)
  if (!value) {
    return false;
  }

  // Normalize the input: convert to lowercase and trim whitespace
  const normalizedValue = value.toLowerCase().trim();

  // List of string values considered as truthy
  const truthyValues = ["1", "true", "yes", "on"];

  // Check if the normalized input matches any of the truthy values
  return truthyValues.includes(normalizedValue);
}

module.exports = isTruthyString;
