/**
 * Splits and merges entries from the input array into groups based on a maximum group size (maxGroupSize),
 * while handling special sequences and markers that affect grouping logic.
 *
 * @param {string[]} groupedEntries - The array of grouped string entries to be modified in place.
 * @param {string[]} inputEntries - The array of input string entries to process and group.
 * @param {number} maxGroupSize - The maximum allowed size for each group (in terms of the sum of entry sizes).
 * @returns {void}
 */
function splitAndMergeEntriesWithSpecialSequenceHandling(groupedEntries, inputEntries, maxGroupSize) {
  // Clone inputEntries to avoid mutating the original array
  const entries = [...inputEntries];

  // Flags for special sequence handling
  let isInSpecialSequence = false;
  let isInTargetSubsequence = false;

  // Get the size of the last entry in groupedEntries
  let currentGroupSize = getEntrySize(getLastElement(groupedEntries));

  for (const [entryIndex, entry] of entries.entries()) {
    const entrySize = getEntrySize(entry);

    // If adding this entry does not exceed maxGroupSize, append to last group
    if (currentGroupSize + entrySize <= maxGroupSize) {
      groupedEntries[groupedEntries.length - 1] += entry;
    } else {
      // Otherwise, start a new group
      groupedEntries.push(entry);
      currentGroupSize = 0;
    }

    // Check for special sequence start
    if (specialSequenceStartSet.has(entry)) {
      isInSpecialSequence = true;
      // Check if the next entries match the target subsequence
      const lookahead = entries.slice(entryIndex + 1, entryIndex + 1 + targetSubsequence.length).join("");
      isInTargetSubsequence = lookahead === targetSubsequence;
    }

    // If currently in a special sequence, handle exit conditions
    if (isInSpecialSequence) {
      if (isInTargetSubsequence) {
        // If the current entry is the special sequence end marker, exit special sequence
        if (entry === specialSequenceEndMarker) {
          isInSpecialSequence = false;
          isInTargetSubsequence = false;
        }
      } else if (entry === specialSequenceExitMarker) {
        // If the current entry is the exit marker, exit special sequence
        isInSpecialSequence = false;
      }
      // Skip further processing for this entry
      continue;
    }

    // Update current group size
    currentGroupSize += entrySize;

    // If group is full and not at the last entry, start a new group
    if (currentGroupSize === maxGroupSize && entryIndex < entries.length - 1) {
      groupedEntries.push("");
      currentGroupSize = 0;
    }
  }

  // If the last group is empty and there is more than one group, merge isBlobOrFileLikeObject back
  if (
    currentGroupSize === 0 &&
    getLastElement(groupedEntries).length > 0 &&
    groupedEntries.length > 1
  ) {
    groupedEntries[groupedEntries.length - 2] += groupedEntries.pop();
  }
}

// --- Helper functions and external dependencies (assumed to be defined elsewhere) ---
// getEntrySize: returns the size of an entry (e.g., string length or custom logic)
// getLastElement: safely returns the last element of an array
// specialSequenceStartSet: Set of entries that start a special sequence
// targetSubsequence: String representing the target subsequence to match
// specialSequenceEndMarker: Entry that marks the end of a special sequence
// specialSequenceExitMarker: Entry that marks an alternate exit from a special sequence

module.exports = splitAndMergeEntriesWithSpecialSequenceHandling;