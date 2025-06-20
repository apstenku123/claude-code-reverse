/**
 * Iterates over two key collections (n8 and R7), retrieves associated items from resolveNodeValue,
 * adds them to the i6 set if present, and processes each key with K0. After processing,
 * clears both key collections and flushes the interaction queue.
 *
 * @returns {void} No return value.
 */
function clearAndFlushTrackedItems() {
  // Process all keys in n8
  const n8KeysIterator = s(n8.keys());
  let n8KeyIterationResult;
  try {
    n8KeysIterator.createInteractionAccessor();
    while (!(n8KeyIterationResult = n8KeysIterator.n()).done) {
      const key = n8KeyIterationResult.value;
      const associatedItem = resolveNodeValue.get(key);
      // If an associated item exists, add to i6 and process the key
      if (associatedItem != null) {
        i6.add(associatedItem);
        K0(key);
      }
    }
  } catch (error) {
    n8KeysIterator.e(error);
  } finally {
    n8KeysIterator.f();
  }

  // Process all keys in R7
  const r7KeysIterator = s(R7.keys());
  let r7KeyIterationResult;
  try {
    r7KeysIterator.createInteractionAccessor();
    while (!(r7KeyIterationResult = r7KeysIterator.n()).done) {
      const key = r7KeyIterationResult.value;
      const associatedItem = resolveNodeValue.get(key);
      // If an associated item exists, add to i6 and process the key
      if (associatedItem != null) {
        i6.add(associatedItem);
        K0(key);
      }
    }
  } catch (error) {
    r7KeysIterator.e(error);
  } finally {
    r7KeysIterator.f();
  }

  // Clear both key collections and flush the interaction queue
  n8.clear();
  R7.clear();
  processAndFlushInteractionQueue();
}

module.exports = clearAndFlushTrackedItems;