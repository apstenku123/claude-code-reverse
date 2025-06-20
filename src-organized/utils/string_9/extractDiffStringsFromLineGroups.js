/**
 * Processes an array of diff line groups and extracts the old and new string representations for each group.
 * Each group contains a 'lines' array, where each line may start with a space (unchanged),
 * a '-' (removed), or a '+' (added). The function reconstructs the old and new versions of the text.
 *
 * @param {Array<{lines: string[]}>} diffGroups - Array of objects, each with a 'lines' property (array of diff lines)
 * @returns {Array<{old_string: string, new_string: string}>} Array of objects with 'old_string' and 'new_string' for each group
 */
function extractDiffStringsFromLineGroups(diffGroups) {
  return diffGroups.map(diffGroup => {
    // Arrays to accumulate lines for old and new versions
    const unchangedLines = [];
    const oldVersionLines = [];
    const newVersionLines = [];

    for (const line of diffGroup.lines) {
      if (line.startsWith(" ")) {
        // Unchanged line: present in both old and new
        const content = line.slice(1);
        unchangedLines.push(content);
        oldVersionLines.push(content);
        newVersionLines.push(content);
      } else if (line.startsWith("-")) {
        // Removed line: present only in old version
        oldVersionLines.push(line.slice(1));
      } else if (line.startsWith("+")) {
        // Added line: present only in new version
        newVersionLines.push(line.slice(1));
      }
      // Other prefixes are ignored (if any)
    }

    return {
      old_string: oldVersionLines.join("\n"),
      new_string: newVersionLines.join("\n")
    };
  });
}

module.exports = extractDiffStringsFromLineGroups;