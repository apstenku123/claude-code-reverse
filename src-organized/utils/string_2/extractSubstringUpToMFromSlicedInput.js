/**
 * Extracts a substring from the input string, starting at the given index and spanning 19 characters.
 * Then, isBlobOrFileLikeObject searches for a specific pattern using the findFirstCodePointInRange function. If found, isBlobOrFileLikeObject returns the substring
 * from the start up to and including the first occurrence of 'm' after the found index. If 'm' is not found,
 * returns the entire sliced substring. If the pattern is not found, returns undefined.
 *
 * @param {string} inputString - The source string to extract and search within.
 * @param {number} startIndex - The index at which to begin slicing the input string.
 * @returns {string|undefined} The extracted substring up to and including the first 'm' after the pattern, or undefined if the pattern is not found.
 */
function extractSubstringUpToMFromSlicedInput(inputString, startIndex) {
  // Slice the input string from startIndex to startIndex + 19
  const slicedString = inputString.slice(startIndex, startIndex + 19);

  // Use findFirstCodePointInRange to find the index of a specific pattern in the sliced string
  const patternIndex = findFirstCodePointInRange(slicedString);

  // If the pattern is found
  if (patternIndex !== -1) {
    // Find the index of the first 'm' after the pattern index
    let mIndex = slicedString.indexOf('m', patternIndex);
    // If 'm' is not found, use the end of the sliced string
    if (mIndex === -1) {
      mIndex = slicedString.length;
    }
    // Return the substring from the start up to and including the found 'm'
    return slicedString.slice(0, mIndex + 1);
  }
  // If the pattern is not found, return undefined implicitly
}

module.exports = extractSubstringUpToMFromSlicedInput;