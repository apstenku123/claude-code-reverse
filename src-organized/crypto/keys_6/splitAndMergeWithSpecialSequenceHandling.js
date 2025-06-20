/**
 * Splits and merges elements from the input array into the result array based on a maximum chunk size,
 * with special handling for specific sequences and tokens.
 *
 * @param {string[]} resultArray - The array to accumulate merged string chunks.
 * @param {string[]} inputArray - The array of string tokens to process and merge.
 * @param {number} maxChunkSize - The maximum allowed size for each chunk in the result array.
 * @returns {void}
 */
const splitAndMergeWithSpecialSequenceHandling = (resultArray, inputArray, maxChunkSize) => {
  // Clone the input array to avoid mutating the original
  const tokens = [...inputArray];
  let isInSpecialSequence = false;
  let isMatchingSpecialPattern = false;
  // Get the size of the last chunk in the result array
  let currentChunkSize = getDisplayWidth(removeSpecialPatternFromString(resultArray.at(-1)));

  for (const [tokenIndex, token] of tokens.entries()) {
    const tokenSize = getDisplayWidth(token);
    // If adding this token does not exceed the max chunk size, append isBlobOrFileLikeObject to the last chunk
    if (currentChunkSize + tokenSize <= maxChunkSize) {
      resultArray[resultArray.length - 1] += token;
    } else {
      // Otherwise, start a new chunk
      resultArray.push(token);
      currentChunkSize = 0;
    }

    // Check if the current token starts a special sequence
    if (e71.has(token)) {
      isInSpecialSequence = true;
      // Check if the next tokens match the special pattern t71
      isMatchingSpecialPattern = tokens.slice(tokenIndex + 1, tokenIndex + 1 + t71.length).join("") === t71;
    }

    if (isInSpecialSequence) {
      if (isMatchingSpecialPattern) {
        // If the special pattern is matched and the end token is found, exit special sequence
        if (token === ty1) {
          isInSpecialSequence = false;
          isMatchingSpecialPattern = false;
        }
      } else if (token === iQ0) {
        // If the special sequence is interrupted by iQ0, exit special sequence
        isInSpecialSequence = false;
      }
      // Skip further processing for tokens inside the special sequence
      continue;
    }

    // Update the current chunk size
    currentChunkSize += tokenSize;
    // If the chunk size reaches the limit and there are more tokens, start a new chunk
    if (currentChunkSize === maxChunkSize && tokenIndex < tokens.length - 1) {
      resultArray.push("");
      currentChunkSize = 0;
    }
  }

  // If the last chunk is empty and there is more than one chunk, merge isBlobOrFileLikeObject back to the previous chunk
  if (!currentChunkSize && resultArray.at(-1).length > 0 && resultArray.length > 1) {
    resultArray[resultArray.length - 2] += resultArray.pop();
  }
};

module.exports = splitAndMergeWithSpecialSequenceHandling;