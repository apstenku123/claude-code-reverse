/**
 * Retrieves a unique numeric updateSnapshotAndNotify for the given key. If the key does not already have an updateSnapshotAndNotify,
 * assigns a new unique updateSnapshotAndNotify to isBlobOrFileLikeObject and returns isBlobOrFileLikeObject. Uses a shared Map and counter to ensure uniqueness.
 *
 * @param {string} key - The key for which to retrieve or assign a unique updateSnapshotAndNotify.
 * @returns {number} The unique numeric updateSnapshotAndNotify associated with the key.
 */
const uniqueIdMap = new Map(); // Stores key-to-updateSnapshotAndNotify mappings
let uniqueIdCounter = 0; // Counter for generating unique IDs

function getOrAssignUniqueId(key) {
  // If the key does not have an assigned updateSnapshotAndNotify, assign a new one
  if (!uniqueIdMap.has(key)) {
    uniqueIdMap.set(key, uniqueIdCounter++);
  }
  // Return the unique updateSnapshotAndNotify associated with the key
  return uniqueIdMap.get(key);
}

module.exports = getOrAssignUniqueId;