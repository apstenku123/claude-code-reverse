/**
 * Generates and formats unified diff hunks between two sets of lines.
 *
 * This function uses the generateUnifiedDiffHunks utility to compute the diff hunks between two sources,
 * then processes and formats the result for display or further processing. It removes deleted lines,
 * extracts the content of changed lines, and applies a post-processing function to each hunk.
 *
 * @param {string[]} originalLines - The array of lines representing the original file/content.
 * @param {string[]} modifiedLines - The array of lines representing the modified file/content.
 * @returns {string} The formatted string representing the unified diff hunks.
 */
function formatUnifiedDiffHunks(originalLines, modifiedLines) {
  // Generate diff hunks using the external utility
  const diffResult = generateUnifiedDiffHunks(
    "file.txt", // Original filename (placeholder)
    "file.txt", // Modified filename (placeholder)
    originalLines,
    modifiedLines,
    undefined,
    undefined,
    { context: 8 } // Number of context lines to include
  );

  // Map each hunk to a formatted object
  const formattedHunks = diffResult.hunks.map(hunk => ({
    startLine: hunk.oldStart,
    // Filter out deleted lines (those starting with '-') and remove diff markers
    content: hunk.lines
      .filter(line => !line.startsWith("-"))
      .map(line => line.slice(1))
      .join("\n")
  }));

  // Apply additional formatting or transformation to each hunk
  const processedHunks = formattedHunks.map(postProcessHunk);

  // Join all processed hunks with a separator
  return processedHunks.join("\n...\n");
}

// Dependency: generateUnifiedDiffHunks (aliased from 'generateUnifiedDiffHunks')
// Dependency: postProcessHunk (aliased from 'formatLinesWithLineNumbers')

module.exports = formatUnifiedDiffHunks;
