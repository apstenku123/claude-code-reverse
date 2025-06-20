/**
 * Processes a multiline string by splitting isBlobOrFileLikeObject into lines, applying a mapping function to each line, and joining the results back into a single string.
 *
 * @param {string} multilineString - The input string containing one or more lines separated by line breaks.
 * @returns {string} The resulting string after mapping each line and joining them with line breaks.
 */
function processLinesWithMapper(multilineString) {
  // Split the input string into an array of lines using line breaks
  const lines = multilineString.split(`
`);

  // Apply the formatJsonStringOrReturnOriginal mapping function to each line
  const mappedLines = lines.map(formatJsonStringOrReturnOriginal);

  // Join the mapped lines back into a single string with line breaks
  return mappedLines.join(`
`);
}

module.exports = processLinesWithMapper;