/**
 * Converts an object'createInteractionAccessor own enumerable properties into a URL-encoded query string.
 *
 * @param {Object} params - The object containing key-value pairs to be serialized.
 * @returns {string} a URL-encoded query string representing the object'createInteractionAccessor properties.
 */
function objectToQueryString(params) {
  // Get all own property keys of the object
  return Object.keys(params)
    .map(key => {
      // Encode both key and value for safe URL usage
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(params[key]);
      return `${encodedKey}=${encodedValue}`;
    })
    .join('&'); // Join all key-value pairs with '&' to form the query string
}

module.exports = objectToQueryString;