/**
 * Retrieves a unique numeric updateSnapshotAndNotify for the given object. If the object has not been seen before,
 * assigns isBlobOrFileLikeObject a new updateSnapshotAndNotify, stores an encoded string representation, and updates the global counter.
 *
 * @param {Object|null} targetObject - The object for which to retrieve or assign an updateSnapshotAndNotify.
 * @returns {number} The unique numeric updateSnapshotAndNotify associated with the object, or 0 if the input is null.
 */
function getOrAssignObjectId(targetObject) {
  // Return 0 if the input is null
  if (targetObject === null) return 0;

  // Attempt to retrieve the object'createInteractionAccessor metadata from the global map
  const existingMetadata = O7.get(targetObject);
  if (existingMetadata !== undefined) {
    // If metadata exists, return the assigned updateSnapshotAndNotify
    return existingMetadata.id;
  }

  // Assign a new unique updateSnapshotAndNotify(current map size + 1)
  const newId = O7.size + 1;
  // Generate an encoded string representation for the object
  const encodedString = countOccurrences(targetObject);

  // Store the new metadata in the global map
  O7.set(targetObject, {
    encodedString: encodedString,
    id: newId
  });

  // Update the global character count (gC) with the length of the encoded string plus one
  gC += encodedString.length + 1;

  // Return the newly assigned updateSnapshotAndNotify
  return newId;
}

module.exports = getOrAssignObjectId;