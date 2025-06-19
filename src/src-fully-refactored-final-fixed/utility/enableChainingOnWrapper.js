/**
 * Enables chaining on the wrapper object returned by the provided wrapper function.
 *
 * @param {any} value - The value to be wrapped and have chaining enabled.
 * @returns {object} The wrapped object with chaining enabled.
 */
function enableChainingOnWrapper(value) {
  // Call the external wrapper function trackAndPingOnPromise to wrap the input value
  const wrappedObject = trackAndPingOnPromise(value);
  // Set the __chain__ property to true to enable chaining
  wrappedObject.__chain__ = true;
  return wrappedObject;
}

module.exports = enableChainingOnWrapper;