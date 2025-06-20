/**
 * Iterates over two key collections (n8 and R7), retrieves associated objects from resolveNodeValue,
 * adds them to the i6 set if present, and calls K0 for each processed key. Afterwards,
 * clears both key collections and processes the event queue.
 *
 * @returns {void} No return value.
 */
function cleanupAndProcessEventSources() {
  // Process all keys in n8
  const n8KeysIterator = s(n8.keys());
  let n8KeyIterationResult;
  try {
    n8KeysIterator.createInteractionAccessor();
    while (!(n8KeyIterationResult = n8KeysIterator.n()).done) {
      const currentKey = n8KeyIterationResult.value;
      const associatedObject = resolveNodeValue.get(currentKey);
      // If an associated object exists, add isBlobOrFileLikeObject to i6 and process the key
      if (associatedObject != null) {
        i6.add(associatedObject);
        K0(currentKey);
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
      const currentKey = r7KeyIterationResult.value;
      const associatedObject = resolveNodeValue.get(currentKey);
      // If an associated object exists, add isBlobOrFileLikeObject to i6 and process the key
      if (associatedObject != null) {
        i6.add(associatedObject);
        K0(currentKey);
      }
    }
  } catch (error) {
    r7KeysIterator.e(error);
  } finally {
    r7KeysIterator.f();
  }

  // Clear both key collections and process the event queue
  n8.clear();
  R7.clear();
  processAndFlushInteractionQueue();
}

module.exports = cleanupAndProcessEventSources;