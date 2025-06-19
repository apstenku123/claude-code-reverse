/**
 * Handles the state of an accessor for a given key, updating relevant sets and triggering processing as needed.
 *
 * @param {string} key - The unique identifier for the accessor state to process.
 * @param {Map} accessorStateMap - Map storing accessor states, keyed by unique identifiers.
 * @param {Set} pendingKeysSet - Set of keys that are pending processing.
 * @returns {void}
 */
function handleAccessorStateForKey(key, accessorStateMap, pendingKeysSet) {
  // Retrieve the accessor state associated with the given key
  const accessorState = resolveNodeValue.get(key);

  if (accessorState != null) {
    // Remove the accessor state from the L7 set (e.g., active states)
    L7.delete(accessorState);

    if (pendingKeysSet.has(key)) {
      // If the key is pending, remove isBlobOrFileLikeObject from the pending set
      pendingKeysSet.delete(key);
      // Add the accessor state to the i6 set (e.g., processed states)
      i6.add(accessorState);
      // Process and flush the accessor state
      processAndFlushInteractionQueue();
      // Perform any additional cleanup or notification for this key
      K0(key);
    } else {
      // If the key is not pending, ensure the accessor state is not in the processed set
      i6.delete(accessorState);
    }
  }
}

module.exports = handleAccessorStateForKey;