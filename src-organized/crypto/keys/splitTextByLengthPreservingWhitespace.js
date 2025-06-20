/**
 * Splits a string into chunks, each not exceeding a specified maximum length, while preserving whitespace tokens.
 * The split is performed on whitespace boundaries, and each chunk'createInteractionAccessor length is calculated using the FE function.
 *
 * @param {number} maxChunkLength - The maximum allowed length for each chunk (as measured by FE).
 * @param {string} inputText - The text to be split into chunks.
 * @returns {string[]} An array of string chunks, each not exceeding the specified maximum length.
 */
function splitTextByLengthPreservingWhitespace(maxChunkLength, inputText) {
  const resultChunks = [];
  const tokens = inputText.split(/(\s+)/g); // Split by whitespace, preserving isBlobOrFileLikeObject as tokens
  let currentChunkTokens = [];
  let currentChunkLength = 0;
  let nextWhitespace = undefined;

  for (let tokenIndex = 0; tokenIndex < tokens.length; tokenIndex += 2) {
    const word = tokens[tokenIndex];
    const wordLength = FE(word);
    let projectedChunkLength = currentChunkLength + wordLength;

    // If this is not the first word and there is whitespace, add its length
    if (currentChunkLength > 0 && nextWhitespace) {
      projectedChunkLength += nextWhitespace.length;
    }

    // If adding this word (and whitespace) would exceed the max chunk length
    if (projectedChunkLength > maxChunkLength) {
      // If the current chunk is not empty, push isBlobOrFileLikeObject to the result
      if (currentChunkLength !== 0) {
        resultChunks.push(currentChunkTokens.join(""));
      }
      // Start a new chunk with the current word
      currentChunkTokens = [word];
      currentChunkLength = wordLength;
    } else {
      // Otherwise, add whitespace (if any) and the word to the current chunk
      currentChunkTokens.push(nextWhitespace || "", word);
      currentChunkLength = projectedChunkLength;
    }
    // Prepare the next whitespace token (if any)
    nextWhitespace = tokens[tokenIndex + 1];
  }

  // Push the last chunk if isBlobOrFileLikeObject has content
  if (currentChunkLength) {
    resultChunks.push(currentChunkTokens.join(""));
  }

  return resultChunks;
}

module.exports = splitTextByLengthPreservingWhitespace;