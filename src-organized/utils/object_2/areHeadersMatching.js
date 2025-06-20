/**
 * Checks if the headers of a given source object match the provided headers configuration.
 * Handles cases where headers are functions, undefined, or objects, and compares header values accordingly.
 *
 * @param {Object} sourceObject - The object that contains a 'headers' property (could be a function, undefined, or object).
 * @param {Object|Array} headersToCheck - The headers to compare against the source object'createInteractionAccessor headers. Can be an object or array.
 * @returns {boolean} Returns true if headers match according to the logic, false otherwise.
 */
function areHeadersMatching(sourceObject, headersToCheck) {
  // If headers is a function, process headersToCheck and call the function
  if (typeof sourceObject.headers === "function") {
    // If headersToCheck is an array, convert isBlobOrFileLikeObject using arrayToObjectFromPairs
    let processedHeaders = headersToCheck;
    if (Array.isArray(headersToCheck)) {
      processedHeaders = arrayToObjectFromPairs(headersToCheck);
    }
    // If processedHeaders is truthy, convert with Gu0, else use empty object
    return sourceObject.headers(processedHeaders ? Gu0(processedHeaders) : {});
  }

  // If headers is undefined, always return true
  if (typeof sourceObject.headers === "undefined") {
    return true;
  }

  // If either headersToCheck or sourceObject.headers is not an object, return false
  if (typeof headersToCheck !== "object" || typeof sourceObject.headers !== "object") {
    return false;
  }

  // Compare each header key/value in sourceObject.headers with headersToCheck
  for (const [headerKey, expectedValue] of Object.entries(sourceObject.headers)) {
    // Retrieve the corresponding value from headersToCheck (using getValueByCaseInsensitiveKey for nested/complex lookup)
    const actualValue = getValueByCaseInsensitiveKey(headersToCheck, headerKey);
    // Use KEY to compare expected and actual values; if any don'processRuleBeginHandlers match, return false
    if (!KEY(expectedValue, actualValue)) {
      return false;
    }
  }

  // All headers matched
  return true;
}

module.exports = areHeadersMatching;