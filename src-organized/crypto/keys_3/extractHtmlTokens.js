/**
 * Extracts HTML-like tokens from a string starting at a given index.
 *
 * This function uses a regular expression to tokenize an input string (such as an HTML fragment),
 * starting from a specified index. It returns an array of match objects, stopping early if a match
 * contains a capturing group (i.e., if deepCloneWithCycleDetection[1] is truthy).
 *
 * @param {string} inputString - The string to tokenize (e.g., HTML source).
 * @param {number} startIndex - The index in the string to start tokenization from.
 * @returns {Array<RegExpExecArray>|undefined} Array of match objects, or undefined if no match with a capturing group is found.
 */
function extractHtmlTokens(inputString, startIndex) {
  // Array to store the matched tokens
  const tokens = [];
  // Regular expression to match quoted strings, attribute assignments, and HTML tag delimiters
  const htmlTokenRegex = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/\?\s*>|<)/g;
  // Set the regex to start matching from the specified index
  htmlTokenRegex.lastIndex = startIndex;
  // Perform an initial exec to advance the regex state (as in the original code)
  htmlTokenRegex.exec(inputString);

  let match;
  // Iterate over matches in the input string
  while ((match = htmlTokenRegex.exec(inputString))) {
    tokens.push(match);
    // If the match contains a capturing group (i.e., match[1] is truthy), return the tokens array early
    if (match[1]) {
      return tokens;
    }
  }
}

module.exports = extractHtmlTokens;