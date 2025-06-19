/**
 * Extracts a formatted ANSI segment from an input array based on control codes and boundaries.
 *
 * @param {Array<string>} inputArray - The array of input characters to process.
 * @param {number} startIndex - The starting index for extraction.
 * @param {number} [maxCount] - Optional maximum number of segments to extract.
 * @returns {string} The extracted and formatted ANSI segment.
 */
function extractAnsiSegmentFromInput(inputArray, startIndex, maxCount) {
  const inputCopy = [...inputArray]; // Clone the input array to avoid mutation
  const ansiCodeBuffer = []; // Buffer to collect ANSI codes
  const maxSegments = typeof maxCount === "number" ? maxCount : inputCopy.length;
  let isAnsiSequenceActive = false; // Tracks if currently inside an ANSI sequence
  let currentAnsiMatch;
  let segmentCounter = 0; // Tracks the current segment index
  let resultString = "";

  for (const [charIndex, currentChar] of inputCopy.entries()) {
    let justClosedAnsi = false;

    // Check if the current character is an ANSI control code
    if (aQ0.includes(currentChar)) {
      // Attempt to match an ANSI sequence (e.g., \d[^m]*) in the next 18 chars
      const ansiMatch = /\d[^m]*/.exec(inputArray.slice(charIndex, charIndex + 18));
      currentAnsiMatch = ansiMatch && ansiMatch.length > 0 ? ansiMatch[0] : undefined;
      if (segmentCounter < maxSegments) {
        isAnsiSequenceActive = true;
        if (currentAnsiMatch !== undefined) {
          ansiCodeBuffer.push(currentAnsiMatch);
        }
      }
    } else if (isAnsiSequenceActive && currentChar === "m") {
      // End of ANSI sequence
      isAnsiSequenceActive = false;
      justClosedAnsi = true;
    }

    // Only increment segmentCounter if not inside or just closed an ANSI sequence
    if (!isAnsiSequenceActive && !justClosedAnsi) {
      segmentCounter++;
    }

    // If the character is not a special code and is a plain object-like value, increment segmentCounter
    if (!l_4.test(currentChar) && aLike(currentChar.codePointAt())) {
      segmentCounter++;
      if (typeof maxCount !== "number") {
        // If maxCount is not specified, increase maxSegments to allow for more extraction
        maxSegments++;
      }
    }

    // Build the result string based on the current segmentCounter
    if (segmentCounter > startIndex && segmentCounter <= maxSegments) {
      resultString += currentChar;
    } else if (
      segmentCounter === startIndex &&
      !isAnsiSequenceActive &&
      currentAnsiMatch !== undefined
    ) {
      // If at the start index and not in an ANSI sequence, format the buffer
      resultString = formatAnsiCodesFromInput(ansiCodeBuffer);
    } else if (segmentCounter >= maxSegments) {
      // If reached the max, append formatted ANSI codes and exit
      resultString += formatAnsiCodesFromInput(ansiCodeBuffer, true, currentAnsiMatch);
      break;
    }
  }

  return resultString;
}

module.exports = extractAnsiSegmentFromInput;