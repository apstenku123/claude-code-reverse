/**
 * Transforms each word in the input string using the getDisplayWidth function.
 *
 * @param {string} inputString - The string to be split into words and transformed.
 * @returns {any[]} An array containing the result of applying getDisplayWidth to each word in the input string.
 */
const transformWordsWithHS = (inputString) => {
  // Split the input string into an array of words using space as the delimiter
  const words = inputString.split(" ");

  // Apply the getDisplayWidth transformation to each word
  const transformedWords = words.map((word) => getDisplayWidth(word));

  return transformedWords;
};

module.exports = transformWordsWithHS;
