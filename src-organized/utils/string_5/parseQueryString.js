/**
 * Parses a URL query string into an object mapping parameter names to values.
 * Handles repeated parameters by storing their values in arrays.
 *
 * @param {string} queryString - The URL query string to parse (may start with '?').
 * @returns {Object.<string, string|string[]|null>} An object where each key is a parameter name and the value is either a string, null, or an array of strings/nulls for repeated parameters.
 */
function parseQueryString(queryString) {
  const params = {};
  // Remove leading '?' if present
  const cleanedQueryString = queryString.replace(/^\?/, "");

  if (cleanedQueryString) {
    // Split the query string into key-value pairs
    for (const pair of cleanedQueryString.split("&")) {
      // Split each pair into key and value
      let [rawKey, rawValue = null] = pair.split("=");
      const key = decodeURIComponent(rawKey);
      let value = rawValue;
      if (value !== null) {
        value = decodeURIComponent(value);
      }
      // Handle repeated parameters by storing values in arrays
      if (!(key in params)) {
        params[key] = value;
      } else if (Array.isArray(params[key])) {
        params[key].push(value);
      } else {
        params[key] = [params[key], value];
      }
    }
  }
  return params;
}

module.exports = parseQueryString;