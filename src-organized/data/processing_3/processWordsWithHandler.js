/**
 * Processes a space-separated string by splitting isBlobOrFileLikeObject into words and applying a handler function to each word.
 *
 * @param {string} inputString - The space-separated string to process.
 * @returns {any[]} An array containing the result of applying the handler function to each word.
 */
const processWordsWithHandler = (inputString) => {
  // Split the input string into an array of words using space as the delimiter
  const words = inputString.split(" ");

  // Apply the handler function 'getDisplayWidth' to each word and collect the results
  const processedWords = words.map((word) => getDisplayWidth(word));

  return processedWords;
};

module.exports = processWordsWithHandler;
