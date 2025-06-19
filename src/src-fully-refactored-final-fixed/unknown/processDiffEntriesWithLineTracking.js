/**
 * Processes an array of diff entries, assigning line numbers and grouping consecutive removals.
 *
 * Each entry is expected to have the following properties: code, type, originalCode, wordDiff, matchedLine.
 * The function increments the line number for each entry, except for consecutive 'remove' entries, which are grouped and assigned the same line number.
 *
 * @param {Array<Object>} diffEntries - Array of diff entry objects to process.
 * @param {number} startingLineNumber - The initial line number to start from.
 * @returns {Array<Object>} An array of processed diff entries with assigned line numbers.
 */
function processDiffEntriesWithLineTracking(diffEntries, startingLineNumber) {
  let currentLineNumber = startingLineNumber;
  const processedEntries = [];
  // Make a shallow copy to avoid mutating the original array
  const remainingEntries = [...diffEntries];

  while (remainingEntries.length > 0) {
    // Remove the first entry from the array
    const entry = remainingEntries.shift();
    const {
      code,
      type,
      originalCode,
      wordDiff,
      matchedLine
    } = entry;

    // Prepare the processed entry with the current line number
    const processedEntry = {
      code,
      type,
      i: currentLineNumber,
      originalCode,
      wordDiff,
      matchedLine
    };

    switch (type) {
      case "nochange":
        // For unchanged lines, increment line number and add to result
        currentLineNumber++;
        processedEntries.push(processedEntry);
        break;
      case "add":
        // For added lines, increment line number and add to result
        currentLineNumber++;
        processedEntries.push(processedEntry);
        break;
      case "remove": {
        // For removed lines, add to result but do not increment line number yet
        processedEntries.push(processedEntry);
        let consecutiveRemovals = 0;
        // Group consecutive 'remove' entries and assign them incremented line numbers
        while (remainingEntries[0]?.type === "remove") {
          currentLineNumber++;
          const nextRemoval = remainingEntries.shift();
          const {
            code: nextCode,
            type: nextType,
            originalCode: nextOriginalCode,
            wordDiff: nextWordDiff,
            matchedLine: nextMatchedLine
          } = nextRemoval;
          const nextProcessedEntry = {
            code: nextCode,
            type: nextType,
            i: currentLineNumber,
            originalCode: nextOriginalCode,
            wordDiff: nextWordDiff,
            matchedLine: nextMatchedLine
          };
          processedEntries.push(nextProcessedEntry);
          consecutiveRemovals++;
        }
        // Adjust line number back by the number of consecutive removals
        currentLineNumber -= consecutiveRemovals;
        break;
      }
    }
  }
  return processedEntries;
}

module.exports = processDiffEntriesWithLineTracking;