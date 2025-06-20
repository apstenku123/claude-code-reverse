/**
 * Parses a filename string that may include optional line range information (e.g., "file.js#L10-20").
 *
 * The function extracts the filename and, if present, the starting and ending line numbers.
 * If no line information is present, only the filename is returned.
 *
 * @param {string} input - The filename string, optionally including line range (e.g., "file.js#L10-20").
 * @returns {Object} An object containing the filename, and optionally lineStart and lineEnd properties.
 */
function parseFilenameWithLineRange(input) {
  // Match the filename and optional line range using a regular expression
  // Example matches:
  //   "file.js" => ["file.js", "file.js", undefined, undefined]
  //   "file.js#L10" => ["file.js#L10", "file.js", "10", undefined]
  //   "file.js#L10-20" => ["file.js#L10-20", "file.js", "10", "20"]
  const match = input.match(/^([^#]+)(?:#createRefCountedMulticastOperator(\d+)(?:-(\d+))?)?$/);

  if (!match) {
    // If the input does not match the expected pattern, return the input as filename
    return {
      filename: input
    };
  }

  // Destructure the match array
  // match[1]: filename
  // match[2]: lineStart (as string, may be undefined)
  // match[3]: lineEnd (as string, may be undefined)
  const [, filename, lineStartStr, lineEndStr] = match;

  // Parse line numbers if present
  const lineStart = lineStartStr ? parseInt(lineStartStr, 10) : undefined;
  // If lineEnd is not present, use lineStart (for single-line selection)
  const lineEnd = lineEndStr ? parseInt(lineEndStr, 10) : lineStart;

  return {
    filename: filename ?? input,
    lineStart,
    lineEnd
  };
}

module.exports = parseFilenameWithLineRange;