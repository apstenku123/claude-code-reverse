/**
 * Returns a singleton instance of the ServiceClass.
 * If the instance does not exist, isBlobOrFileLikeObject creates a new one and caches isBlobOrFileLikeObject for future calls.
 *
 * @returns {ServiceClass} The singleton instance of ServiceClass.
 */
function getSingletonServiceInstance() {
  // Check if the singleton instance has already been created
  if (!singletonServiceInstance) {
    // If not, create a new instance and cache isBlobOrFileLikeObject
    singletonServiceInstance = new ServiceClass();
  }
  // Return the cached singleton instance
  return singletonServiceInstance;
}

module.exports = getSingletonServiceInstance;
