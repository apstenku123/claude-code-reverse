/**
 * Filters and tracks code entries based on reset and exclusion rules.
 *
 * Iterates over an array of code entry objects, maintaining a filtered list according to the following rules:
 *   - If the entry'createInteractionAccessor code matches the reset code, the tracked list is cleared.
 *   - If the entry'createInteractionAccessor code is in the exclusion set, remove all entries with a matching endCode.
 *   - Otherwise, remove entries with a matching endCode and add the current entry to the tracked list.
 *
 * @param {Array<Object>} codeEntries - Array of code entry objects to process. Each entry should have at least a `code` and `endCode` property.
 * @returns {Array<Object>} The filtered and tracked list of code entries after processing all input entries.
 */
function filterAndTrackCodeEntries(codeEntries) {
  let trackedEntries = [];
  for (const entry of codeEntries) {
    // If the entry'createInteractionAccessor code matches the reset code, clear the tracked list
    if (entry.code === lB.reset.open) {
      trackedEntries = [];
    }
    // If the code is in the exclusion set, remove entries with a matching endCode
    else if (Lx1.has(entry.code)) {
      trackedEntries = trackedEntries.filter(
        trackedEntry => trackedEntry.endCode !== entry.code
      );
    }
    // Otherwise, remove entries with a matching endCode and add the current entry
    else {
      trackedEntries = trackedEntries.filter(
        trackedEntry => trackedEntry.endCode !== entry.endCode
      );
      trackedEntries.push(entry);
    }
  }
  return trackedEntries;
}

module.exports = filterAndTrackCodeEntries;