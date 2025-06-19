/**
 * Extracts content within curly braces from a string, or returns the original string in an array if no braces are found or if the 'nobrace' option is set.
 *
 * @param {string} inputString - The string to process for braced content.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.nobrace] - If true, disables brace extraction and always returns the original string in an array.
 * @returns {Array<string>} An array containing either the original string or the extracted content.
 */
function extractBracedContentOrReturnOriginal(inputString, options = {}) {
  // Validate or preprocess the input string (implementation of validatePatternString is external)
  validatePatternString(inputString);

  // If 'nobrace' option is set or input does not contain a single-level curly brace, return the original string in an array
  const hasSingleLevelBraces = /\{(?:(?!\{).)*\}/.test(inputString);
  if (options.nobrace || !hasSingleLevelBraces) {
    return [inputString];
  }

  // Otherwise, delegate to tKA.default to extract braced content
  return tKA.default(inputString);
}

module.exports = extractBracedContentOrReturnOriginal;