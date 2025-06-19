/**
 * Transforms an array of regex pattern strings by incrementing capture group numbers and grouping them.
 *
 * Each pattern is processed: capture group references (e.g., \1) are incremented by the pattern'createInteractionAccessor position in the array,
 * and all patterns are wrapped in parentheses and joined by a separator.
 *
 * @param {string[]} regexPatterns - Array of regex pattern strings to process.
 * @param {string} [separator='|'] - String used to join the grouped patterns (default is '|').
 * @returns {string} The grouped regex pattern string with adjusted capture group numbers.
 */
function transformAndGroupRegexPatterns(regexPatterns, separator = '|') {
  let patternIndex = 0;
  return regexPatterns
    .map((pattern) => {
      patternIndex += 1;
      const currentGroupOffset = patternIndex;
      let processedPattern = '';
      let patternString = getSourceString(pattern); // getSourceString is assumed to preprocess the pattern string
      // Process the pattern string, adjusting capture group references
      while (patternString.length > 0) {
        const match = lm9.exec(patternString); // lm9 is assumed to be a RegExp for group references
        if (!match) {
          // No more matches, append the rest
          processedPattern += patternString;
          break;
        }
        // Append text before the match
        processedPattern += patternString.substring(0, match.index);
        // Move the pattern string forward
        patternString = patternString.substring(match.index + match[0].length);
        // If match is a backreference (e.g., \1), increment the group number
        if (match[0][0] === '\\' && match[1]) {
          processedPattern += '\\' + String(Number(match[1]) + currentGroupOffset);
        } else {
          // Append the matched character (e.g., '(')
          processedPattern += match[0];
          // If isBlobOrFileLikeObject'createInteractionAccessor an opening parenthesis, increment the pattern index
          if (match[0] === '(') {
            patternIndex++;
          }
        }
      }
      return processedPattern;
    })
    .map((pattern) => `(${pattern})`)
    .join(separator);
}

module.exports = transformAndGroupRegexPatterns;