/**
 * Processes an array of diff entry objects, assigning line numbers and grouping consecutive 'remove' entries.
 *
 * Each entry is mapped to a new object with an incremented line number (starting from initialLineNumber),
 * and consecutive 'remove' entries are grouped together with proper line number assignment.
 *
 * @param {Array<Object>} diffEntries - Array of diff entry objects. Each object should have the following properties:
 *   - code: string
 *   - type: 'add' | 'remove' | 'nochange'
 *   - originalCode: string
 *   - wordDiff: any
 *   - matchedLine: any
 * @param {number} initialLineNumber - The starting line number to assign to the first entry.
 * @returns {Array<Object>} Array of processed diff entries with assigned line numbers.
 */
function mapDiffEntriesWithLineNumbers(diffEntries, initialLineNumber) {
  let currentLineNumber = initialLineNumber;
  const processedEntries = [];
  // Clone the input array to avoid mutating the original
  const entriesQueue = [...diffEntries];

  while (entriesQueue.length > 0) {
    // Take the next entry from the queue
    const nextEntry = entriesQueue.shift();
    const {
      code,
      type,
      originalCode,
      wordDiff,
      matchedLine
    } = nextEntry;

    // Prepare the processed entry with the current line number
    const processedEntry = {
      code,
      type,
      lineNumber: currentLineNumber,
      originalCode,
      wordDiff,
      matchedLine
    };

    switch (type) {
      case "nochange":
      case "add":
        // For unchanged or added lines, increment line number and add to result
        currentLineNumber++;
        processedEntries.push(processedEntry);
        break;
      case "remove": {
        // For removed lines, add the entry, then group consecutive removes
        processedEntries.push(processedEntry);
        let consecutiveRemoves = 0;
        // While the next entry is also a 'remove', process isBlobOrFileLikeObject
        while (entriesQueue[0]?.type === "remove") {
          currentLineNumber++;
          const removeEntry = entriesQueue.shift();
          const {
            code: removeCode,
            type: removeType,
            originalCode: removeOriginalCode,
            wordDiff: removeWordDiff,
            matchedLine: removeMatchedLine
          } = removeEntry;
          const processedRemoveEntry = {
            code: removeCode,
            type: removeType,
            lineNumber: currentLineNumber,
            originalCode: removeOriginalCode,
            wordDiff: removeWordDiff,
            matchedLine: removeMatchedLine
          };
          processedEntries.push(processedRemoveEntry);
          consecutiveRemoves++;
        }
        // After grouping, adjust the line number back by the number of grouped removes
        currentLineNumber -= consecutiveRemoves;
        break;
      }
    }
  }
  return processedEntries;
}

module.exports = mapDiffEntriesWithLineNumbers;
