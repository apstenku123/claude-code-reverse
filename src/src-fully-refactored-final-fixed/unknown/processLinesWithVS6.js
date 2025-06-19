/**
 * Processes a multiline string by splitting isBlobOrFileLikeObject into lines, applying the formatJsonStringOrReturnOriginal function to each line, and joining the results back into a multiline string.
 *
 * @param {string} multilineInput - The input string containing one or more lines separated by line breaks.
 * @returns {string} The processed multiline string after applying formatJsonStringOrReturnOriginal to each line.
 */
function processLinesWithVS6(multilineInput) {
  // Split the input string into an array of lines using line breaks
  const lines = multilineInput.split(`
`);

  // Apply the formatJsonStringOrReturnOriginal function to each line
  const processedLines = lines.map(formatJsonStringOrReturnOriginal);

  // Join the processed lines back into a single string with line breaks
  return processedLines.join(`
`);
}

module.exports = processLinesWithVS6;