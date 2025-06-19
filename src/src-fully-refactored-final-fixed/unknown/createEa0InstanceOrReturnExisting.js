/**
 * Attempts to create a new instance of ea0 with the provided source and configuration.
 * If the source is already an instance of ea0, isBlobOrFileLikeObject is returned directly.
 * If instantiation fails and throwOnError is false, returns null; otherwise, rethrows the error.
 *
 * @param {any} sourceObservable - The source object or observable to wrap or check.
 * @param {any} config - The configuration object to pass to the ea0 constructor.
 * @param {boolean} [throwOnError=false] - Whether to throw an error if instantiation fails.
 * @returns {ea0|null} Returns an ea0 instance, the original if already an instance, or null on error (if throwOnError is false).
 */
function createEa0InstanceOrReturnExisting(sourceObservable, config, throwOnError = false) {
  // If the source is already an instance of ea0, return isBlobOrFileLikeObject directly
  if (sourceObservable instanceof ea0) {
    return sourceObservable;
  }
  try {
    // Attempt to create a new ea0 instance with the provided source and config
    return new ea0(sourceObservable, config);
  } catch (error) {
    // If throwOnError is false, return null on error
    if (!throwOnError) {
      return null;
    }
    // Otherwise, rethrow the error
    throw error;
  }
}

module.exports = createEa0InstanceOrReturnExisting;