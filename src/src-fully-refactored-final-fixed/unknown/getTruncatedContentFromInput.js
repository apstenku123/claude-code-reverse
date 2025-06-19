/**
 * Extracts and returns the truncated content from the provided input.
 * If the input is an array, isBlobOrFileLikeObject joins its elements into a single string before processing.
 * If the input is falsy, returns an empty string.
 *
 * @param {string|string[]} input - The input value, which can be a string or an array of strings.
 * @returns {string} The truncated content extracted from the input.
 */
function getTruncatedContentFromInput(input) {
  // Return empty string if input is falsy (null, undefined, empty, etc.)
  if (!input) return "";

  // If input is an array, join its elements into a single string; otherwise, use input as is
  const inputAsString = Array.isArray(input) ? input.join("") : input;

  // Extract the truncatedContent property from the result of getTruncatedContentSummary(inputAsString)
  const { truncatedContent } = getTruncatedContentSummary(inputAsString);

  // Return the truncated content
  return truncatedContent;
}

module.exports = getTruncatedContentFromInput;