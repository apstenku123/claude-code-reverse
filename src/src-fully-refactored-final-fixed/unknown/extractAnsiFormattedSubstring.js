/**
 * Extracts a substring from the input array based on ANSI code sequences and index boundaries.
 * Handles special ANSI code markers, collects codes, and formats them using formatAnsiCodesFromInput.
 *
 * @param {Array<string>} inputArray - The array of characters or codes to process.
 * @param {number} startIndex - The starting index for substring extraction.
 * @param {number} [endIndexOrLength] - Optional. The end index or length limit for extraction. If not provided, uses the full length.
 * @returns {string} The extracted and formatted substring.
 */
function extractAnsiFormattedSubstring(inputArray, startIndex, endIndexOrLength) {
  const characters = [...inputArray]; // Clone the input array
  const ansiCodeBuffer = []; // Buffer to collect ANSI codes
  const maxIndex = typeof endIndexOrLength === "number" ? endIndexOrLength : characters.length;
  let insideAnsiSequence = false; // Flag to track if inside an ANSI sequence
  let matchedAnsiCode = undefined; // Holds the matched ANSI code
  let currentIndex = 0; // Tracks the current position in the array
  let resultString = ""; // The final result string

  for (const [charIndex, char] of characters.entries()) {
    let justClosedAnsiSequence = false;

    // Check if current character is an ANSI code marker
    if (aQ0.includes(char)) {
      // Attempt to match an ANSI code sequence in the next 18 characters
      const ansiMatch = /\d[^m]*/.exec(inputArray.slice(charIndex, charIndex + 18));
      matchedAnsiCode = ansiMatch && ansiMatch.length > 0 ? ansiMatch[0] : undefined;
      if (currentIndex < maxIndex) {
        insideAnsiSequence = true;
        if (matchedAnsiCode !== undefined) {
          ansiCodeBuffer.push(matchedAnsiCode);
        }
      }
    } else if (insideAnsiSequence && char === "m") {
      // End of ANSI sequence
      insideAnsiSequence = false;
      justClosedAnsiSequence = true;
    }

    // Increment index if not inside an ANSI sequence and not just closed one
    if (!insideAnsiSequence && !justClosedAnsiSequence) {
      currentIndex++;
    }

    // If the character is not a special pattern and is a plain object-like entity
    if (!l_4.test(char) && aLike(char.codePointAt())) {
      currentIndex++;
      // If endIndexOrLength is not specified, extend the maxIndex
      if (typeof endIndexOrLength !== "number") {
        maxIndex++;
      }
    }

    // Build the result string based on current index and flags
    if (currentIndex > startIndex && currentIndex <= maxIndex) {
      resultString += char;
    } else if (
      currentIndex === startIndex &&
      !insideAnsiSequence &&
      matchedAnsiCode !== undefined
    ) {
      // At the starting index, not inside ANSI, and have a matched code: format the buffer
      resultString = formatAnsiCodesFromInput(ansiCodeBuffer);
    } else if (currentIndex >= maxIndex) {
      // At or past the end: append formatted buffer and break
      resultString += formatAnsiCodesFromInput(ansiCodeBuffer, true, matchedAnsiCode);
      break;
    }
  }

  return resultString;
}

module.exports = extractAnsiFormattedSubstring;