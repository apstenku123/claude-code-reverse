/**
 * Attempts to merge the given source object deeply, or process isBlobOrFileLikeObject using alternative handlers.
 *
 * This function tries to process the input object using three strategies, in order:
 * 1. Attempts to deeply merge the object using deepMergeObjects.
 * 2. If that fails (returns a falsy value), tries to process isBlobOrFileLikeObject with handleCustomMerge.
 * 3. If that also fails, tries to process isBlobOrFileLikeObject with processAlternativeMerge.
 * Returns the result of the first successful strategy, or the final one if all fail.
 *
 * @param {Object} sourceObject - The object to be merged or processed.
 * @returns {any} The result of the first successful merge or processing strategy, or the last attempted result.
 */
function getMergedOrProcessedObject(sourceObject) {
  // Try deep merging the object
  const mergedResult = deepMergeObjects(sourceObject);
  if (mergedResult) {
    return mergedResult;
  }

  // Try custom merge handler if deep merge failed
  const customMergeResult = handleCustomMerge(sourceObject);
  if (customMergeResult) {
    return customMergeResult;
  }

  // Fallback to alternative merge processor
  return processAlternativeMerge(sourceObject);
}

module.exports = getMergedOrProcessedObject;