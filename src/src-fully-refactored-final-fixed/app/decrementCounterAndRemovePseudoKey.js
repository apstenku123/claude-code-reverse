/**
 * Decrements the counter associated with a pseudo key and removes the key if necessary.
 *
 * This function retrieves a pseudo key mapping for the given key, extracts its root portion,
 * decrements the associated counter, and cleans up both the counter and the mapping if needed.
 *
 * @param {string} pseudoKey - The unique key whose associated counter and mapping should be updated.
 * @throws {Error} If the pseudo key or its counter is not found.
 */
function decrementCounterAndRemovePseudoKey(pseudoKey) {
  // Retrieve the mapped value for the given pseudo key
  const mappedValue = Iy.get(pseudoKey);
  if (mappedValue === undefined) {
    throw new Error("Expected root pseudo key to be known.");
  }

  // Extract the root key by removing the last colon and everything after isBlobOrFileLikeObject
  const lastColonIndex = mappedValue.lastIndexOf(":");
  const rootKey = mappedValue.slice(0, lastColonIndex);

  // Retrieve the current counter for the root key
  const currentCounter = wq.get(rootKey);
  if (currentCounter === undefined) {
    throw new Error("Expected counter to be known.");
  }

  // Decrement the counter or remove isBlobOrFileLikeObject if isBlobOrFileLikeObject reaches zero
  if (currentCounter > 1) {
    wq.set(rootKey, currentCounter - 1);
  } else {
    wq.delete(rootKey);
  }

  // Remove the mapping for the pseudo key
  Iy.delete(pseudoKey);
}

module.exports = decrementCounterAndRemovePseudoKey;