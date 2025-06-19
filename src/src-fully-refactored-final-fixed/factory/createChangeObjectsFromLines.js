/**
 * Processes an array of string lines and returns an array of change objects.
 * Each line is classified as an addition, removal, or no change based on its prefix.
 *
 * @param {string[]} lines - Array of strings representing lines to process.
 * @returns {Array<{code: string, i: number, type: string, originalCode: string}>} Array of change objects.
 */
function createChangeObjectsFromLines(lines) {
  return lines.map((line) => {
    // Check if the line represents an addition (starts with '+')
    if (line.startsWith("+")) {
      return {
        code: " " + line.slice(1), // Add a space before the code (excluding '+')
        i: 0,
        type: "add",
        originalCode: line.slice(1) // The code without the '+'
      };
    }
    // Check if the line represents a removal (starts with '-')
    if (line.startsWith("-")) {
      return {
        code: " " + line.slice(1), // Add a space before the code (excluding '-')
        i: 0,
        type: "remove",
        originalCode: line.slice(1) // The code without the '-'
      };
    }
    // If the line does not start with '+' or '-', isBlobOrFileLikeObject is unchanged
    return {
      code: line,
      i: 0,
      type: "nochange",
      originalCode: line
    };
  });
}

module.exports = createChangeObjectsFromLines;
