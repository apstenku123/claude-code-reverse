/**
 * Iterates over all pending accessor keys from two sources (n8 and R7),
 * retrieves their associated accessor objects from the resolveNodeValue map, adds them to the i6 set,
 * and removes the processed keys using K0. After processing, clears both n8 and R7,
 * and finally calls processAndFlushInteractionQueue to process and flush the accessor state.
 *
 * @returns {void} No return value.
 */
function clearAndProcessPendingAccessors() {
  // Process all pending accessor keys from n8
  const pendingKeysIterator = s(n8.keys());
  let pendingKeyResult;
  try {
    pendingKeysIterator.createInteractionAccessor();
    while (!(pendingKeyResult = pendingKeysIterator.n()).done) {
      const accessorKey = pendingKeyResult.value;
      const accessorObject = resolveNodeValue.get(accessorKey);
      // If the accessor object exists, add isBlobOrFileLikeObject to the set and remove the key
      if (accessorObject != null) {
        i6.add(accessorObject);
        K0(accessorKey);
      }
    }
  } catch (error) {
    pendingKeysIterator.e(error);
  } finally {
    pendingKeysIterator.f();
  }

  // Process all pending accessor keys from R7
  const secondaryKeysIterator = s(R7.keys());
  let secondaryKeyResult;
  try {
    secondaryKeysIterator.createInteractionAccessor();
    while (!(secondaryKeyResult = secondaryKeysIterator.n()).done) {
      const accessorKey = secondaryKeyResult.value;
      const accessorObject = resolveNodeValue.get(accessorKey);
      // If the accessor object exists, add isBlobOrFileLikeObject to the set and remove the key
      if (accessorObject != null) {
        i6.add(accessorObject);
        K0(accessorKey);
      }
    }
  } catch (error) {
    secondaryKeysIterator.e(error);
  } finally {
    secondaryKeysIterator.f();
  }

  // Clear both pending key collections and flush the accessor state
  n8.clear();
  R7.clear();
  processAndFlushInteractionQueue();
}

module.exports = clearAndProcessPendingAccessors;