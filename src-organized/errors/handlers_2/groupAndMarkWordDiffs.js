/**
 * Groups consecutive 'remove' and 'add' entries, marks them as word diffs, and links matched lines.
 *
 * This function processes an array of diff entries (such as those from a line-by-line diff),
 * grouping consecutive 'remove' and 'add' entries, and marking them as related word-level diffs.
 * It also links each matched pair via the 'matchedLine' property and sets 'wordDiff' to true.
 * Entries that do not participate in such a group are passed through unchanged.
 *
 * @param {Array<Object>} diffEntries - Array of diff entry objects, each with at least a 'type' property ('add', 'remove', etc.)
 * @returns {Array<Object>} - New array of diff entries with word diff information and matched lines annotated
 */
function groupAndMarkWordDiffs(diffEntries) {
  const processedEntries = [];
  let currentIndex = 0;

  while (currentIndex < diffEntries.length) {
    const currentEntry = diffEntries[currentIndex];

    // Skip falsy entries
    if (!currentEntry) {
      currentIndex++;
      continue;
    }

    // Handle 'remove' entries and attempt to group with consecutive 'add' entries
    if (currentEntry.type === "remove") {
      // Collect consecutive 'remove' entries
      const removeGroup = [currentEntry];
      let lookaheadIndex = currentIndex + 1;
      while (
        lookaheadIndex < diffEntries.length &&
        diffEntries[lookaheadIndex]?.type === "remove"
      ) {
        const nextRemove = diffEntries[lookaheadIndex];
        if (nextRemove) removeGroup.push(nextRemove);
        lookaheadIndex++;
      }

      // Collect consecutive 'add' entries immediately after the 'remove' group
      const addGroup = [];
      while (
        lookaheadIndex < diffEntries.length &&
        diffEntries[lookaheadIndex]?.type === "add"
      ) {
        const nextAdd = diffEntries[lookaheadIndex];
        if (nextAdd) addGroup.push(nextAdd);
        lookaheadIndex++;
      }

      // If both groups are non-empty, pair them and mark as word diffs
      if (removeGroup.length > 0 && addGroup.length > 0) {
        const pairCount = Math.min(removeGroup.length, addGroup.length);
        for (let pairIndex = 0; pairIndex < pairCount; pairIndex++) {
          const removeEntry = removeGroup[pairIndex];
          const addEntry = addGroup[pairIndex];
          if (removeEntry && addEntry) {
            removeEntry.wordDiff = true;
            addEntry.wordDiff = true;
            removeEntry.matchedLine = addEntry;
            addEntry.matchedLine = removeEntry;
          }
        }
        // Add all valid entries from both groups to the result
        processedEntries.push(...removeGroup.filter(Boolean));
        processedEntries.push(...addGroup.filter(Boolean));
        currentIndex = lookaheadIndex; // Skip over the grouped entries
      } else {
        // If no matching 'add' group, just add the current 'remove' entry
        processedEntries.push(currentEntry);
        currentIndex++;
      }
    } else {
      // For all other entry types, just add to the result
      processedEntries.push(currentEntry);
      currentIndex++;
    }
  }

  return processedEntries;
}

module.exports = groupAndMarkWordDiffs;
