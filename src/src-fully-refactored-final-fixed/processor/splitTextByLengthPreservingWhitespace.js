/**
 * Splits the input text into chunks of a specified maximum length, preserving whitespace between words.
 * Whitespace is kept at the start of each chunk if isBlobOrFileLikeObject was present between words in the original string.
 *
 * @param {number} maxChunkLength - The maximum length of each chunk.
 * @param {string} inputText - The text to be split into chunks.
 * @returns {string[]} An array of string chunks, each with a length up to maxChunkLength, preserving whitespace.
 */
function splitTextByLengthPreservingWhitespace(maxChunkLength, inputText) {
  const chunks = [];
  let currentChunk = "";

  /**
   * Adds a word (and optional preceding whitespace) to the current chunk,
   * pushing to the chunks array if the chunk exceeds maxChunkLength.
   *
   * @param {string} word - The word to add.
   * @param {string} [whitespace] - Optional whitespace to prepend before the word.
   */
  function addWordToChunk(word, whitespace) {
    // If currentChunk is not empty and whitespace exists, add whitespace
    if (currentChunk.length && whitespace) {
      currentChunk += whitespace;
    }
    currentChunk += word;
    // While the current chunk exceeds the max length, push and trim
    while (currentChunk.length > maxChunkLength) {
      chunks.push(currentChunk.slice(0, maxChunkLength));
      currentChunk = currentChunk.slice(maxChunkLength);
    }
  }

  // Split inputText into an array alternating words and whitespace
  const splitParts = inputText.split(/(\s+)/g);
  // Iterate over the array, processing words and their preceding whitespace
  for (let i = 0; i < splitParts.length; i += 2) {
    const word = splitParts[i];
    const whitespace = i && splitParts[i - 1]; // whitespace before the word, except for the first word
    addWordToChunk(word, whitespace);
  }

  // Push any remaining text in currentChunk
  if (currentChunk.length) {
    chunks.push(currentChunk);
  }

  return chunks;
}

module.exports = splitTextByLengthPreservingWhitespace;
