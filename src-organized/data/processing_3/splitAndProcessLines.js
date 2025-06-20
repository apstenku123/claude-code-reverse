/**
 * Splits the input text into lines and processes each line using a specified processing function.
 * The processing function is chosen based on the 'usePrimaryProcessor' flag.
 *
 * @param {any} sourceObservable - The source object or observable to be passed to the processor function.
 * @param {string} inputText - The text to be split into lines and processed.
 * @param {boolean} [usePrimaryProcessor=true] - If true, uses the primary processor (splitTextByLength); otherwise, uses the secondary processor (splitTextByLengthPreservingWhitespace).
 * @returns {any[]} An array containing the results of processing each line.
 */
function splitAndProcessLines(sourceObservable, inputText, usePrimaryProcessor = true) {
  const processedResults = [];
  // Split the input text into lines using newline as the delimiter
  const lines = inputText.split(`\n`);
  // Choose the processing function based on the flag
  const processLine = usePrimaryProcessor ? splitTextByLength : splitTextByLengthPreservingWhitespace;
  // Process each line and accumulate the results
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    // Process the current line and append the results to the array
    processedResults.push(...processLine(sourceObservable, lines[lineIndex]));
  }
  return processedResults;
}

module.exports = splitAndProcessLines;