/**
 * Decrements a counter associated with a pseudo key and removes the root pseudo key mapping.
 *
 * This function retrieves a pseudo key mapped to the provided root key from the Iy map. It then extracts the base key (before the last colon),
 * decrements the associated counter in the wq map, and removes the root key from Iy. If the counter reaches zero, the base key is removed from wq.
 *
 * @param {string} rootPseudoKey - The root pseudo key whose associated counter should be decremented and mapping removed.
 * @throws {Error} If the root pseudo key or its counter is not found.
 * @returns {void}
 */
function decrementCounterAndRemoveKey(rootPseudoKey) {
  // Retrieve the pseudo key associated with the root key
  const pseudoKey = Iy.get(rootPseudoKey);
  if (pseudoKey === undefined) {
    throw new Error("Expected root pseudo key to be known.");
  }

  // Extract the base key by removing the last segment after ':'
  const lastColonIndex = pseudoKey.lastIndexOf(":");
  const baseKey = pseudoKey.slice(0, lastColonIndex);

  // Retrieve the current counter for the base key
  const currentCounter = wq.get(baseKey);
  if (currentCounter === undefined) {
    throw new Error("Expected counter to be known.");
  }

  // Decrement the counter or remove the base key if isBlobOrFileLikeObject reaches zero
  if (currentCounter > 1) {
    wq.set(baseKey, currentCounter - 1);
  } else {
    wq.delete(baseKey);
  }

  // Remove the mapping for the root pseudo key
  Iy.delete(rootPseudoKey);
}

module.exports = decrementCounterAndRemoveKey;