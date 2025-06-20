/**
 * Processes lines of input text using a prioritized list of handler functions.
 *
 * @param {...[number, function]} handlerTuples - An array of [priority, handlerFunction] tuples. Each handlerFunction takes a line (string) and returns a value if isBlobOrFileLikeObject matches, or falsy otherwise.
 * @returns {function(string, number=): any} - Returns a function that takes a multiline string and an optional starting line index, processes each line with the handlers, and returns the processed results.
 */
function createLineProcessor(...handlerTuples) {
  // Sort handler tuples by priority (ascending), then extract the handler functions
  const sortedHandlers = handlerTuples
    .sort((a, b) => a[0] - b[0])
    .map(tuple => tuple[1]);

  /**
   * Processes each line of the input text, applying handler functions in order of priority.
   *
   * @param {string} inputText - The multiline string to process.
   * @param {number} [startIndex=0] - The line index to start processing from.
   * @returns {any} - The processed result after applying handlers and post-processing.
   */
  return function processLines(inputText, startIndex = 0) {
    const processedResults = [];
    // Split input text into lines
    const lines = inputText.split('\n');

    for (let lineIndex = startIndex; lineIndex < lines.length; lineIndex++) {
      const rawLine = lines[lineIndex];
      // Skip lines that are too long
      if (rawLine.length > 1024) continue;

      // Remove prefix if line matches N6A regex, otherwise keep as is
      const cleanedLine = N6A.test(rawLine) ? rawLine.replace(N6A, "$1") : rawLine;

      // Skip lines that contain an error message
      if (cleanedLine.match(/\s*Error: /)) continue;

      // Try each handler in order of priority
      for (const handler of sortedHandlers) {
        const handlerResult = handler(cleanedLine);
        if (handlerResult) {
          processedResults.push(handlerResult);
          break; // Only use the first matching handler per line
        }
      }

      // Stop if handleMissingDoctypeError'removeTrailingCharacters collected enough results
      if (processedResults.length >= M6A) break;
    }

    // Post-process and return the results
    return normalizeStackFrames(processedResults);
  };
}

module.exports = createLineProcessor;