/**
 * Finds the first pair of indices in a string where the first occurrence of startToken is followed by the first occurrence of endToken.
 * If startToken and endToken are the same, returns the indices of the first two occurrences.
 * Handles nested tokens by tracking open and close positions.
 *
 * @param {string} startToken - The token to search for as the opening marker.
 * @param {string} endToken - The token to search for as the closing marker.
 * @param {string} inputString - The string to search within.
 * @returns {number[]|undefined} An array [startIndex, endIndex] if a valid pair is found, otherwise undefined.
 */
function findFirstPairOfIndices(startToken, endToken, inputString) {
  let openIndicesStack = [];
  let minOpenIndex = inputString.length;
  let correspondingEndIndex;
  let result;

  // Find the first occurrence of startToken
  let startIndex = inputString.indexOf(startToken);
  // Find the first occurrence of endToken after the first startToken
  let endIndex = inputString.indexOf(endToken, startIndex + 1);
  // Current search position
  let currentIndex = startIndex;

  // Only proceed if both tokens are found and in the correct order
  if (startIndex >= 0 && endIndex > 0) {
    // Special case: startToken and endToken are the same
    if (startToken === endToken) {
      return [startIndex, endIndex];
    }
    // Track open token indices and search for pairs
    while (currentIndex >= 0 && !result) {
      if (currentIndex === startIndex) {
        // Found a startToken, push its index and look for the next startToken
        openIndicesStack.push(currentIndex);
        startIndex = inputString.indexOf(startToken, currentIndex + 1);
      } else if (openIndicesStack.length === 1) {
        // Found a matching endToken for a single open startToken
        result = [openIndicesStack.pop(), endIndex];
      } else {
        // Handle nested tokens: pop the last open, update minOpenIndex if needed
        const lastOpenIndex = openIndicesStack.pop();
        if (lastOpenIndex < minOpenIndex) {
          minOpenIndex = lastOpenIndex;
          correspondingEndIndex = endIndex;
        }
        // Look for the next endToken
        endIndex = inputString.indexOf(endToken, currentIndex + 1);
      }
      // Decide next search position: next startToken or next endToken
      currentIndex = (startIndex < endIndex && startIndex >= 0) ? startIndex : endIndex;
    }
    // If there are still open tokens, return the earliest open and its corresponding end
    if (openIndicesStack.length) {
      result = [minOpenIndex, correspondingEndIndex];
    }
  }
  return result;
}

module.exports = findFirstPairOfIndices;