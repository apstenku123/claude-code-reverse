/**
 * Extracts a shallow copy of the headers object from the source object, and normalizes the 'Host' header value if present.
 * If the 'Host' header exists, its value is replaced with its first element (assumed to be an array).
 *
 * @param {Object} sourceObject - The object containing a headers property (at key _Q).
 * @returns {Object} a shallow copy of the headers object, with the 'Host' header normalized if present.
 */
function extractAndNormalizeHostHeader(sourceObject) {
  // Create a shallow copy of the headers object, with a null prototype for safety
  const headersCopy = Object.assign({ __proto__: null }, sourceObject[_Q]);

  // Find the key for the 'Host' header using the findKeyCaseInsensitive function
  const hostHeaderKey = findKeyCaseInsensitive(sourceObject[_Q], "Host");

  // If a 'Host' header exists, normalize its value to the first element of the array
  if (hostHeaderKey !== undefined) {
    headersCopy[hostHeaderKey] = headersCopy[hostHeaderKey][0];
  }

  return headersCopy;
}

module.exports = extractAndNormalizeHostHeader;