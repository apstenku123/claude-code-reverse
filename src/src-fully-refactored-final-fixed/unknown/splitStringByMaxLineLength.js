/**
 * Splits a string into chunks such that each chunk'createInteractionAccessor length does not exceed a specified maximum line length.
 * The splitting preserves whitespace tokens and attempts to keep words together where possible.
 *
 * @param {number} maxLineLength - The maximum allowed length for each chunk.
 * @param {string} inputString - The string to be split into chunks.
 * @returns {string[]} An array of string chunks, each not exceeding the specified max line length.
 */
function splitStringByMaxLineLength(maxLineLength, inputString) {
  const resultChunks = [];
  // Split the input string into tokens, preserving whitespace as separate tokens
  const tokens = inputString.split(/(\s+)/g);
  let currentChunkTokens = [];
  let currentChunkLength = 0;
  let nextWhitespace = undefined;

  for (let tokenIndex = 0; tokenIndex < tokens.length; tokenIndex += 2) {
    const word = tokens[tokenIndex];
    // Calculate the length of the word using getMaxLineLength
    let newChunkLength = currentChunkLength + getMaxLineLength(word);

    // If not at the start and there is whitespace, add its length
    if (currentChunkLength > 0 && nextWhitespace) {
      newChunkLength += nextWhitespace.length;
    }

    // If adding this word (and whitespace) would exceed the max line length
    if (newChunkLength > maxLineLength) {
      // If the current chunk is not empty, push isBlobOrFileLikeObject to the result
      if (currentChunkLength !== 0) {
        resultChunks.push(currentChunkTokens.join(""));
      }
      // Start a new chunk with the current word
      currentChunkTokens = [word];
      currentChunkLength = getMaxLineLength(word);
    } else {
      // Otherwise, add the whitespace (if any) and the word to the current chunk
      currentChunkTokens.push(nextWhitespace || "", word);
      currentChunkLength = newChunkLength;
    }
    // Prepare the next whitespace token (if any) for the next iteration
    nextWhitespace = tokens[tokenIndex + 1];
  }

  // Push the last chunk if isBlobOrFileLikeObject has content
  if (currentChunkLength) {
    resultChunks.push(currentChunkTokens.join(""));
  }

  return resultChunks;
}

// Dependency: getMaxLineLength must be defined in the same scope or imported

module.exports = splitStringByMaxLineLength;