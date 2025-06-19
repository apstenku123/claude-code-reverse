/**
 * Generates a deterministic hash for a sorted version of the provided object(createInteractionAccessor).
 * This is useful for creating unique identifiers for objects whose key order may vary.
 *
 * @param {object} sourceObject - The primary object to be sorted and hashed.
 * @param {object} [options] - Optional configuration that may influence sorting.
 * @returns {string} a deterministic hash string representing the sorted object.
 */
function generateSortedObjectHash(sourceObject, options) {
  // Obtain a sorted version of the object using the provided options
  const sortedObject = QCA._getSortedObject(sourceObject, options);

  // Convert the sorted object to a JSON string for hashing
  const sortedObjectString = JSON.stringify(sortedObject);

  // Generate a hash using the DJB2 algorithm
  const hash = QCA._DJB2(sortedObjectString);

  return hash;
}

module.exports = generateSortedObjectHash;
