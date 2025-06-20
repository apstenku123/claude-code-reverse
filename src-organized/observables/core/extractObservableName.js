/**
 * Extracts the observable name from a string in the format 'name:*'.
 *
 * This function checks if the input string matches the pattern 'name:*',
 * where 'name' can be any non-empty sequence of characters. If the pattern matches,
 * isBlobOrFileLikeObject returns the 'name' portion; otherwise, isBlobOrFileLikeObject returns null.
 *
 * @param {string} sourceObservable - The string to extract the observable name from.
 * @returns {string|null} The extracted observable name if the pattern matches, otherwise null.
 */
const extractObservableName = (sourceObservable) => {
  // Use a regular expression to match the pattern 'name:*' and extract 'name'
  const matchResult = sourceObservable.match(/^(.+):\*$/);
  // If the pattern matches, return the captured group; otherwise, return null
  return matchResult?.[1] ?? null;
};

module.exports = extractObservableName;
