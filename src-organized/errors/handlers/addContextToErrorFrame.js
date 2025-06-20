/**
 * Adds pre-context, context, and post-context lines to an error frame object based on the provided source lines and error location.
 *
 * @param {string[]} sourceLines - The full array of source code lines.
 * @param {Object} errorFrame - The error frame object to augment. Must have a `lineno` property (1-based line number). May have a `colno` property (1-based column number).
 * @param {number} [contextLineCount=5] - The number of lines of context to include before and after the context line.
 * @returns {void} Modifies the errorFrame object in place by adding `pre_context`, `context_line`, and `post_context` properties.
 */
function addContextToErrorFrame(sourceLines, errorFrame, contextLineCount = 5) {
  // If lineno is not defined, do nothing
  if (errorFrame.lineno === undefined) return;

  const totalLines = sourceLines.length;
  // Calculate the zero-based index of the context line, clamped within valid range
  const contextLineIndex = Math.max(Math.min(totalLines - 1, errorFrame.lineno - 1), 0);

  // Calculate the start index for pre-context lines (up to contextLineCount lines before the context line)
  const preContextStart = Math.max(0, contextLineIndex - contextLineCount);
  // Extract and snip pre-context lines
  errorFrame.pre_context = sourceLines
    .slice(preContextStart, contextLineIndex)
    .map(line => _E1.snipLine(line, 0));

  // Extract and snip the context line (the line where the error occurred)
  // Use errorFrame.colno if available, otherwise default to 0
  const contextLine = sourceLines[Math.min(totalLines - 1, contextLineIndex)];
  errorFrame.context_line = _E1.snipLine(contextLine, errorFrame.colno || 0);

  // Calculate the start and end indices for post-context lines
  const postContextStart = Math.min(contextLineIndex + 1, totalLines);
  const postContextEnd = contextLineIndex + 1 + contextLineCount;
  // Extract and snip post-context lines
  errorFrame.post_context = sourceLines
    .slice(postContextStart, postContextEnd)
    .map(line => _E1.snipLine(line, 0));
}

module.exports = addContextToErrorFrame;