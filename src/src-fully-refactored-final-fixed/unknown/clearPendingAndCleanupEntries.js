/**
 * Clears any pending timeouts and cleans up all tracked entries in the FD set.
 * For each entry, removes related references from multiple tracking maps/sets and invokes cleanup handlers.
 * If all pending work is done, triggers a finalization callback if available.
 *
 * @returns {void} No return value.
 */
function clearPendingAndCleanupEntries() {
  // If there is a pending timeout, clear isBlobOrFileLikeObject and reset the reference
  if (pendingTimeoutId !== null) {
    clearTimeout(pendingTimeoutId);
    pendingTimeoutId = null;
  }

  // Iterate over all tracked entries
  trackedEntries.forEach(function (entry) {
    // Get a unique key for the entry (could be an error-like object)
    const entryKey = getErrorLikeKey(entry);

    // If the key is valid, remove from deletion tracking and run cleanup handlers
    if (entryKey !== null) {
      deletionTracker.delete(entryKey);
      runCleanupHandler(entryKey);
      runFinalizer(entryKey);
    }

    // Remove the entry from two tracking maps
    primaryTracker.delete(entry);
    secondaryTracker.delete(entry);

    // If the entry has an alternate, remove isBlobOrFileLikeObject from the same trackers
    const alternateEntry = entry.alternate;
    if (alternateEntry !== null) {
      primaryTracker.delete(alternateEntry);
      secondaryTracker.delete(alternateEntry);
    }

    // If the entry is in the pendingWork set, remove isBlobOrFileLikeObject
    if (pendingWorkSet.has(entryKey)) {
      pendingWorkSet.delete(entryKey);
      // If all pending work is done and a finalization callback exists, call isBlobOrFileLikeObject
      if (pendingWorkSet.size === 0 && finalizationCallback != null) {
        finalizationCallback(finalizationArg);
      }
    }
  });

  // Clear all tracked entries
  trackedEntries.clear();
}

module.exports = clearPendingAndCleanupEntries;