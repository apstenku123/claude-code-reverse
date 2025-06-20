/**
 * Serializes an object'createInteractionAccessor keys and values into a URI-encoded query string.
 * Handles array values by repeating the key for each array element.
 * Keys are sorted alphabetically for consistent output.
 *
 * @param {Object} params - The object to serialize into a query string. Values can be strings, numbers, or arrays of these.
 * @returns {string} The URI-encoded query string representation of the object.
 */
function serializeObjectToQueryString(params) {
  const queryParts = [];
  // Sort keys for consistent output
  const sortedKeys = Object.keys(params).sort();

  for (const rawKey of sortedKeys) {
    const value = params[rawKey];
    // Escape the key for URI usage
    const encodedKey = xi1.escapeUri(rawKey);

    if (Array.isArray(value)) {
      // For array values, repeat the key for each element
      for (let i = 0; i < value.length; i++) {
        queryParts.push(`${encodedKey}=${xi1.escapeUri(value[i])}`);
      }
    } else {
      // For non-array values, only include if value is truthy or a string (including empty string)
      let queryStringPart = encodedKey;
      if (value || typeof value === "string") {
        queryStringPart += `=${xi1.escapeUri(value)}`;
      }
      queryParts.push(queryStringPart);
    }
  }
  // Join all parts with '&' to form the final query string
  return queryParts.join("&");
}

module.exports = serializeObjectToQueryString;