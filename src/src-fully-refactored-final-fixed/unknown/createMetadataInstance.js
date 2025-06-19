/**
 * Creates and returns a new instance of the Metadata class from the current context.
 *
 * This function retrieves the 'Metadata' class from the object returned by the 'us' function,
 * then instantiates and returns a new Metadata object. This is useful for generating fresh
 * metadata containers for further processing or storage.
 *
 * @returns {object} a new instance of the Metadata class.
 */
function createMetadataInstance() {
  // Retrieve the object containing the Metadata class from the current context
  const { Metadata } = us();
  // Instantiate and return a new Metadata object
  return new Metadata();
}

module.exports = createMetadataInstance;