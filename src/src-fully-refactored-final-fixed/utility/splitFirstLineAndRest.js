/**
 * Splits an array of strings into two parts: the first element (or an empty string if missing),
 * and the rest joined together with line breaks. Filters out any empty values from the result.
 *
 * @param {string[]} lines - The array of strings to split and process.
 * @returns {string[]} An array containing the first line and the joined remainder, omitting any empty values.
 */
function splitFirstLineAndRest(lines) {
  // Get the first line, or an empty string if the array is empty or first element is falsy
  const firstLine = lines[0] || "";
  // Get the rest of the lines (from index 1 onward)
  const remainingLines = lines.slice(1);
  // Join the remaining lines with a newline character
  const joinedRemaining = remainingLines.join("\n");
  // Return an array with the first line and the joined remainder, filtering out any empty values
  return [firstLine, joinedRemaining].filter(Boolean);
}

module.exports = splitFirstLineAndRest;