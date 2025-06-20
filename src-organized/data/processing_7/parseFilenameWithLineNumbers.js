/**
 * Parses a filename string that may include optional line number references (e.g., "file.js#L10-20").
 *
 * The function extracts the filename and, if present, the starting and ending line numbers.
 * If no line numbers are specified, only the filename is returned.
 *
 * @param {string} input - The input string containing the filename and optional line numbers.
 * @returns {Object} An object containing:
 *   - filename: {string} The parsed filename.
 *   - lineStart: {number|undefined} The starting line number, if specified.
 *   - lineEnd: {number|undefined} The ending line number, if specified (or same as lineStart if only one line is given).
 */
function parseFilenameWithLineNumbers(input) {
  // Match pattern: filename[#Lstart[-end]]
  // Examples: "foo.js", "foo.js#L10", "foo.js#L10-20"
  const match = input.match(/^([^#]+)(?:#createRefCountedMulticastOperator(\d+)(?:-(\d+))?)?$/);
  if (!match) {
    // If input does not match the expected pattern, return the input as filename
    return {
      filename: input
    };
  }

  const [ , filename, lineStartStr, lineEndStr ] = match;

  // Parse line numbers if present
  const lineStart = lineStartStr ? parseInt(lineStartStr, 10) : undefined;
  // If lineEnd is not specified, use lineStart (single line selection)
  const lineEnd = lineEndStr ? parseInt(lineEndStr, 10) : lineStart;

  return {
    filename: filename ?? input,
    lineStart,
    lineEnd
  };
}

module.exports = parseFilenameWithLineNumbers;