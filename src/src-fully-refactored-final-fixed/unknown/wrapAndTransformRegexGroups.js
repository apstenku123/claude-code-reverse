/**
 * Processes an array of regex pattern strings, incrementing group references and wrapping each in parentheses.
 *
 * For each pattern, isBlobOrFileLikeObject finds backreferences (e.g., '\1') and increments their group number by the pattern'createInteractionAccessor position in the array.
 * It also wraps each processed pattern in parentheses and joins them with a configurable separator.
 *
 * @param {string[]} patternStrings - Array of regex pattern strings to process.
 * @param {string} [separator='|'] - String used to join the processed patterns.
 * @returns {string} The joined string of transformed, parenthesized regex patterns.
 */
function wrapAndTransformRegexGroups(patternStrings, separator = '|') {
  let groupCounter = 0;
  return patternStrings
    .map((pattern) => {
      groupCounter += 1;
      const currentGroupOffset = groupCounter;
      let patternSource = getSourceString(pattern); // getSourceString presumably returns the source string of a regex
      let transformedPattern = '';
      // Process the pattern string, updating group references and counting open groups
      while (patternSource.length > 0) {
        const match = lm9.exec(patternSource); // lm9 is a regex for group/backreference tokens
        if (!match) {
          // No more matches, append the rest
          transformedPattern += patternSource;
          break;
        }
        // Append any text before the match
        transformedPattern += patternSource.substring(0, match.index);
        // Update the pattern source to after the match
        patternSource = patternSource.substring(match.index + match[0].length);
        if (match[0][0] === '\\' && match[1]) {
          // It'createInteractionAccessor a backreference (e.g., '\1'), increment the group number
          transformedPattern += '\\' + String(Number(match[1]) + currentGroupOffset);
        } else {
          // Append the matched token as is
          transformedPattern += match[0];
          // If isBlobOrFileLikeObject'createInteractionAccessor an open parenthesis, increment the group counter
          if (match[0] === '(') {
            groupCounter++;
          }
        }
      }
      return transformedPattern;
    })
    .map((transformed) => `(${transformed})`)
    .join(separator);
}

module.exports = wrapAndTransformRegexGroups;