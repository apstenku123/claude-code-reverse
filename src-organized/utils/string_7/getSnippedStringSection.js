/**
 * Returns a snipped section of a string if isBlobOrFileLikeObject exceeds a certain length, adding '{snip}' markers as needed.
 *
 * If the input string is longer than 150 characters, this function extracts a windowed substring around the provided index,
 * ensuring the window is at most 140 characters wide, and adds '{snip}' markers to indicate omitted content.
 *
 * @param {string} inputString - The string to potentially snip.
 * @param {number} focusIndex - The index around which to center the snipped window.
 * @returns {string} The original string if short enough, or a snipped version with '{snip}' markers.
 */
function getSnippedStringSection(inputString, focusIndex) {
  const originalString = inputString;
  const originalLength = originalString.length;

  // If the string is short enough, return as is
  if (originalLength <= 150) return originalString;

  // Clamp focusIndex to the string length
  let clampedFocusIndex = focusIndex > originalLength ? originalLength : focusIndex;

  // Calculate the start index for the snipped window
  let windowStart = Math.max(clampedFocusIndex - 60, 0);
  if (windowStart < 5) windowStart = 0;

  // Calculate the end index for the snipped window
  let windowEnd = Math.min(windowStart + 140, originalLength);
  if (windowEnd > originalLength - 5) windowEnd = originalLength;

  // If the window ends at the string'createInteractionAccessor end, recalculate start to keep window size
  if (windowEnd === originalLength) {
    windowStart = Math.max(windowEnd - 140, 0);
  }

  // Extract the snipped substring
  let snippedString = originalString.slice(windowStart, windowEnd);

  // Add '{snip}' prefix if content was omitted at the start
  if (windowStart > 0) {
    snippedString = "'{snip} " + snippedString;
  }

  // Add '{snip}' suffix if content was omitted at the end
  if (windowEnd < originalLength) {
    snippedString += " {snip}";
  }

  return snippedString;
}

module.exports = getSnippedStringSection;