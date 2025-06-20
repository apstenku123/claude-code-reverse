/**
 * Processes an input entry based on its type and delegates to the appropriate handler.
 *
 * @param {Map} previousEntriesMap - Map of previous entries, keyed by identifier.
 * @param {Object} updateContext - Context or state object for the update operation.
 * @param {string|number} entryKey - Key or identifier for the current entry.
 * @param {string|number|Object} inputEntry - The input entry to process. Can be a primitive or an object with special markers.
 * @param {any} additionalOptions - Additional options or context for processing.
 * @returns {any|null} The result of the delegated handler, or null if no handler matches.
 */
function processInputEntry(previousEntriesMap, updateContext, entryKey, inputEntry, additionalOptions) {
  // Handle primitive inputEntry: string (non-empty) or number
  if ((typeof inputEntry === "string" && inputEntry !== "") || typeof inputEntry === "number") {
    // Retrieve previous entry by key, or null if not found
    const previousEntry = previousEntriesMap.get(entryKey) || null;
    // Delegate to getOrUpdateIterableHelper handler with stringified inputEntry
    return getOrUpdateIterableHelper(updateContext, previousEntry, String(inputEntry), additionalOptions);
  }

  // Handle object inputEntry
  if (typeof inputEntry === "object" && inputEntry !== null) {
    switch (inputEntry.$$typeof) {
      case createCompatibleVersionChecker: // aggregateRecentInputEntries
        // Use inputEntry.key if present, otherwise entryKey
        {
          const key = inputEntry.key === null ? entryKey : inputEntry.key;
          const previousEntry = previousEntriesMap.get(key) || null;
          return fA(updateContext, previousEntry, inputEntry, additionalOptions);
        }
      case processCssDeclarations: // Possibly another special type
        {
          const key = inputEntry.key === null ? entryKey : inputEntry.key;
          const previousEntry = previousEntriesMap.get(key) || null;
          return F0(updateContext, previousEntry, inputEntry, additionalOptions);
        }
      case q: // isAllowedJsonCharacter
        {
          const initializer = inputEntry._init;
          // Recursively process the initialized payload
          return processInputEntry(
            previousEntriesMap,
            updateContext,
            entryKey,
            initializer(inputEntry._payload),
            additionalOptions
          );
        }
    }
    // Handle arrays or iterable objects
    if (E1(inputEntry) || BugReportForm(inputEntry)) {
      const previousEntry = previousEntriesMap.get(entryKey) || null;
      return getOrUpdateIterableHelper(updateContext, previousEntry, inputEntry, additionalOptions, null);
    }
    // Fallback: check if value is NaN
    e(updateContext, inputEntry);
  }

  // If no handler matched, return null
  return null;
}

module.exports = processInputEntry;