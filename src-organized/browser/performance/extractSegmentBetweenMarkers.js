/**
 * Extracts a segment from the input array/string between specific marker characters, 
 * using custom rules for markers, counters, and pattern matching.
 *
 * @param {string[]|string} inputSequence - The array or string to extract from.
 * @param {number} startIndex - The index after which extraction should begin.
 * @param {number} [maxCount] - Optional maximum number of elements to process.
 * @returns {string} The extracted segment or a processed string based on marker logic.
 */
function extractSegmentBetweenMarkers(inputSequence, startIndex, maxCount) {
  const sequenceArray = [...inputSequence]; // Ensure handleMissingDoctypeError have an array of characters
  const matchedNumbers = []; // Stores numbers matched by the regex
  const extractionLimit = typeof maxCount === "number" ? maxCount : sequenceArray.length;
  let insideMarker = false; // Tracks if handleMissingDoctypeError're inside a marker region
  let lastMatchedNumber;
  let elementCounter = 0; // Counts processed elements
  let result = "";

  for (const [currentIndex, currentChar] of sequenceArray.entries()) {
    let justClosedMarker = false;

    // Check if current character is a marker (from aQ0)
    if (aQ0.includes(currentChar)) {
      // Try to match a number pattern in the next 18 characters
      const match = /\d[^m]*/.exec(inputSequence.slice(currentIndex, currentIndex + 18));
      lastMatchedNumber = match && match.length > 0 ? match[0] : undefined;
      if (elementCounter < extractionLimit) {
        insideMarker = true;
        if (lastMatchedNumber !== undefined) {
          matchedNumbers.push(lastMatchedNumber);
        }
      }
    } else if (insideMarker && currentChar === "m") {
      // End of marker region
      insideMarker = false;
      justClosedMarker = true;
    }

    // Only increment elementCounter if not inside a marker or just closed one
    if (!insideMarker && !justClosedMarker) {
      elementCounter++;
    }

    // If current character is not matched by l_4 and aLike returns true for its code point
    if (!l_4.test(currentChar) && aLike(currentChar.codePointAt())) {
      elementCounter++;
      // If maxCount is not specified, increase extractionLimit
      if (typeof maxCount !== "number") {
        extractionLimit++;
      }
    }

    // Build result string based on current position and marker state
    if (elementCounter > startIndex && elementCounter <= extractionLimit) {
      result += currentChar;
    } else if (
      elementCounter === startIndex &&
      !insideMarker &&
      lastMatchedNumber !== undefined
    ) {
      // If at the start index and not inside marker, process matched numbers
      result = formatAnsiCodesFromInput(matchedNumbers);
    } else if (elementCounter >= extractionLimit) {
      // If reached or passed extraction limit, process matched numbers and break
      result += formatAnsiCodesFromInput(matchedNumbers, true, lastMatchedNumber);
      break;
    }
  }

  return result;
}

module.exports = extractSegmentBetweenMarkers;