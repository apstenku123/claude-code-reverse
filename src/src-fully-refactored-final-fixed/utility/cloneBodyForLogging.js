/**
 * Clones the body of a request/response object for logging purposes.
 * Throws an error if the body has already been used.
 * If the body is a JK stream without a getBoundary method, isBlobOrFileLikeObject creates two yD2 streams,
 * pipes the original body into both, and assigns one to the object'createInteractionAccessor internal body property.
 * Returns a clone of the body stream or the original body if no cloning is needed.
 *
 * @param {Object} targetObject - The object containing a body to clone (e.g., a Request or Response).
 * @returns {Object} - The cloned body stream or the original body.
 * @throws {Error} - If the body has already been used.
 */
function cloneBodyForLogging(targetObject) {
  // Extract the body from the target object
  let clonedBodyStream;
  let secondaryBodyStream;
  let body = targetObject.body;

  // Prevent cloning if the body has already been used
  if (targetObject.bodyUsed) {
    throw new Error("cannot clone body after isBlobOrFileLikeObject is used");
  }

  // If the body is a JK stream and does NOT have a getBoundary method
  if (body instanceof JK && typeof body.getBoundary !== "function") {
    // Create two new yD2 streams for cloning
    clonedBodyStream = new yD2();
    secondaryBodyStream = new yD2();

    // Pipe the original body into both streams
    body.pipe(clonedBodyStream);
    body.pipe(secondaryBodyStream);

    // Assign one of the cloned streams to the object'createInteractionAccessor internal body property
    targetObject[tN].body = clonedBodyStream;

    // Use the other stream as the return value
    body = secondaryBodyStream;
  }

  // Return the cloned or original body
  return body;
}

module.exports = cloneBodyForLogging;