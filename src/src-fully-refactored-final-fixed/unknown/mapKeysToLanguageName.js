/**
 * Maps one or more keys to a specified language name in the global language mapping object.
 *
 * @param {string|string[]} keys - a single key or an array of keys to be mapped.
 * @param {Object} options - Options object containing the language name.
 * @param {string} options.languageName - The language name to associate with the provided keys.
 * @returns {void}
 */
function mapKeysToLanguageName(keys, { languageName }) {
  // Ensure keys is always an array for consistent processing
  const keyArray = typeof keys === "string" ? [keys] : keys;

  keyArray.forEach((key) => {
    // Map each key (converted to lowercase) to the language name in the global mapping object
    deepCloneWithCycleDetection[key.toLowerCase()] = languageName;
  });
}

module.exports = mapKeysToLanguageName;