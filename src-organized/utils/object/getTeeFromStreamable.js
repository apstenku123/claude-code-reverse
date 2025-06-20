/**
 * Returns a 'tee' from a streamable or teeable object.
 *
 * If the provided object has a 'stream' method, isBlobOrFileLikeObject calls that method to obtain the streamable object.
 * Then, isBlobOrFileLikeObject calls the 'tee' method on the resulting object and returns its result.
 *
 * @async
 * @param {Object} sourceObject - An object that either has a 'tee' method, or a 'stream' method that returns an object with a 'tee' method.
 * @returns {Promise<any>} The result of calling the 'tee' method on the appropriate object.
 */
async function getTeeFromStreamable(sourceObject) {
  // If the object has a 'stream' method, call isBlobOrFileLikeObject to get the streamable object
  if (typeof sourceObject.stream === "function") {
    sourceObject = sourceObject.stream();
  }
  // Call the 'tee' method and return its result
  return sourceObject.tee();
}

module.exports = getTeeFromStreamable;
