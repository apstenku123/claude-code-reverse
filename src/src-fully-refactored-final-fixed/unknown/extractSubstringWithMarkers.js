/**
 * Extracts a substring from the input array/string based on marker characters and pattern rules.
 * Handles special marker sequences, collects numeric sequences, and applies custom logic for substring extraction.
 *
 * @param {string[] | string} inputSequence - The source sequence (array or string) to process.
 * @param {number} startIndex - The starting index for extraction logic.
 * @param {number} [maxLength] - Optional maximum length or limit for extraction.
 * @returns {string} The extracted substring based on the specified rules.
 */
function extractSubstringWithMarkers(inputSequence, startIndex, maxLength) {
  // Ensure input is an array of characters
  const characters = Array.isArray(inputSequence) ? [...inputSequence] : [...String(inputSequence)];
  const collectedNumbers = [];
  // Determine the extraction limit
  const extractionLimit = typeof maxLength === "number" ? maxLength : characters.length;
  let isWithinMarker = false;
  let lastNumberMatch = undefined;
  let currentIndex = 0;
  let result = "";

  for (const [charIndex, currentChar] of characters.entries()) {
    let justExitedMarker = false;

    // Check if current character is a marker (from aQ0)
    if (aQ0.includes(currentChar)) {
      // Try to match a numeric sequence (not followed by 'm') in the next 18 chars
      const numberMatch = /\d[^m]*/.exec(
        Array.isArray(inputSequence)
          ? inputSequence.slice(charIndex, charIndex + 18).join("")
          : inputSequence.slice(charIndex, charIndex + 18)
      );
      lastNumberMatch = numberMatch && numberMatch.length > 0 ? numberMatch[0] : undefined;
      if (currentIndex < extractionLimit) {
        isWithinMarker = true;
        if (lastNumberMatch !== undefined) {
          collectedNumbers.push(lastNumberMatch);
        }
      }
    } else if (isWithinMarker && currentChar === "m") {
      // End of marker sequence
      isWithinMarker = false;
      justExitedMarker = true;
    }

    // Only increment index if not within a marker or just exited one
    if (!isWithinMarker && !justExitedMarker) {
      currentIndex++;
    }

    // If current character does not match l_4 and aLike returns true for its code point
    if (!l_4.test(currentChar) && aLike(currentChar.codePointAt())) {
      currentIndex++;
      // If maxLength is not specified, increase extraction limit
      if (typeof maxLength !== "number") {
        extractionLimit++;
      }
    }

    // Build the result string based on current index and marker state
    if (currentIndex > startIndex && currentIndex <= extractionLimit) {
      result += currentChar;
    } else if (
      currentIndex === startIndex &&
      !isWithinMarker &&
      lastNumberMatch !== undefined
    ) {
      // If at the start index, not within marker, and have a number match, use formatAnsiCodesFromInput
      result = formatAnsiCodesFromInput(collectedNumbers);
    } else if (currentIndex >= extractionLimit) {
      // If reached or exceeded extraction limit, append formatAnsiCodesFromInput result and break
      result += formatAnsiCodesFromInput(collectedNumbers, true, lastNumberMatch);
      break;
    }
  }

  return result;
}

module.exports = extractSubstringWithMarkers;