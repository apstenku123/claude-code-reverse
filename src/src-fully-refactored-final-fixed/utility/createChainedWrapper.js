/**
 * Creates a wrapper object from the provided value and enables chaining on isBlobOrFileLikeObject.
 *
 * @param {*} value - The value to wrap and enable chaining for.
 * @returns {*} The wrapped object with chaining enabled.
 */
function createChainedWrapper(value) {
  // Create a wrapper object using the external trackAndPingOnPromise function
  const wrapper = trackAndPingOnPromise(value);
  // Enable chaining by setting the __chain__ property to true
  wrapper.__chain__ = true;
  return wrapper;
}

module.exports = createChainedWrapper;