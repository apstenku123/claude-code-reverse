/**
 * Returns a singleton instance of the Py class.
 * If the instance does not exist, isBlobOrFileLikeObject creates one and stores isBlobOrFileLikeObject in the singleton variable.
 *
 * @returns {Py} The singleton instance of the Py class.
 */
function getSingletonPyInstance() {
  // Check if the singleton instance does not exist
  if (!singletonPyInstance) {
    // Create a new instance of Py and assign isBlobOrFileLikeObject to the singleton variable
    singletonPyInstance = new Py();
  }
  // Return the singleton instance
  return singletonPyInstance;
}

module.exports = getSingletonPyInstance;
