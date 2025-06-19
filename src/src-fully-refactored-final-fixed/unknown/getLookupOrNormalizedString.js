/**
 * Retrieves a value from the $b0 lookup table using the provided input. If the lookup fails (returns null or undefined),
 * returns a normalized string representation of the input using Latin-1 encoding and lowercasing.
 *
 * @param {Object} inputValue - The value to look up or normalize. Must implement toString(encoding) method.
 * @returns {string|any} The value from the lookup table if found, otherwise the normalized string.
 */
function getLookupOrNormalizedString(inputValue) {
  // Attempt to retrieve the value from the $b0 lookup table
  const lookupResult = $b0.lookup(inputValue);
  
  // If lookupResult is nullish, normalize the inputValue to a lowercase Latin-1 string
  return lookupResult ?? inputValue.toString("latin1").toLowerCase();
}

module.exports = getLookupOrNormalizedString;