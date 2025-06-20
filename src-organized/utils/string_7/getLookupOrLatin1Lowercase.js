/**
 * Attempts to retrieve a value from the $b0 lookup table using the provided source value.
 * If the lookup fails (returns null or undefined), returns the source value converted to a lowercase string using the 'latin1' encoding.
 *
 * @param {Object} sourceValue - The value to look up or convert to a lowercase string.
 * @returns {string} The value from the lookup table, or the lowercase latin1 string representation of the source value.
 */
function getLookupOrLatin1Lowercase(sourceValue) {
  // Attempt to retrieve the value from the lookup table
  const lookupResult = $b0.lookup(sourceValue);

  // If the lookup result is nullish, convert the source value to a lowercase latin1 string
  return lookupResult ?? sourceValue.toString("latin1").toLowerCase();
}

module.exports = getLookupOrLatin1Lowercase;