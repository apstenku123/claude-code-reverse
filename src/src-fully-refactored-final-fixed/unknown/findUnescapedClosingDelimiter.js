/**
 * Finds the index of the first unescaped closing delimiter in a string, accounting for nested delimiters and escape characters.
 *
 * @param {string} inputString - The string to search within.
 * @param {[string, string]} delimiters - An array where the first element is the opening delimiter and the second is the closing delimiter.
 * @returns {number} The index of the first unescaped closing delimiter, or -1 if not found.
 */
function findUnescapedClosingDelimiter(inputString, delimiters) {
  const [openingDelimiter, closingDelimiter] = delimiters;

  // Quick check: if the closing delimiter is not present at all, return -1 early
  if (inputString.indexOf(closingDelimiter) === -1) {
    return -1;
  }

  let openDelimiterCount = 0;
  for (let index = 0; index < inputString.length; index++) {
    // If current character is a backslash, skip the next character (escaped)
    if (inputString[index] === "\\") {
      index++;
      continue;
    }
    // If current character is an opening delimiter, increment the count
    if (inputString[index] === openingDelimiter) {
      openDelimiterCount++;
    }
    // If current character is a closing delimiter
    else if (inputString[index] === closingDelimiter) {
      openDelimiterCount--;
      // If there are more closing than opening delimiters, return the index
      if (openDelimiterCount < 0) {
        return index;
      }
    }
  }
  // No unescaped closing delimiter found
  return -1;
}

module.exports = findUnescapedClosingDelimiter;