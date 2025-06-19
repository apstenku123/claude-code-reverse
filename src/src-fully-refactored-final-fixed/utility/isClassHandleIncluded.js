/**
 * Checks if a generated class handle is included in the specified collection.
 *
 * @param {any} classSource - The source object or value used to generate the class handle.
 * @param {any} classConfig - The configuration used for generating the class handle.
 * @param {string} collectionKey - The key used to access the collection of handles.
 * @returns {boolean} True if the generated class handle is included in the collection, otherwise false.
 */
function isClassHandleIncluded(classSource, classConfig, collectionKey) {
  // Perform any required external validation or setup for the collection key
  b9(collectionKey);

  // Generate a class handle using the provided source and configuration
  const classHandle = createClassHandle(classSource, classConfig);

  // Check if the generated class handle exists in the specified collection
  return X0[collectionKey].includes(classHandle);
}

module.exports = isClassHandleIncluded;