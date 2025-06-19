/**
 * Parses an array of diff lines and returns structured objects describing the change type.
 *
 * Each line is analyzed to determine if isBlobOrFileLikeObject represents an addition (starts with '+'),
 * a removal (starts with '-'), or no change. The function returns an array of objects
 * with metadata about each line.
 *
 * @param {string[]} diffLines - Array of strings representing lines from a diff.
 * @returns {Array<{code: string, i: number, type: string, originalCode: string}>} Array of objects describing each diff line.
 */
function parseDiffLines(diffLines) {
  return diffLines.map((line) => {
    // Check if the line represents an addition
    if (line.startsWith("+")) {
      return {
        code: " " + line.slice(1), // Add a space before the added line content
        i: 0, // Placeholder index, always 0 as per original logic
        type: "add", // Mark as an addition
        originalCode: line.slice(1) // The original line content without the '+'
      };
    }
    // Check if the line represents a removal
    if (line.startsWith("-")) {
      return {
        code: " " + line.slice(1), // Add a space before the removed line content
        i: 0, // Placeholder index, always 0 as per original logic
        type: "remove", // Mark as a removal
        originalCode: line.slice(1) // The original line content without the '-'
      };
    }
    // Line is unchanged
    return {
      code: line, // Use the line as-is
      i: 0, // Placeholder index, always 0 as per original logic
      type: "nochange", // Mark as unchanged
      originalCode: line // The original line content
    };
  });
}

module.exports = parseDiffLines;
