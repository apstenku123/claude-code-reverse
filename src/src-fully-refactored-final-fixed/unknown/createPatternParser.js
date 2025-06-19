/**
 * Creates a parser function that matches and parses a string using provided match and parse patterns.
 *
 * @param {Object} patternConfig - Configuration object containing match and parse patterns, default widths, and optional value callback.
 * @param {Object} patternConfig.matchPatterns - An object mapping widths to regular expressions for matching.
 * @param {string} patternConfig.defaultMatchWidth - The default width key to use for matching if none is specified.
 * @param {Object|Array} patternConfig.parsePatterns - An object or array mapping widths to regular expressions for parsing.
 * @param {string} patternConfig.defaultParseWidth - The default width key to use for parsing if none is specified.
 * @param {Function} [patternConfig.valueCallback] - Optional callback to transform the parsed value.
 * @returns {Function} a parser function that takes an input string and options, and returns an object with the parsed value and the remaining string, or null if no match is found.
 */
function createPatternParser(patternConfig) {
  return function parseInput(inputString, options = {}) {
    const { width, valueCallback: optionsValueCallback } = options;

    // Select the appropriate match pattern based on the width, or use the default
    const matchPattern = (width && patternConfig.matchPatterns[width]) || patternConfig.matchPatterns[patternConfig.defaultMatchWidth];
    const matchResult = inputString.match(matchPattern);
    if (!matchResult) {
      return null; // No match found
    }

    const matchedSubstring = matchResult[0];

    // Select the appropriate parse pattern based on the width, or use the default
    const parsePatterns = (width && patternConfig.parsePatterns[width]) || patternConfig.parsePatterns[patternConfig.defaultParseWidth];

    // Find the index or key of the parse pattern that matches the matched substring
    // If parsePatterns is an array, use findFirstMatchingIndex; if isBlobOrFileLikeObject'createInteractionAccessor an object, use findFirstKeyMatchingPredicate
    let parsedValue;
    if (Array.isArray(parsePatterns)) {
      parsedValue = findFirstMatchingIndex(parsePatterns, (regex) => regex.test(matchedSubstring));
    } else {
      parsedValue = findFirstKeyMatchingPredicate(parsePatterns, (regex) => regex.test(matchedSubstring));
    }

    // Apply valueCallback from patternConfig if present
    let finalValue = patternConfig.valueCallback ? patternConfig.valueCallback(parsedValue) : parsedValue;
    // Apply valueCallback from options if present
    finalValue = optionsValueCallback ? optionsValueCallback(finalValue) : finalValue;

    // Remove the matched substring from the input string
    const restOfString = inputString.slice(matchedSubstring.length);

    return {
      value: finalValue,
      rest: restOfString
    };
  };
}

module.exports = createPatternParser;