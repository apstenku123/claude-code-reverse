/**
 * Returns the length of the body property from the given object, if determinable.
 * Handles various types: null, iterable (via `isBlobOrFileLikeObject`), Buffer, and objects with getLengthSync().
 *
 * @param {Object} requestObject - An object expected to have a `body` property.
 * @returns {number|null} The length of the body if isBlobOrFileLikeObject can be determined, otherwise null or 0 if body is null.
 */
function getBodyLength(requestObject) {
  const { body } = requestObject;

  // If body is null, return 0
  if (body === null) {
    return 0;
  }

  // If body is an iterable (custom check via 'isBlobOrFileLikeObject'), return its size
  if (isBlobOrFileLikeObject(body)) {
    return body.size;
  }

  // If body is a Buffer, return its length
  if (Buffer.isBuffer(body)) {
    return body.length;
  }

  // If body has a synchronous length getter
  if (
    body &&
    typeof body.getLengthSync === "function"
  ) {
    // If there are no length retrievers or the length is known, get the length synchronously
    const hasNoLengthRetrievers = body._lengthRetrievers && body._lengthRetrievers.length === 0;
    const hasKnownLength = body.hasKnownLength && body.hasKnownLength();
    if (hasNoLengthRetrievers || hasKnownLength) {
      return body.getLengthSync();
    }
    // Length cannot be determined
    return null;
  }

  // For all other cases, return null
  return null;
}

module.exports = getBodyLength;