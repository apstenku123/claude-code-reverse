/**
 * Adds source code context (pre-context, context line, and post-context) to a frame object.
 *
 * Given an array of source lines and a frame object containing a line number,
 * this function attaches the lines of code surrounding the error line to the frame.
 *
 * @param {string[]} sourceLines - The array of source code lines.
 * @param {Object} frame - The frame object to which context will be added. Must have a `lineno` property.
 * @param {number} [contextLineCount=5] - The number of lines of context to include before and after the context line.
 * @returns {void}
 */
function addSourceContextToFrame(sourceLines, frame, contextLineCount = 5) {
  // If the frame does not have a line number, do nothing
  if (frame.lineno === undefined) return;

  const totalLines = sourceLines.length;
  // Calculate the zero-based index of the context line, clamped to valid range
  const contextLineIndex = Math.max(Math.min(totalLines - 1, frame.lineno - 1), 0);

  // Extract pre-context lines (lines before the context line)
  const preContextStart = Math.max(0, contextLineIndex - contextLineCount);
  const preContextEnd = contextLineIndex;
  frame.pre_context = sourceLines
    .slice(preContextStart, preContextEnd)
    .map(line => _E1.snipLine(line, 0));

  // Extract the context line itself
  const contextLineNumber = Math.min(totalLines - 1, contextLineIndex);
  frame.context_line = _E1.snipLine(
    sourceLines[contextLineNumber],
    frame.colno || 0
  );

  // Extract post-context lines (lines after the context line)
  const postContextStart = Math.min(contextLineIndex + 1, totalLines);
  const postContextEnd = contextLineIndex + 1 + contextLineCount;
  frame.post_context = sourceLines
    .slice(postContextStart, postContextEnd)
    .map(line => _E1.snipLine(line, 0));
}

module.exports = addSourceContextToFrame;