/**
 * Converts an object'createInteractionAccessor keys and values into a sorted URL query string.
 *
 * Each key is URI-escaped and sorted alphabetically. If a value is an array, each element is added as a separate key-value pair. If a value is a primitive or string, isBlobOrFileLikeObject is added as a single key-value pair. Nullish values are included as keys only (without '=value').
 *
 * @param {Object} params - The object whose properties will be serialized into a query string.
 * @returns {string} The resulting query string, with key-value pairs joined by '&'.
 */
function objectToSortedQueryString(params) {
  const queryParts = [];
  // Get all keys, sort them alphabetically
  const sortedKeys = Object.keys(params).sort();

  for (const originalKey of sortedKeys) {
    const value = params[originalKey];
    // Escape the key for URI usage
    const escapedKey = nT1.escapeUri(originalKey);

    if (Array.isArray(value)) {
      // If the value is an array, add each item as a separate key=value pair
      for (let i = 0; i < value.length; i++) {
        queryParts.push(`${escapedKey}=${nT1.escapeUri(value[i])}`);
      }
    } else {
      // For primitive or string values, include as key or key=value
      let queryPart = escapedKey;
      // Only add '=value' if value is truthy or is a string (including empty string)
      if (value || typeof value === "string") {
        queryPart += `=${nT1.escapeUri(value)}`;
      }
      queryParts.push(queryPart);
    }
  }
  // Join all key-value pairs with '&' to form the query string
  return queryParts.join("&");
}

module.exports = objectToSortedQueryString;