/**
 * Processes an array of input strings, applies regex-based transformations to each,
 * wraps each result in parentheses, and joins them with a specified delimiter.
 *
 * For each input string, isBlobOrFileLikeObject increments a group counter and uses a regex (lm9)
 * to find and process backreferences (e.g., '\1') and parentheses. Backreferences
 * are renumbered based on their group position. The getSourceString function is used to preprocess
 * each input string.
 *
 * @param {string[]} inputPatterns - Array of input pattern strings to process.
 * @param {string} [delimiter='|'] - String used to join the processed patterns.
 * @returns {string} The joined string of processed, parenthesized patterns.
 */
function formatAndGroupPatterns(inputPatterns, delimiter = "|") {
  let groupCounter = 0;
  return inputPatterns
    .map((pattern) => {
      groupCounter += 1;
      const currentGroup = groupCounter;
      let processedPattern = "";
      let remainingPattern = getSourceString(pattern); // Preprocess pattern with getSourceString
      // Process the pattern using regex lm9
      while (remainingPattern.length > 0) {
        const match = lm9.exec(remainingPattern);
        if (!match) {
          // No more matches, append the rest
          processedPattern += remainingPattern;
          break;
        }
        // Append text before the match
        processedPattern += remainingPattern.substring(0, match.index);
        // Update remainingPattern to after the match
        remainingPattern = remainingPattern.substring(match.index + match[0].length);
        // If match is a backreference (e.g., '\1')
        if (match[0][0] === "\\" && match[1]) {
          // Renumber the backreference based on current group
          processedPattern += "\\" + String(Number(match[1]) + currentGroup);
        } else {
          // Otherwise, append the matched text
          processedPattern += match[0];
          // If the match is an opening parenthesis, increment groupCounter
          if (match[0] === "(") {
            groupCounter++;
          }
        }
      }
      return processedPattern;
    })
    // Wrap each processed pattern in parentheses
    .map((pattern) => `(${pattern})`)
    // Join all patterns with the specified delimiter
    .join(delimiter);
}

module.exports = formatAndGroupPatterns;