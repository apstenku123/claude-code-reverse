/**
 * Checks if the body stream of a given request-like object is either locked or disturbed.
 *
 * @param {Object} requestWrapper - The object containing a body stream to check. Must have a property referenced by `wh`.
 * @returns {boolean} True if the body stream is locked or disturbed, false otherwise.
 */
function isBodyStreamLockedOrDisturbed(requestWrapper) {
  // Access the body property from the request-like object using the external key 'wh'
  const requestBody = requestWrapper[wh]?.body;

  // If the body exists, check if its stream is locked or disturbed
  if (requestBody != null) {
    const stream = requestBody.stream;
    // Return true if the stream is locked or disturbed
    return stream.locked || Dr.isDisturbed(stream);
  }

  // If there is no body, return false
  return false;
}

module.exports = isBodyStreamLockedOrDisturbed;