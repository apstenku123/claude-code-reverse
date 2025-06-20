/**
 * Removes a common leading indentation from each line of a multi-line string, based on a reference indentation pattern.
 *
 * @param {string} referenceText - The text whose indentation is used as the reference for removal.
 * @param {string} multiLineText - The multi-line string from which to remove the common leading indentation.
 * @param {object} regexPatterns - An object containing regex patterns for matching indentation.
 * @param {RegExp} regexPatterns.other.indentCodeCompensation - Regex to match the reference indentation in referenceText.
 * @param {RegExp} regexPatterns.other.beginningSpace - Regex to match leading whitespace at the beginning of each line.
 * @returns {string} The multi-line string with the common leading indentation removed from each line, if present.
 */
function removeCommonLeadingIndentation(referenceText, multiLineText, regexPatterns) {
  // Match the reference indentation pattern in the reference text
  const referenceIndentMatch = referenceText.match(regexPatterns.other.indentCodeCompensation);
  if (referenceIndentMatch === null) {
    // If no indentation is found, return the original multi-line text
    return multiLineText;
  }
  const referenceIndent = referenceIndentMatch[1];

  // Split the multi-line text into lines, remove the reference indentation from each line if present
  const lines = multiLineText.split('\n');
  const dedentedLines = lines.map(line => {
    // Match leading whitespace in the current line
    const leadingSpaceMatch = line.match(regexPatterns.other.beginningSpace);
    if (leadingSpaceMatch === null) {
      // If no leading whitespace, return the line as is
      return line;
    }
    const [leadingWhitespace] = leadingSpaceMatch;
    // Only remove the reference indentation if the line'createInteractionAccessor leading whitespace is at least as long
    if (leadingWhitespace.length >= referenceIndent.length) {
      return line.slice(referenceIndent.length);
    }
    return line;
  });
  // Join the processed lines back into a single string
  return dedentedLines.join('\n');
}

module.exports = removeCommonLeadingIndentation;