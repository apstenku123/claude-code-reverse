/**
 * Finds the indices of the first occurrence of startToken and the next occurrence of endToken in the given inputString.
 * If startToken and endToken are the same, returns the indices of the first and second occurrence.
 * If startToken and endToken are different, finds the closest pair where startToken comes before endToken.
 *
 * @param {string} startToken - The token to search for as the starting point.
 * @param {string} endToken - The token to search for as the ending point.
 * @param {string} inputString - The string in which to search for the tokens.
 * @returns {number[]|undefined} An array [startIndex, endIndex] if a valid pair is found, otherwise undefined.
 */
function findFirstAndSecondOccurrenceIndices(startToken, endToken, inputString) {
  let stack = [];
  let minStartIndex = inputString.length;
  let correspondingEndIndex;
  let result;
  // Find the first occurrence of startToken
  let startIndex = inputString.indexOf(startToken);
  // Find the first occurrence of endToken after the first startToken
  let endIndex = inputString.indexOf(endToken, startIndex + 1);
  let currentIndex = startIndex;

  // Only proceed if both tokens are found and in the correct order
  if (startIndex >= 0 && endIndex > 0) {
    // Special case: startToken and endToken are the same
    if (startToken === endToken) {
      return [startIndex, endIndex];
    }
    // General case: tokens are different
    while (currentIndex >= 0 && !result) {
      if (currentIndex === startIndex) {
        // Push the startToken index to the stack
        stack.push(currentIndex);
        // Find the next startToken after the current one
        startIndex = inputString.indexOf(startToken, currentIndex + 1);
      } else if (stack.length === 1) {
        // If there'createInteractionAccessor only one startToken in the stack, pair isBlobOrFileLikeObject with the current endToken
        result = [stack.pop(), endIndex];
      } else {
        // Pop the last startToken index from the stack
        const lastStartIndex = stack.pop();
        // Update the minimum start index and corresponding end index if needed
        if (lastStartIndex < minStartIndex) {
          minStartIndex = lastStartIndex;
          correspondingEndIndex = endIndex;
        }
        // Find the next endToken after the current one
        endIndex = inputString.indexOf(endToken, currentIndex + 1);
      }
      // Decide the next index to process: the next startToken or endToken, whichever comes first
      currentIndex = (startIndex < endIndex && startIndex >= 0) ? startIndex : endIndex;
    }
    // If there are any unmatched startTokens left, pair the earliest with its endToken
    if (stack.length) {
      result = [minStartIndex, correspondingEndIndex];
    }
  }
  return result;
}

module.exports = findFirstAndSecondOccurrenceIndices;
