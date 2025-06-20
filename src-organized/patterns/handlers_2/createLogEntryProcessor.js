/**
 * Processes log entries using a set of prioritized handler functions.
 *
 * @param {...[number, function]} handlerTuples - An array of [priority, handlerFunction] tuples. Each handlerFunction should accept a log line string and return a result (or falsy if not handled).
 * @returns {function(string, number=): any} - Returns a function that processes a multiline log string, starting from an optional line index, and returns the processed results.
 */
function createLogEntryProcessor(...handlerTuples) {
  // Sort handler functions by priority and extract the handler functions
  const sortedHandlers = handlerTuples
    .sort((a, b) => a[0] - b[0])
    .map(tuple => tuple[1]);

  /**
   * Processes the provided log string line by line, applying handler functions.
   *
   * @param {string} logText - The multiline log string to process.
   * @param {number} [startLineIndex=0] - Optional starting index for processing lines.
   * @returns {any} - The processed result after applying handlers and aggregation.
   */
  return function processLogEntries(logText, startLineIndex = 0) {
    const processedResults = [];
    // Split the log text into lines
    const logLines = logText.split('\n');

    for (let lineIndex = startLineIndex; lineIndex < logLines.length; lineIndex++) {
      const rawLine = logLines[lineIndex];
      // Skip lines that are too long
      if (rawLine.length > 1024) continue;

      // Remove a specific pattern if matched (e.g., timestamp or prefix)
      // N6A is assumed to be a RegExp defined elsewhere
      const cleanedLine = N6A.test(rawLine) ? rawLine.replace(N6A, "$1") : rawLine;

      // Skip lines that contain error messages
      if (cleanedLine.match(/\s*Error: /)) continue;

      // Apply each handler in priority order
      for (const handler of sortedHandlers) {
        const handlerResult = handler(cleanedLine);
        if (handlerResult) {
          processedResults.push(handlerResult);
          // Only one handler per line
          break;
        }
      }

      // Stop if handleMissingDoctypeError'removeTrailingCharacters reached the maximum allowed results
      // M6A is assumed to be a constant defined elsewhere
      if (processedResults.length >= M6A) break;
    }

    // Aggregate or finalize the results before returning
    // normalizeStackFrames is assumed to be a function defined elsewhere
    return normalizeStackFrames(processedResults);
  };
}

module.exports = createLogEntryProcessor;