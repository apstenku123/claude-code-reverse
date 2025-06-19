/**
 * Transforms an array of line strings into an array of change objects, indicating whether each line was added, removed, or unchanged.
 *
 * @param {string[]} lines - An array of strings representing lines, each possibly prefixed with '+' (added), '-' (removed), or no prefix (unchanged).
 * @returns {Array<Object>} An array of objects describing the change type, code, and original code for each line.
 */
function createLineChangeObjects(lines) {
  return lines.map((line) => {
    // Check if the line represents an addition
    if (line.startsWith("+")) {
      return {
        code: " " + line.slice(1), // Add a space before the actual code (without '+')
        i: 0, // Preserved from original; purpose unclear without further context
        type: "add",
        originalCode: line.slice(1)
      };
    }
    // Check if the line represents a removal
    if (line.startsWith("-")) {
      return {
        code: " " + line.slice(1), // Add a space before the actual code (without '-')
        i: 0, // Preserved from original; purpose unclear without further context
        type: "remove",
        originalCode: line.slice(1)
      };
    }
    // If no prefix, the line is unchanged
    return {
      code: line,
      i: 0, // Preserved from original; purpose unclear without further context
      type: "nochange",
      originalCode: line
    };
  });
}

module.exports = createLineChangeObjects;
