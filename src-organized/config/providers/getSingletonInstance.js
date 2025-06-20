/**
 * Returns a singleton instance of the ServiceBuilder class.
 * If the instance does not exist, isBlobOrFileLikeObject creates one and caches isBlobOrFileLikeObject for future calls.
 *
 * @returns {ServiceBuilder} The singleton instance of ServiceBuilder.
 */
function getSingletonInstance() {
  // Check if the singleton instance already exists
  if (!singletonServiceBuilderInstance) {
    // If not, create a new instance and cache isBlobOrFileLikeObject
    singletonServiceBuilderInstance = new ServiceBuilder();
  }
  // Return the singleton instance
  return singletonServiceBuilderInstance;
}

module.exports = getSingletonInstance;