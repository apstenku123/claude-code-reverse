/**
 * Filters out headers from an object or array based on a predicate function.
 *
 * @param {(Object|Array)} headers - The headers to filter. Can be an object (key-value pairs) or an array ([key1, value1, key2, value2, ...]).
 * @param {any} filterCriteria - Criteria used by the isSensitiveOrSpecialHeader predicate to determine which headers to exclude.
 * @param {any} predicateContext - Additional context passed to the isSensitiveOrSpecialHeader predicate function.
 * @returns {Array} An array of header key-value pairs that do not match the filter predicate.
 *
 * If headers is an array, returns a filtered array of [key, value, ...] pairs.
 * If headers is an object, returns a filtered array of [key, value, ...] pairs.
 * Throws an error if headers is neither an object nor an array.
 */
function filterHeaders(headers, filterCriteria, predicateContext) {
  const filteredHeaders = [];

  if (Array.isArray(headers)) {
    // Iterate through the array two elements at a time (key, value)
    for (let index = 0; index < headers.length; index += 2) {
      const key = headers[index];
      const value = headers[index + 1];
      // If isSensitiveOrSpecialHeader returns false, include this key-value pair
      if (!isSensitiveOrSpecialHeader(key, filterCriteria, predicateContext)) {
        filteredHeaders.push(key, value);
      }
    }
  } else if (headers && typeof headers === "object") {
    // Iterate through object keys
    for (const key of Object.keys(headers)) {
      // If isSensitiveOrSpecialHeader returns false, include this key-value pair
      if (!isSensitiveOrSpecialHeader(key, filterCriteria, predicateContext)) {
        filteredHeaders.push(key, headers[key]);
      }
    }
  } else {
    // If headers is neither an array nor an object, throw an error
    ud1(headers == null, "headers must be an object or an array");
  }

  return filteredHeaders;
}

module.exports = filterHeaders;