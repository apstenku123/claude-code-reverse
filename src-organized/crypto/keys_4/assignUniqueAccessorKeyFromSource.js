/**
 * Assigns a unique accessor key to a target object based on a key source string.
 * The key source is first normalized to lowercase, then passed to the unique accessor key assignment function.
 *
 * @param {string} keySource - The original key source string to generate a unique accessor key from.
 * @returns {string} The unique accessor key assigned based on the normalized key source.
 */
function assignUniqueAccessorKeyFromSource(keySource) {
  // Normalize the key source to lowercase using the external V5 function
  const normalizedKeySource = V5(keySource).toLowerCase();
  // Assign and retrieve a unique accessor key using the normalized key source
  return assignUniqueAccessorKey(normalizedKeySource);
}

module.exports = assignUniqueAccessorKeyFromSource;