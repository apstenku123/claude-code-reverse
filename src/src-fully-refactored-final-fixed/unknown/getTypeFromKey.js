/**
 * Retrieves a type from the mX9.types object based on a provided key string.
 *
 * @param {string} key - The key to look up in the types mapping.
 * @returns {string|boolean} The corresponding type string if found, otherwise false.
 */
function getTypeFromKey(key) {
  // Validate input: must be a non-empty string
  if (!key || typeof key !== "string") {
    return false;
  }

  // Prepend 'x.' to the key, process isBlobOrFileLikeObject with xX9, convert to lowercase, and remove the first character
  // This normalization is required to match the format of keys in mX9.types
  const normalizedKey = xX9("x." + key).toLowerCase().substr(1);

  if (!normalizedKey) {
    return false;
  }

  // Look up the normalized key in the types mapping
  return mX9.types[normalizedKey] || false;
}

module.exports = getTypeFromKey;
