/**
 * Creates a pattern matcher function based on provided match and parse patterns.
 *
 * @param {Object} patternConfig - Configuration object containing match/parse patterns and callbacks.
 * @param {Object} patternConfig.matchPatterns - An object mapping widths to regex patterns for matching.
 * @param {string} patternConfig.defaultMatchWidth - The default width key for matching if none is specified.
 * @param {Object|Array} patternConfig.parsePatterns - An object or array mapping widths to regex patterns for parsing.
 * @param {string} patternConfig.defaultParseWidth - The default width key for parsing if none is specified.
 * @param {Function} [patternConfig.valueCallback] - Optional callback to transform the parsed value.
 * @returns {Function} a matcher function that takes an input string and options, returning the parsed value and the rest of the string.
 */
function createPatternMatcher(patternConfig) {
  return function matchInput(inputString, options = {}) {
    const { width, valueCallback: optionsValueCallback } = options;

    // Select the appropriate match pattern based on width or use default
    const matchPattern = (width && patternConfig.matchPatterns[width]) || patternConfig.matchPatterns[patternConfig.defaultMatchWidth];
    const matchResult = inputString.match(matchPattern);
    if (!matchResult) return null;

    const matchedText = matchResult[0];

    // Select the appropriate parse pattern based on width or use default
    const parsePatterns = (width && patternConfig.parsePatterns[width]) || patternConfig.parsePatterns[patternConfig.defaultParseWidth];

    // Find the index or key of the parse pattern that matches the matched text
    let parsedValue;
    if (Array.isArray(parsePatterns)) {
      // findFirstMatchingIndex: Find index in array where test returns true
      parsedValue = findFirstMatchingIndex(parsePatterns, (regex) => regex.test(matchedText));
    } else {
      // findFirstKeyMatchingPredicate: Find key in object where test returns true
      parsedValue = findFirstKeyMatchingPredicate(parsePatterns, (regex) => regex.test(matchedText));
    }

    // Apply valueCallback from patternConfig if present
    let finalValue = patternConfig.valueCallback ? patternConfig.valueCallback(parsedValue) : parsedValue;
    // Apply valueCallback from options if present
    finalValue = optionsValueCallback ? optionsValueCallback(finalValue) : finalValue;

    // Remove the matched part from the input string
    const restOfString = inputString.slice(matchedText.length);

    return {
      value: finalValue,
      rest: restOfString
    };
  };
}

module.exports = createPatternMatcher;