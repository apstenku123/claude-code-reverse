/**
 * Returns the first non-null, non-empty string from the provided values.
 *
 * @param {string|null|undefined} primaryValue - The primary value to check.
 * @param {string|null|undefined} fallbackValue - The fallback value to use if the primary is null or empty.
 * @returns {string|undefined} The first non-null, non-empty string value, or undefined if neither is valid.
 */
function getFirstNonEmptyValue(primaryValue, fallbackValue) {
  // Check if the primary value is not null/undefined and not an empty string
  if (primaryValue != null && primaryValue !== "") {
    return primaryValue;
  }
  // If primary is invalid, check the fallback value
  if (fallbackValue != null && fallbackValue !== "") {
    return fallbackValue;
  }
  // If neither value is valid, return undefined
  return;
}

module.exports = getFirstNonEmptyValue;