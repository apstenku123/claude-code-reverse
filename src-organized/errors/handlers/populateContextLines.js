/**
 * Populates the given error object with pre-context, context, and post-context lines from the source code.
 *
 * @param {string[]} sourceLines - Array of source code lines.
 * @param {Object} errorContext - Error context object to populate. Must have at least a 'lineno' property (1-based line number).
 * @param {number} [contextLineCount=5] - Number of lines of context to include before and after the context line.
 * @returns {void}
 *
 * @example
 * const source = ['line1', 'line2', 'line3', 'line4', 'line5'];
 * const error = { lineno: 3, colno: 2 };
 * populateContextLines(source, error, 2);
 * // error now has pre_context, context_line, and post_context properties
 */
function populateContextLines(sourceLines, errorContext, contextLineCount = 5) {
  // If lineno is not defined, do nothing
  if (errorContext.lineno === undefined) return;

  const totalLines = sourceLines.length;
  // Convert 1-based lineno to 0-based index, clamp to valid range
  const contextLineIndex = Math.max(Math.min(totalLines - 1, errorContext.lineno - 1), 0);

  // Calculate start and end indices for pre-context
  const preContextStart = Math.max(0, contextLineIndex - contextLineCount);
  const preContextEnd = contextLineIndex;
  errorContext.pre_context = sourceLines
    .slice(preContextStart, preContextEnd)
    .map(line => _E1.snipLine(line, 0));

  // Get the context line (the line where the error occurred)
  const contextLine = sourceLines[Math.min(totalLines - 1, contextLineIndex)];
  errorContext.context_line = _E1.snipLine(contextLine, errorContext.colno || 0);

  // Calculate start and end indices for post-context
  const postContextStart = Math.min(contextLineIndex + 1, totalLines);
  const postContextEnd = contextLineIndex + 1 + contextLineCount;
  errorContext.post_context = sourceLines
    .slice(postContextStart, postContextEnd)
    .map(line => _E1.snipLine(line, 0));
}

module.exports = populateContextLines;
