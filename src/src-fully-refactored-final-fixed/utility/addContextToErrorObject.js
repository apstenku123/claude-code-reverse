/**
 * Adds pre-context, context, and post-context lines to an error object based on the provided source lines and error location.
 *
 * @param {string[]} sourceLines - The array of source code lines.
 * @param {Object} errorObject - The error object to enrich with context. Must have at least a 'lineno' property (1-based line number).
 * @param {number} [contextLineCount=5] - The number of lines of context to include before and after the error line.
 * @returns {void} This function mutates the errorObject in-place, adding 'pre_context', 'context_line', and 'post_context' properties.
 */
function addContextToErrorObject(sourceLines, errorObject, contextLineCount = 5) {
  // If no line number is provided, do nothing
  if (errorObject.lineno === undefined) {
    return;
  }

  const totalLines = sourceLines.length;
  // Calculate the zero-based index of the error line, clamped within valid range
  const errorLineIndex = Math.max(Math.min(totalLines - 1, errorObject.lineno - 1), 0);

  // Calculate pre-context: lines before the error line
  const preContextStart = Math.max(0, errorLineIndex - contextLineCount);
  const preContextEnd = errorLineIndex;
  errorObject.pre_context = sourceLines
    .slice(preContextStart, preContextEnd)
    .map(line => _E1.snipLine(line, 0));

  // Get the context line (the line where the error occurred)
  const contextLine = sourceLines[Math.min(totalLines - 1, errorLineIndex)];
  errorObject.context_line = _E1.snipLine(contextLine, errorObject.colno || 0);

  // Calculate post-context: lines after the error line
  const postContextStart = Math.min(errorLineIndex + 1, totalLines);
  const postContextEnd = errorLineIndex + 1 + contextLineCount;
  errorObject.post_context = sourceLines
    .slice(postContextStart, postContextEnd)
    .map(line => _E1.snipLine(line, 0));
}

module.exports = addContextToErrorObject;