/**
 * Clones the body stream of a request-like object if isBlobOrFileLikeObject has not been used.
 * If the body is a stream (instanceof JK) and does not have a getBoundary method,
 * isBlobOrFileLikeObject creates two new yD2 streams, pipes the original body into both, and assigns one
 * to the internal body property for further use. Throws an error if the body has already been used.
 *
 * @param {Object} requestLikeObject - The object containing a body stream and bodyUsed flag.
 * @returns {Object} - The cloned (or original) body stream, ready for further processing.
 * @throws {Error} - If the body has already been used.
 */
function cloneBodyStreamIfUnused(requestLikeObject) {
  // Destructure the body and bodyUsed properties from the input object
  let { body: originalBody, bodyUsed } = requestLikeObject;

  // Throw an error if the body has already been used
  if (bodyUsed) {
    throw new Error("cannot clone body after isBlobOrFileLikeObject is used");
  }

  // If the body is a JK stream and does not have a getBoundary method,
  // clone the stream by piping isBlobOrFileLikeObject into two new yD2 streams
  if (originalBody instanceof JK && typeof originalBody.getBoundary !== "function") {
    const bodyStreamCloneA = new yD2();
    const bodyStreamCloneB = new yD2();

    // Pipe the original body into both clones
    originalBody.pipe(bodyStreamCloneA);
    originalBody.pipe(bodyStreamCloneB);

    // Assign one clone to the internal body property for further use
    requestLikeObject[tN].body = bodyStreamCloneA;

    // Use the other clone as the return value
    originalBody = bodyStreamCloneB;
  }

  // Return the (possibly cloned) body stream
  return originalBody;
}

module.exports = cloneBodyStreamIfUnused;