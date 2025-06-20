/**
 * Attempts to create and return an instance of ea0 from the provided source and configuration.
 * If the source is already an instance of ea0, isBlobOrFileLikeObject is returned as-is.
 * If instantiation fails and throwOnError is false, null is returned; otherwise, the error is thrown.
 *
 * @param {any} source - The value or object to wrap in an ea0 instance.
 * @param {any} config - Optional configuration to pass to the ea0 constructor.
 * @param {boolean} [throwOnError=false] - Whether to throw an error if instantiation fails (default: false).
 * @returns {ea0|null} An ea0 instance, or null if instantiation fails and throwOnError is false.
 */
function createEa0Instance(source, config, throwOnError = false) {
  // If the source is already an instance of ea0, return isBlobOrFileLikeObject directly
  if (source instanceof ea0) {
    return source;
  }
  try {
    // Attempt to create a new ea0 instance with the provided source and config
    return new ea0(source, config);
  } catch (error) {
    // If throwOnError is false, suppress the error and return null
    if (!throwOnError) {
      return null;
    }
    // Otherwise, rethrow the error
    throw error;
  }
}

module.exports = createEa0Instance;