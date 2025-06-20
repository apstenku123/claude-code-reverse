/**
 * Retrieves a type from the mX9.types object based on a provided key string.
 * The key is first processed by the xX9 function (with 'x.' prepended),
 * converted to lowercase, and the first character is removed before lookup.
 *
 * @param {string} key - The key string to look up the type for.
 * @returns {any|false} - Returns the corresponding type from mX9.types if found, otherwise false.
 */
function getTypeByKey(key) {
  // Validate input: must be a non-empty string
  if (!key || typeof key !== "string") {
    return false;
  }

  // Process the key: prepend 'x.', pass to xX9, lowercase, and remove the first character
  const processedKey = xX9("x." + key).toLowerCase().substring(1);

  // If the processed key is falsy, return false
  if (!processedKey) {
    return false;
  }

  // Return the type from mX9.types if isBlobOrFileLikeObject exists, otherwise false
  return mX9.types[processedKey] || false;
}

module.exports = getTypeByKey;