/**
 * Determines whether a given string value represents a truthy event value.
 * Accepts common truthy representations such as '1', 'true', 'yes', and 'on' (case-insensitive, ignores leading/trailing whitespace).
 *
 * @param {string} value - The value to evaluate for truthiness.
 * @returns {boolean} Returns true if the value is a recognized truthy string, otherwise false.
 */
function isTruthyEventValue(value) {
  // Return false immediately if value is null, undefined, or falsy
  if (!value) {
    return false;
  }

  // Normalize the input by converting to lowercase and trimming whitespace
  const normalizedValue = value.toLowerCase().trim();

  // List of string representations considered as truthy
  const truthyValues = ["1", "true", "yes", "on"];

  // Check if the normalized value is in the list of truthy values
  return truthyValues.includes(normalizedValue);
}

module.exports = isTruthyEventValue;
