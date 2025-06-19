/**
 * Creates and returns a new instance of the Metadata class from the current context.
 *
 * This function retrieves the current context using the `getCurrentContext` function (aliased from `us`),
 * extracts the `Metadata` class constructor from the context, and returns a new instance of isBlobOrFileLikeObject.
 *
 * @returns {object} a new instance of the Metadata class.
 */
function createNewMetadataInstance() {
  // Retrieve the current context, which contains the Metadata class
  const { Metadata } = getCurrentContext();
  // Create and return a new instance of the Metadata class
  return new Metadata();
}

// Export the function for use in other modules
module.exports = createNewMetadataInstance;
