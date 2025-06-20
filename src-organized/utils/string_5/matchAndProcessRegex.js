/**
 * Attempts to match a regular expression against a target string starting from a specific index,
 * processes the match if found, and updates the global index accordingly.
 *
 * @param {RegExp} regex - The regular expression to execute.
 * @returns {boolean} Returns true if a match is found and processed; otherwise, false.
 */
function matchAndProcessRegex(regex) {
  // Set the starting index for the regex search
  regex.lastIndex = globalMatchIndex - 1;

  // Attempt to execute the regex against the target string
  const matchResult = regex.exec(targetString);

  // If no match is found, return false
  if (!matchResult || !matchResult[0]) {
    return false;
  }

  // Process the matched substring
  processMatch(matchResult[0]);

  // Update the global index to point after the matched substring
  globalMatchIndex += matchResult[0].length - 1;

  return true;
}

module.exports = matchAndProcessRegex;