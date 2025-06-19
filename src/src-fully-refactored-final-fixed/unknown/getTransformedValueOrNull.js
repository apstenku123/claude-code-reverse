/**
 * Retrieves a value associated with the given key from the resolveNodeValue map and applies a transformation if found.
 *
 * @param {string} key - The key to look up in the resolveNodeValue map.
 * @returns {any|null} The transformed value if the key exists, otherwise null.
 */
function getTransformedValueOrNull(key) {
  // Attempt to retrieve the value associated with the provided key from the resolveNodeValue map
  const valueFromMap = resolveNodeValue.get(key);

  // If a value exists, apply the transformation function d1; otherwise, return null
  return valueFromMap != null ? d1(valueFromMap) : null;
}

module.exports = getTransformedValueOrNull;