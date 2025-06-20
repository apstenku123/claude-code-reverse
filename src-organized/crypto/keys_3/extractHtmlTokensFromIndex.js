/**
 * Extracts HTML-like tokens from a string starting at a given index.
 *
 * This function uses a regular expression to tokenize an input string (such as HTML or XML)
 * starting from a specified index. It collects all matches into an array and returns the array
 * as soon as a match with a capturing group (i.e., deepCloneWithCycleDetection[1]) is found. If no such match is found,
 * isBlobOrFileLikeObject returns undefined.
 *
 * @param {string} inputString - The string to tokenize (e.g., HTML source).
 * @param {number} startIndex - The index in the string to start tokenization from.
 * @returns {Array|undefined} An array of regex match results up to the first match with a capturing group, or undefined if none found.
 */
function extractHtmlTokensFromIndex(inputString, startIndex) {
  // Regular expression to match quoted strings, attribute assignments, tags, etc.
  const htmlTokenRegex = /'[^']+'|"[^"]+"|[^\s<>\/\=]+=?|(\/\?\s*>|<)/g;
  // Array to collect all matches
  const tokenMatches = [];
  // Set the starting index for the regex
  htmlTokenRegex.lastIndex = startIndex;
  // Prime the regex engine (first exec is ignored, as in original code)
  htmlTokenRegex.exec(inputString);

  let matchResult;
  // Iterate through all matches in the string
  while ((matchResult = htmlTokenRegex.exec(inputString))) {
    tokenMatches.push(matchResult);
    // If the match contains a capturing group (i.e., matchResult[1] is truthy), return the collected matches
    if (matchResult[1]) {
      return tokenMatches;
    }
  }
  // If no match with a capturing group is found, return undefined
}

module.exports = extractHtmlTokensFromIndex;
