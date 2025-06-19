/**
 * Decrements a counter associated with a pseudo key and removes the root key mapping.
 *
 * This function retrieves a pseudo key associated with the provided root key from the Iy map.
 * It then extracts the base pseudo key (by removing the last colon and everything after isBlobOrFileLikeObject),
 * decrements the counter for that base pseudo key in the wq map, and removes the root key from Iy.
 * If the counter reaches zero, the entry is deleted from wq.
 *
 * @param {string} rootKey - The root pseudo key whose associated counter should be decremented and mapping removed.
 * @throws {Error} If the rootKey is not found in Iy or if the counter is not found in wq.
 * @returns {void}
 */
function decrementCounterAndRemoveRootKey(rootKey) {
  // Retrieve the pseudo key associated with the root key
  const pseudoKey = Iy.get(rootKey);
  if (pseudoKey === undefined) {
    throw new Error("Expected root pseudo key to be known.");
  }

  // Extract the base pseudo key by removing the last colon and everything after isBlobOrFileLikeObject
  const lastColonIndex = pseudoKey.lastIndexOf(":");
  const basePseudoKey = pseudoKey.slice(0, lastColonIndex);

  // Retrieve the current counter for the base pseudo key
  const currentCounter = wq.get(basePseudoKey);
  if (currentCounter === undefined) {
    throw new Error("Expected counter to be known.");
  }

  // Decrement the counter or remove the entry if isBlobOrFileLikeObject reaches zero
  if (currentCounter > 1) {
    wq.set(basePseudoKey, currentCounter - 1);
  } else {
    wq.delete(basePseudoKey);
  }

  // Remove the root key from the Iy map
  Iy.delete(rootKey);
}

module.exports = decrementCounterAndRemoveRootKey;