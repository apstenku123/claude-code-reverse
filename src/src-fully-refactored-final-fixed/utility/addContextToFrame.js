/**
 * Adds pre-context, context, and post-context lines to a frame object based on the provided source lines and frame information.
 *
 * @param {string[]} sourceLines - The array of source code lines.
 * @param {Object} frame - The frame object containing at least a 'lineno' property (1-based line number) and optionally 'colno'.
 * @param {number} [contextLineCount=5] - The number of lines of context to include before and after the context line.
 * @returns {void} This function mutates the 'frame' object by adding 'pre_context', 'context_line', and 'post_context' properties.
 */
function addContextToFrame(sourceLines, frame, contextLineCount = 5) {
  // If the frame does not specify a line number, do nothing
  if (frame.lineno === undefined) return;

  const totalLines = sourceLines.length;
  // Calculate the zero-based index for the context line, clamped within valid range
  const contextLineIndex = Math.max(Math.min(totalLines - 1, frame.lineno - 1), 0);

  // Calculate the start index for pre-context (lines before the context line)
  const preContextStart = Math.max(0, contextLineIndex - contextLineCount);
  // Extract pre-context lines and process each with _E1.snipLine
  frame.pre_context = sourceLines
    .slice(preContextStart, contextLineIndex)
    .map(line => _E1.snipLine(line, 0));

  // Extract and process the context line (the line at the error location)
  frame.context_line = _E1.snipLine(
    sourceLines[Math.min(totalLines - 1, contextLineIndex)],
    frame.colno || 0
  );

  // Calculate the start and end indices for post-context (lines after the context line)
  const postContextStart = Math.min(contextLineIndex + 1, totalLines);
  const postContextEnd = contextLineIndex + 1 + contextLineCount;
  // Extract post-context lines and process each with _E1.snipLine
  frame.post_context = sourceLines
    .slice(postContextStart, postContextEnd)
    .map(line => _E1.snipLine(line, 0));
}

module.exports = addContextToFrame;