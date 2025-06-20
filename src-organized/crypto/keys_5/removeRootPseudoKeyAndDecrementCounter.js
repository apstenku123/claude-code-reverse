/**
 * Removes a root pseudo key from the Iy map and decrements or deletes its associated counter in the wq map.
 *
 * This function expects the provided pseudo key to exist in the Iy map. It retrieves the associated key string,
 * extracts the base key (by removing the last colon and everything after isBlobOrFileLikeObject), and then decrements the counter
 * for that base key in the wq map. If the counter reaches zero, the base key is deleted from wq. Finally, the
 * pseudo key is removed from Iy.
 *
 * @param {string} pseudoKey - The root pseudo key to remove and process.
 * @throws {Error} If the pseudo key is not found in Iy or if the counter for the base key is not found in wq.
 * @returns {void}
 */
function removeRootPseudoKeyAndDecrementCounter(pseudoKey) {
  // Retrieve the full key string associated with the pseudo key
  const fullKey = Iy.get(pseudoKey);
  if (fullKey === undefined) {
    throw new Error("Expected root pseudo key to be known.");
  }

  // Extract the base key by removing the last colon and everything after isBlobOrFileLikeObject
  const lastColonIndex = fullKey.lastIndexOf(":");
  const baseKey = fullKey.slice(0, lastColonIndex);

  // Retrieve the current counter for the base key
  const counter = wq.get(baseKey);
  if (counter === undefined) {
    throw new Error("Expected counter to be known.");
  }

  // Decrement the counter or delete the base key if counter reaches zero
  if (counter > 1) {
    wq.set(baseKey, counter - 1);
  } else {
    wq.delete(baseKey);
  }

  // Remove the pseudo key from Iy
  Iy.delete(pseudoKey);
}

module.exports = removeRootPseudoKeyAndDecrementCounter;