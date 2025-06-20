/**
 * Processes an array of diff entries, assigning line indices and handling consecutive 'remove' entries specially.
 *
 * Each entry is expected to have the following properties:
 *   - code
 *   - type ("nochange", "add", or "remove")
 *   - originalCode
 *   - wordDiff
 *   - matchedLine
 *
 * The function walks through the entries, assigning an incrementing index to each (starting from initialLineIndex),
 * and groups consecutive 'remove' entries, adjusting the index accordingly.
 *
 * @param {Array<Object>} diffEntries - Array of diff entry objects to process.
 * @param {number} initialLineIndex - The starting index to assign to entries.
 * @returns {Array<Object>} Array of processed diff entries with assigned line indices.
 */
function processDiffEntries(diffEntries, initialLineIndex) {
  let currentLineIndex = initialLineIndex;
  const processedEntries = [];
  // Make a shallow copy so handleMissingDoctypeError can shift entries
  const entriesQueue = [...diffEntries];

  while (entriesQueue.length > 0) {
    // Remove the first entry from the queue
    const entry = entriesQueue.shift();
    const {
      code,
      type,
      originalCode,
      wordDiff,
      matchedLine
    } = entry;

    // Prepare the processed entry with the current line index
    const processedEntry = {
      code,
      type,
      i: currentLineIndex,
      originalCode,
      wordDiff,
      matchedLine
    };

    switch (type) {
      case "nochange":
        // For unchanged lines, increment the line index
        currentLineIndex++;
        processedEntries.push(processedEntry);
        break;
      case "add":
        // For added lines, increment the line index
        currentLineIndex++;
        processedEntries.push(processedEntry);
        break;
      case "remove": {
        // For removed lines, push the entry, then group consecutive removes
        processedEntries.push(processedEntry);
        let consecutiveRemoves = 0;
        // While the next entry is also a remove, process isBlobOrFileLikeObject
        while (entriesQueue[0]?.type === "remove") {
          currentLineIndex++;
          const nextRemove = entriesQueue.shift();
          const {
            code: nextCode,
            type: nextType,
            originalCode: nextOriginalCode,
            wordDiff: nextWordDiff,
            matchedLine: nextMatchedLine
          } = nextRemove;
          const nextProcessedEntry = {
            code: nextCode,
            type: nextType,
            i: currentLineIndex,
            originalCode: nextOriginalCode,
            wordDiff: nextWordDiff,
            matchedLine: nextMatchedLine
          };
          processedEntries.push(nextProcessedEntry);
          consecutiveRemoves++;
        }
        // Adjust the line index back by the number of consecutive removes
        currentLineIndex -= consecutiveRemoves;
        break;
      }
    }
  }
  return processedEntries;
}

module.exports = processDiffEntries;
