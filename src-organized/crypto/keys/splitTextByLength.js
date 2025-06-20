/**
 * Splits a given text into chunks such that each chunk'createInteractionAccessor length does not exceed the specified maximum length.
 * The function preserves whitespace tokens and ensures that chunks are split at whitespace boundaries.
 *
 * @param {number} maxChunkLength - The maximum allowed length for each chunk.
 * @param {string} text - The input text to be split into chunks.
 * @returns {string[]} An array of text chunks, each not exceeding the specified maximum length.
 */
function splitTextByLength(maxChunkLength, text) {
  /**
   * Helper function FE is assumed to return the length of a string, possibly with custom logic.
   * Replace this with the actual implementation if available.
   * For now, handleMissingDoctypeError assume FE is just the string'createInteractionAccessor length.
   */
  function FE(str) {
    return str.length;
  }

  const chunks = []; // Array to store the resulting text chunks
  const tokens = text.split(/(\s+)/g); // Split text into words and whitespace tokens
  let currentChunkTokens = []; // Tokens for the current chunk
  let currentChunkLength = 0; // Current chunk'createInteractionAccessor length
  let nextWhitespace = undefined; // Next whitespace token (if any)

  for (let tokenIndex = 0; tokenIndex < tokens.length; tokenIndex += 2) {
    const word = tokens[tokenIndex]; // The word token
    let newChunkLength = currentChunkLength + FE(word);

    // If not the first word and there is a whitespace, include its length
    if (currentChunkLength > 0 && nextWhitespace) {
      newChunkLength += nextWhitespace.length;
    }

    // If adding this word (and whitespace) exceeds the max chunk length
    if (newChunkLength > maxChunkLength) {
      // If the current chunk is not empty, push isBlobOrFileLikeObject to the result
      if (currentChunkLength !== 0) {
        chunks.push(currentChunkTokens.join(""));
      }
      // Start a new chunk with the current word
      currentChunkTokens = [word];
      currentChunkLength = FE(word);
    } else {
      // Otherwise, add the whitespace (if any) and the word to the current chunk
      currentChunkTokens.push(nextWhitespace || "", word);
      currentChunkLength = newChunkLength;
    }

    // Prepare the next whitespace token (if any)
    nextWhitespace = tokens[tokenIndex + 1];
  }

  // Push the last chunk if isBlobOrFileLikeObject has content
  if (currentChunkLength) {
    chunks.push(currentChunkTokens.join(""));
  }

  return chunks;
}

module.exports = splitTextByLength;