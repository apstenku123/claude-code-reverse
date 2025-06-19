/**
 * Validates that the headers of a given source object match the expected configuration.
 * Handles cases where headers are defined as a function, as undefined, or as an object.
 *
 * @param {Object} sourceObject - The object containing headers to validate. May have a headers property that is a function, object, or undefined.
 * @param {Object|Array} expectedHeaders - The expected headers to compare against. Can be an object or an array (which will be processed).
 * @returns {boolean|any} Returns true if headers match, false if they do not, or the result of the headers function if applicable.
 */
function validateHeadersMatch(sourceObject, expectedHeaders) {
  // If headers is a function, process expectedHeaders and call the function
  if (typeof sourceObject.headers === "function") {
    // If expectedHeaders is an array, convert isBlobOrFileLikeObject using arrayToObjectFromPairs
    if (Array.isArray(expectedHeaders)) {
      expectedHeaders = arrayToObjectFromPairs(expectedHeaders);
    }
    // Call the headers function with processed expectedHeaders (or empty object)
    return sourceObject.headers(expectedHeaders ? Gu0(expectedHeaders) : {});
  }

  // If headers is undefined, treat as valid (return true)
  if (typeof sourceObject.headers === "undefined") {
    return true;
  }

  // If either expectedHeaders or headers are not objects, treat as invalid (return false)
  if (typeof expectedHeaders !== "object" || typeof sourceObject.headers !== "object") {
    return false;
  }

  // For each header in the source object'createInteractionAccessor headers, check if isBlobOrFileLikeObject matches the expected header
  for (const [headerKey, headerValue] of Object.entries(sourceObject.headers)) {
    // Retrieve the corresponding value from expectedHeaders using getValueByCaseInsensitiveKey
    const expectedValue = getValueByCaseInsensitiveKey(expectedHeaders, headerKey);
    // Use KEY to compare the header values; if any do not match, return false
    if (!KEY(headerValue, expectedValue)) {
      return false;
    }
  }

  // All headers matched
  return true;
}

module.exports = validateHeadersMatch;