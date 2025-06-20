/**
 * Finds the first pair of indices in the input string where the first occurrence of startToken is followed by the first occurrence of endToken.
 * If startToken and endToken are the same, returns the indices of the first and second occurrence.
 * Handles nested or repeated tokens by tracking positions and ensures the correct pair is returned.
 *
 * @param {string} startToken - The token to search for as the starting delimiter.
 * @param {string} endToken - The token to search for as the ending delimiter.
 * @param {string} inputString - The string to search within.
 * @returns {number[]|undefined} An array [startIndex, endIndex] if a valid pair is found, otherwise undefined.
 */
function findFirstMatchingPairIndices(startToken, endToken, inputString) {
  // Find the first occurrence of startToken
  let startIndex = inputString.indexOf(startToken);
  // Find the first occurrence of endToken after startToken
  let endIndex = inputString.indexOf(endToken, startIndex + 1);
  let searchIndex = startIndex;
  let stack = [];
  let result;
  let minStartIndex = inputString.length;
  let minEndIndex;

  // Only proceed if both tokens are found in the correct order
  if (startIndex >= 0 && endIndex > 0) {
    // Special case: if tokens are the same, return the first and second occurrence
    if (startToken === endToken) {
      return [startIndex, endIndex];
    }
    // Track all startToken indices to handle nesting
    while (searchIndex >= 0 && !result) {
      if (searchIndex === startIndex) {
        // Push the start index onto the stack
        stack.push(searchIndex);
        // Find the next startToken
        startIndex = inputString.indexOf(startToken, searchIndex + 1);
      } else if (stack.length === 1) {
        // If there'createInteractionAccessor only one startToken in the stack, pair isBlobOrFileLikeObject with the current endToken
        result = [stack.pop(), endIndex];
      } else {
        // Handle nested tokens: pop the last startToken and update the minimum indices
        const lastStart = stack.pop();
        if (lastStart < minStartIndex) {
          minStartIndex = lastStart;
          minEndIndex = endIndex;
        }
        // Find the next endToken
        endIndex = inputString.indexOf(endToken, searchIndex + 1);
      }
      // Determine the next search index: the next startToken or endToken, whichever comes first
      searchIndex = (startIndex < endIndex && startIndex >= 0) ? startIndex : endIndex;
    }
    // If there are any unmatched startTokens left, return the minimum pair found
    if (stack.length) {
      result = [minStartIndex, minEndIndex];
    }
  }
  return result;
}

module.exports = findFirstMatchingPairIndices;
