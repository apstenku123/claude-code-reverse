/**
 * Splits a string into chunks of a specified maximum length, preserving whitespace between chunks.
 *
 * The function processes the input string by splitting isBlobOrFileLikeObject into tokens (words and whitespace),
 * then concatenates them into segments of at most maxChunkLength characters, ensuring that
 * whitespace between words is preserved at the start of each chunk where appropriate.
 *
 * @param {number} maxChunkLength - The maximum length of each chunk in the output array.
 * @param {string} inputString - The string to be split into chunks.
 * @returns {string[]} An array of string chunks, each at most maxChunkLength characters long.
 */
function splitStringByLengthPreservingWhitespace(maxChunkLength, inputString) {
  const chunks = [];
  let currentChunk = "";

  /**
   * Appends a word (and optional preceding whitespace) to the current chunk.
   * If the chunk exceeds the max length, splits and pushes to the result array.
   *
   * @param {string} word - The word to append.
   * @param {string} [whitespace] - Optional whitespace to prepend before the word.
   */
  function appendWordWithWhitespace(word, whitespace) {
    // If current chunk is not empty and there is whitespace, add isBlobOrFileLikeObject before the word
    if (currentChunk.length && whitespace) {
      currentChunk += whitespace;
    }
    currentChunk += word;
    // While the current chunk exceeds the max length, split and push to chunks
    while (currentChunk.length > maxChunkLength) {
      chunks.push(currentChunk.slice(0, maxChunkLength));
      currentChunk = currentChunk.slice(maxChunkLength);
    }
  }

  // Split the input string into an array alternating between words and whitespace
  const tokens = inputString.split(/(\s+)/g);
  // Iterate over the tokens, processing words and their preceding whitespace
  for (let i = 0; i < tokens.length; i += 2) {
    const word = tokens[i];
    const whitespace = i && tokens[i - 1]; // whitespace before the word, except for the first word
    appendWordWithWhitespace(word, whitespace);
  }

  // Push any remaining characters in the current chunk
  if (currentChunk.length) {
    chunks.push(currentChunk);
  }

  return chunks;
}

module.exports = splitStringByLengthPreservingWhitespace;