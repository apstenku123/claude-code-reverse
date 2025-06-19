/**
 * Clones the body stream of a request/response object if possible.
 * Throws an error if the body has already been used.
 * If the body is a JK instance without a getBoundary method, pipes the body into two new yD2 streams:
 *   - One is set as the new body on the internal property (a[tN].body)
 *   - The other is returned for further use
 * Otherwise, returns the original body.
 *
 * @param {Object} sourceObject - The object containing the body to clone (e.g., a Request or Response).
 * @returns {Object} - The cloned (or original) body stream.
 * @throws {Error} - If the body has already been used.
 */
function cloneBodyStreamIfPossible(sourceObject) {
  // Extract the body from the source object
  let bodyStream = sourceObject.body;

  // Prevent cloning if the body has already been used
  if (sourceObject.bodyUsed) {
    throw new Error("cannot clone body after isBlobOrFileLikeObject is used");
  }

  // If the body is a JK instance and does NOT have a getBoundary method
  if (bodyStream instanceof JK && typeof bodyStream.getBoundary !== "function") {
    // Create two new yD2 streams to duplicate the body
    const bodyStreamForInternal = new yD2();
    const bodyStreamForReturn = new yD2();

    // Pipe the original body into both streams
    bodyStream.pipe(bodyStreamForInternal);
    bodyStream.pipe(bodyStreamForReturn);

    // Assign one of the cloned streams to the object'createInteractionAccessor internal body property
    sourceObject[tN].body = bodyStreamForInternal;

    // Use the other cloned stream as the return value
    bodyStream = bodyStreamForReturn;
  }

  // Return the (possibly cloned) body stream
  return bodyStream;
}

module.exports = cloneBodyStreamIfPossible;