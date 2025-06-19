/**
 * Generates a deterministic hash from a sorted version of the merged input objects.
 *
 * This function takes two input objects, sorts their combined properties in a deterministic order,
 * stringifies the sorted object, and then computes a hash using the DJB2 algorithm.
 *
 * @param {Object} sourceObject - The primary object to be merged and sorted.
 * @param {Object} configObject - The secondary object to be merged and sorted with the primary object.
 * @returns {string} a deterministic hash string representing the sorted and merged input objects.
 */
function generateDeterministicHashFromSortedObject(sourceObject, configObject) {
  // Merge and sort the input objects in a deterministic way
  const sortedMergedObject = QCA._getSortedObject(sourceObject, configObject);

  // Convert the sorted object to a JSON string
  const sortedObjectString = JSON.stringify(sortedMergedObject);

  // Generate a hash from the JSON string using the DJB2 algorithm
  const deterministicHash = QCA._DJB2(sortedObjectString);

  return deterministicHash;
}

module.exports = generateDeterministicHashFromSortedObject;
