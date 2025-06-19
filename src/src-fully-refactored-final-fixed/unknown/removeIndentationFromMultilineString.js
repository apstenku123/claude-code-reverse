/**
 * Removes a specific indentation from each line of a multiline string, based on a match in a reference string.
 *
 * @param {string} referenceString - The string to match against for determining the indentation to remove.
 * @param {string} multilineString - The multiline string from which to remove indentation.
 * @param {object} regexPatterns - An object containing regex patterns for matching indentation.
 * @param {RegExp} regexPatterns.other.indentCodeCompensation - Regex to match the indentation to remove.
 * @param {RegExp} regexPatterns.other.beginningSpace - Regex to match leading whitespace on each line.
 * @returns {string} The multiline string with the matched indentation removed from each line where applicable.
 */
function removeIndentationFromMultilineString(referenceString, multilineString, regexPatterns) {
  // Match the indentation pattern in the reference string
  const indentMatch = referenceString.match(regexPatterns.other.indentCodeCompensation);
  if (indentMatch === null) {
    // If no indentation is found, return the original multiline string
    return multilineString;
  }

  const indentToRemove = indentMatch[1];

  // Process each line: remove the matched indentation if present
  const lines = multilineString.split('\n');
  const processedLines = lines.map(line => {
    const leadingSpaceMatch = line.match(regexPatterns.other.beginningSpace);
    if (leadingSpaceMatch === null) {
      // No leading whitespace, return line as is
      return line;
    }
    const [leadingWhitespace] = leadingSpaceMatch;
    // Only remove indentation if the line has at least as much as indentToRemove
    if (leadingWhitespace.length >= indentToRemove.length) {
      return line.slice(indentToRemove.length);
    }
    return line;
  });

  return processedLines.join('\n');
}

module.exports = removeIndentationFromMultilineString;