/**
 * Checks if a class handle, created from the given prototype and metadata, is included in a specified group.
 *
 * @param {Object} classPrototype - The prototype of the class to create a handle for.
 * @param {Object} pointerMetadata - Metadata used to create the class handle.
 * @param {string} groupKey - The key identifying the group to check inclusion against.
 * @returns {boolean} True if the created class handle is included in the specified group; otherwise, false.
 */
function isClassHandleIncludedInGroup(classPrototype, pointerMetadata, groupKey) {
  // Perform external validation or setup for the group key
  b9(groupKey);

  // Create a handle for the class using the provided prototype and metadata
  const classHandle = createClassHandle(classPrototype, pointerMetadata);

  // Check if the created handle is included in the group identified by groupKey
  return X0[groupKey].includes(classHandle);
}

module.exports = isClassHandleIncludedInGroup;