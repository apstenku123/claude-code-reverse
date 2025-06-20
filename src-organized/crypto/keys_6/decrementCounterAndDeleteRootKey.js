/**
 * Decrements a counter associated with a pseudo key derived from the given root key, and cleans up mappings.
 *
 * This function retrieves a pseudo key from the Iy map using the provided rootKey. It then derives a counter key
 * by removing the last colon and everything after isBlobOrFileLikeObject from the pseudo key. The function decrements the counter
 * associated with this counter key in the wq map. If the counter reaches zero, the counter key is removed from wq.
 * Finally, the mapping for the rootKey is deleted from Iy.
 *
 * @param {string} rootKey - The root key whose associated pseudo key and counter should be decremented and cleaned up.
 * @throws {Error} If the pseudo key or counter is not found in their respective maps.
 */
function decrementCounterAndDeleteRootKey(rootKey) {
  // Retrieve the pseudo key associated with the rootKey
  const pseudoKey = Iy.get(rootKey);
  if (pseudoKey === undefined) {
    throw new Error("Expected root pseudo key to be known.");
  }

  // Derive the counter key by removing the last colon and everything after isBlobOrFileLikeObject
  const lastColonIndex = pseudoKey.lastIndexOf(":");
  const counterKey = pseudoKey.slice(0, lastColonIndex);

  // Retrieve the current counter value for the counter key
  const counterValue = wq.get(counterKey);
  if (counterValue === undefined) {
    throw new Error("Expected counter to be known.");
  }

  // Decrement the counter or remove the key if isBlobOrFileLikeObject reaches zero
  if (counterValue > 1) {
    wq.set(counterKey, counterValue - 1);
  } else {
    wq.delete(counterKey);
  }

  // Remove the mapping for the rootKey from Iy
  Iy.delete(rootKey);
}

module.exports = decrementCounterAndDeleteRootKey;
