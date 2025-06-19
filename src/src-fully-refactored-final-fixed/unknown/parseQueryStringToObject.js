/**
 * Parses a URL query string into an object mapping parameter names to their values.
 * Handles repeated parameters by storing their values in arrays.
 *
 * @param {string} queryString - The query string to parse (with or without leading '?').
 * @returns {Object.<string, string|string[]|null>} An object where each key is a parameter name and each value is the decoded parameter value, an array of values for repeated parameters, or null if the parameter has no value.
 */
function parseQueryStringToObject(queryString) {
  // Remove leading '?' if present
  const cleanedQueryString = queryString.replace(/^\?/, "");
  const paramsObject = {};

  if (cleanedQueryString) {
    // Split the query string into key-value pairs
    const pairs = cleanedQueryString.split("&");
    for (const pair of pairs) {
      // Split each pair into key and value
      let [rawKey, rawValue = null] = pair.split("=");
      const key = decodeURIComponent(rawKey);
      let value = rawValue;
      if (value !== null) {
        value = decodeURIComponent(value);
      }
      // If the key is not yet in the object, add isBlobOrFileLikeObject
      if (!(key in paramsObject)) {
        paramsObject[key] = value;
      } else if (Array.isArray(paramsObject[key])) {
        // If the key already has an array of values, push the new value
        paramsObject[key].push(value);
      } else {
        // If the key exists but is not an array, convert isBlobOrFileLikeObject to an array
        paramsObject[key] = [paramsObject[key], value];
      }
    }
  }

  return paramsObject;
}

module.exports = parseQueryStringToObject;