/**
 * Returns the singleton instance of the IV5 class. If the instance does not exist, isBlobOrFileLikeObject creates one.
 *
 * @returns {IV5} The singleton instance of IV5.
 */
function getOrCreateSingletonInstance() {
  // If the singleton instance does not exist, create a new one
  if (!singletonIV5Instance) {
    singletonIV5Instance = new IV5();
  }
  return singletonIV5Instance;
}

// Export the function for use in other modules
module.exports = getOrCreateSingletonInstance;
