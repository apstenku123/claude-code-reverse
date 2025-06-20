/**
 * Handles user exclusion logic and processes interaction entries.
 *
 * Given a source observable configuration, a function to extract entries from a group,
 * and a subscription context, returns a function that processes a group by:
 *   1. Extracting entries from the group.
 *   2. If user exclusion is allowed and the entry is not present, returns the entries as-is.
 *   3. Otherwise, processes the entries with the provided context.
 *
 * @param {Object} sourceObservable - The source observable configuration. Should have 'allowExclusionByUser' and 'name' properties.
 * @param {Function} extractEntriesFromGroup - Function that takes a group and returns an array of entry objects (each with a 'name' property).
 * @param {any} subscriptionContext - Additional context or configuration for processing entries.
 * @returns {Function} a function that takes a group and returns processed entries or the original entries array.
 */
function handleUserExclusionAndProcessEntries(sourceObservable, extractEntriesFromGroup, subscriptionContext) {
  return function processGroup(group) {
    // Extract entries from the group using the provided function
    const entries = extractEntriesFromGroup(group);

    // If exclusion by user is allowed and the entry is not present, return entries as-is
    if (sourceObservable.allowExclusionByUser) {
      const entryExists = entries.find(entry => entry.name === sourceObservable.name);
      if (!entryExists) {
        return entries;
      }
    }

    // Otherwise, process the entries with the provided context
    return updateOrAddItemWithProperties(sourceObservable, entries, subscriptionContext);
  };
}

module.exports = handleUserExclusionAndProcessEntries;