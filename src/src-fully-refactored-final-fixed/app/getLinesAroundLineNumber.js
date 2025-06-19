/**
 * Returns an array of line objects containing the line number and content for a given line and its surrounding lines from the source code.
 *
 * @param {string} sourceCode - The source code as a string.
 * @param {number} lineNumber - The target line number (1-based).
 * @param {Object} [options={}] - Optional settings.
 * @param {number} [options.around=3] - Number of lines to include before and after the target line.
 * @returns {Array<{line: number, value: string}>|undefined} Array of objects with line number and line content, or undefined if lineNumber is out of range.
 * @throws {TypeError} If sourceCode is not a string or lineNumber is invalid.
 */
function getLinesAroundLineNumber(sourceCode, lineNumber, options = {}) {
  // Validate that sourceCode is a string
  if (typeof sourceCode !== "string") {
    throw new TypeError("Source code is missing.");
  }

  // Validate that lineNumber is a positive integer
  if (!lineNumber || lineNumber < 1) {
    throw new TypeError("Line number must start from `1`.");
  }

  // Split the source code into an array of lines
  const lines = eI0(sourceCode).split(/\r?\n/);

  // If the requested lineNumber is out of range, return undefined
  if (lineNumber > lines.length) {
    return;
  }

  // Determine how many lines to include around the target line
  const linesAround = options.around !== null && options.around !== undefined ? options.around : 3;

  // Generate an array of line numbers centered at lineNumber
  const lineNumbers = createRangeArray(lineNumber, linesAround);

  // Filter out line numbers that are out of bounds, and map to objects with line and value
  return lineNumbers
    .filter(currentLineNumber => lines[currentLineNumber - 1] !== undefined)
    .map(currentLineNumber => ({
      line: currentLineNumber,
      value: lines[currentLineNumber - 1]
    }));
}

module.exports = getLinesAroundLineNumber;