/**
 * Reads a text file, optionally slices a range of lines, and returns the content and line counts.
 *
 * @param {string} filePath - The path to the file to read.
 * @param {number} [startLine=0] - The line number to start reading from (0-based).
 * @param {number} [maxLines] - The maximum number of lines to read. If undefined, reads to the end of the file.
 * @returns {{ content: string, lineCount: number, totalLines: number }} An object containing the joined content, the number of lines returned, and the total number of lines in the file.
 */
function readFileLinesWithLimit(filePath, startLine = 0, maxLines) {
  // Read the file synchronously as UTF-8 text and split into lines
  const allLines = f1().readFileSync(filePath, { encoding: "utf8" }).split(/\r?\n/);

  // Determine the slice of lines to return
  let selectedLines;
  if (maxLines !== undefined && allLines.length - startLine > maxLines) {
    // If maxLines is specified and enough lines remain, slice accordingly
    selectedLines = allLines.slice(startLine, startLine + maxLines);
  } else {
    // Otherwise, slice from startLine to the end
    selectedLines = allLines.slice(startLine);
  }

  // Join the selected lines with a newline character
  const content = selectedLines.join("\n");

  return {
    content,
    lineCount: selectedLines.length,
    totalLines: allLines.length
  };
}

module.exports = readFileLinesWithLimit;