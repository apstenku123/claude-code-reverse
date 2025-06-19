/**
 * Processes log lines using a prioritized list of handler functions.
 *
 * @param {...[number, function]} handlerTuples - An array of [priority, handlerFunction] tuples. Each handlerFunction takes a log line and returns a result or falsy if not matched.
 * @returns {function(string, number=): any} - Returns a function that processes a multiline string of log lines, starting from an optional index, and returns the processed results.
 *
 * Dependencies (must be defined in the module scope):
 *   - N6A: RegExp to match and strip unwanted prefixes from lines
 *   - M6A: Maximum number of results to collect
 *   - normalizeStackFrames: Function to post-process and return the collected results
 */
function createLogLineProcessor(...handlerTuples) {
  // Sort handler functions by priority and extract the handler functions
  const sortedHandlers = handlerTuples
    .sort((a, b) => a[0] - b[0])
    .map(tuple => tuple[1]);

  /**
   * Processes the input log string line by line, applying handler functions in order.
   *
   * @param {string} logString - Multiline string containing log lines to process.
   * @param {number} [startIndex=0] - Optional index to start processing from.
   * @returns {any} - The processed results after applying all handlers and post-processing.
   */
  return function processLogLines(logString, startIndex = 0) {
    const results = [];
    const logLines = logString.split('\n');
    for (let lineIndex = startIndex; lineIndex < logLines.length; lineIndex++) {
      const rawLine = logLines[lineIndex];
      // Skip lines that are too long
      if (rawLine.length > 1024) continue;

      // Remove unwanted prefixes if present
      const cleanedLine = N6A.test(rawLine) ? rawLine.replace(N6A, "$1") : rawLine;

      // Skip lines that contain error messages
      if (cleanedLine.match(/\s*Error: /)) continue;

      // Try each handler in order of priority
      for (const handler of sortedHandlers) {
        const handlerResult = handler(cleanedLine);
        if (handlerResult) {
          results.push(handlerResult);
          break; // Only the first matching handler is used per line
        }
      }

      // Stop if handleMissingDoctypeError'removeTrailingCharacters collected enough results
      if (results.length >= M6A) break;
    }
    // Post-process and return the results
    return normalizeStackFrames(results);
  };
}

module.exports = createLogLineProcessor;