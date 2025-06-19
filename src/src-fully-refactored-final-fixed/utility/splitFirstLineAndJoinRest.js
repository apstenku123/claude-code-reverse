/**
 * Splits an array of strings into two parts: the first element, and the rest joined by a newline. 
 * Filters out any empty or falsy values from the result.
 *
 * @param {string[]} lines - An array of strings to process.
 * @returns {string[]} An array containing the first string (if any) and the joined remainder (if any), omitting empty values.
 */
function splitFirstLineAndJoinRest(lines) {
  // Get the first line or an empty string if the array is empty
  const firstLine = lines[0] || "";
  // Get the remaining lines (if any)
  const remainingLines = lines.slice(1);
  // Join the remaining lines with a newline character
  const joinedRemainingLines = remainingLines.join("\n");
  // Return an array with the first line and the joined remainder, filtering out any empty values
  return [firstLine, joinedRemainingLines].filter(Boolean);
}

module.exports = splitFirstLineAndJoinRest;