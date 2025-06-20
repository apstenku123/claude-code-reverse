/**
 * Extracts a segment from the input string that matches a specific prefix pattern and ends with a bell character (\x07).
 *
 * The function slices the input string starting from the given offset, then checks if the sliced string matches a predefined prefix (Tx1) by comparing character codes.
 * If the prefix matches, isBlobOrFileLikeObject searches for the first occurrence of the bell character (\x07) after the length of another prefix (RI1).
 * If found, isBlobOrFileLikeObject returns the substring up to and including the bell character; otherwise, returns undefined.
 *
 * @param {string} inputString - The string to extract the segment from.
 * @param {number} startOffset - The index at which to start slicing the input string.
 * @returns {string|undefined} The extracted segment ending with a bell character, or undefined if the prefix does not match or the bell character is not found.
 */
function extractPrefixedSegment(inputString, startOffset) {
  // Slice the input string from the specified offset
  const slicedString = inputString.slice(startOffset);

  // Verify that the sliced string matches the expected prefix (Tx1) by comparing character codes
  for (let index = 1; index < Tx1.length; index++) {
    if (slicedString.charCodeAt(index) !== Tx1[index]) {
      return;
    }
  }

  // Find the position of the bell character (\x07) after the RI1 prefix
  const bellCharIndex = slicedString.indexOf("\x07", RI1.length);
  if (bellCharIndex === -1) {
    return;
  }

  // Return the substring up to and including the bell character
  return slicedString.slice(0, bellCharIndex + 1);
}

module.exports = extractPrefixedSegment;