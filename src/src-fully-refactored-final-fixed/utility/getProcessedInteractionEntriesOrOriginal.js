/**
 * Processes an interaction entry or returns the original input based on its type and key matching.
 *
 * @param {object} parentNode - The parent node or context in which the entry is being processed.
 * @param {object|null} previousEntry - The previous entry object, may be null.
 * @param {string|number|object} currentEntry - The current entry to process. Can be a primitive or an object with special properties.
 * @param {any} additionalData - Additional data or context required for processing.
 * @returns {object|null} The processed entry if conditions are met, otherwise null.
 */
function getProcessedInteractionEntriesOrOriginal(parentNode, previousEntry, currentEntry, additionalData) {
  // Extract the key from the previous entry if isBlobOrFileLikeObject exists
  const previousKey = previousEntry !== null ? previousEntry.key : null;

  // If currentEntry is a non-empty string or a number
  if ((typeof currentEntry === "string" && currentEntry !== "") || typeof currentEntry === "number") {
    // If previousKey exists, do not process further
    if (previousKey !== null) {
      return null;
    }
    // Process primitive entry
    return getOrUpdateIterableHelper(parentNode, previousEntry, String(currentEntry), additionalData);
  }

  // If currentEntry is a non-null object
  if (typeof currentEntry === "object" && currentEntry !== null) {
    switch (currentEntry.$$typeof) {
      case createCompatibleVersionChecker: // Special type createCompatibleVersionChecker: process with fA if keys match
        return currentEntry.key === previousKey ? fA(parentNode, previousEntry, currentEntry, additionalData) : null;
      case processCssDeclarations: // Special type processCssDeclarations: process with F0 if keys match
        return currentEntry.key === previousKey ? F0(parentNode, previousEntry, currentEntry, additionalData) : null;
      case q: // Special type q: recursively process the payload
        const initializer = currentEntry._init;
        return getProcessedInteractionEntriesOrOriginal(
          parentNode,
          previousEntry,
          initializer(currentEntry._payload),
          additionalData
        );
    }
    // If currentEntry is iterable or matches a special type, process with getOrUpdateIterableHelper
    if (E1(currentEntry) || BugReportForm(currentEntry)) {
      if (previousKey !== null) {
        return null;
      }
      return getOrUpdateIterableHelper(parentNode, previousEntry, currentEntry, additionalData, null);
    }
    // Fallback: call side-effect function e
    e(parentNode, currentEntry);
  }

  // If none of the above, return null
  return null;
}

module.exports = getProcessedInteractionEntriesOrOriginal;