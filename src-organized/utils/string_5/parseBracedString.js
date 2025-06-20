/**
 * Parses a string and extracts content within braces if present, otherwise returns the original string in an array.
 *
 * @param {string} inputString - The string to be parsed for brace-enclosed content.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.nobrace=false] - If true, disables brace parsing and returns the original string in an array.
 * @returns {Array<string>} An array containing either the original string or the parsed content from within braces.
 */
function parseBracedString(inputString, options = {}) {
  // Validate or preprocess the input string using the validatePatternString function
  validatePatternString(inputString);

  // If 'nobrace' option is set or the string does not contain a single-level brace pattern, return the string in an array
  const hasSingleLevelBraces = /\{(?:(?!\{).)*\}/.test(inputString);
  if (options.nobrace || !hasSingleLevelBraces) {
    return [inputString];
  }

  // Otherwise, delegate to tKA.default to parse the braced content
  return tKA.default(inputString);
}

module.exports = parseBracedString;