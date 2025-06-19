/**
 * Extracts a substring from an array of characters, respecting ANSI escape sequences and code boundaries.
 * The function processes the input character array, identifies ANSI escape sequences, and extracts the substring
 * between the given start and end indices, ensuring that ANSI codes are handled correctly and not split.
 *
 * @param {string[]} charArray - The array of characters (possibly including ANSI codes) to process.
 * @param {number} startIndex - The starting index (1-based) for substring extraction.
 * @param {number} [endIndex] - The ending index (1-based, inclusive) for substring extraction. If not provided, uses the length of the array.
 * @returns {string} The extracted substring, with ANSI sequences preserved and formatted.
 */
function extractAnsiSequenceSubstring(charArray, startIndex, endIndex) {
  // Clone the input array to avoid mutating the original
  const characters = [...charArray];
  const ansiCodes = [];
  // Determine the maximum index to process
  const maxIndex = typeof endIndex === "number" ? endIndex : characters.length;
  let insideAnsiSequence = false;
  let currentAnsiMatch;
  let currentIndex = 0;
  let ansiSequenceValue;
  let resultString = "";

  for (const [charPosition, currentChar] of characters.entries()) {
    let justClosedAnsi = false;

    // Check if current character is the start of an ANSI escape sequence
    if (aQ0.includes(currentChar)) {
      // Try to match an ANSI code sequence from the current position
      const ansiMatch = /\d[^m]*/.exec(charArray.slice(charPosition, charPosition + 18));
      ansiSequenceValue = ansiMatch && ansiMatch.length > 0 ? ansiMatch[0] : undefined;
      if (currentIndex < maxIndex) {
        insideAnsiSequence = true;
        if (ansiSequenceValue !== undefined) {
          ansiCodes.push(ansiSequenceValue);
        }
      }
    } else if (insideAnsiSequence && currentChar === "m") {
      // End of ANSI escape sequence
      insideAnsiSequence = false;
      justClosedAnsi = true;
    }

    // Only increment the index if not inside an ANSI sequence or just closed one
    if (!insideAnsiSequence && !justClosedAnsi) {
      currentIndex++;
    }

    // If the character is not part of a special pattern and is a plain object (code point check)
    if (!l_4.test(currentChar) && aLike(currentChar.codePointAt())) {
      currentIndex++;
      // If no explicit endIndex, extend maxIndex for each such character
      if (typeof endIndex !== "number") {
        maxIndex++;
      }
    }

    // Build the result string based on the current index and ANSI state
    if (currentIndex > startIndex && currentIndex <= maxIndex) {
      resultString += currentChar;
    } else if (
      currentIndex === startIndex &&
      !insideAnsiSequence &&
      ansiSequenceValue !== undefined
    ) {
      // If at the start boundary and not inside an ANSI sequence, format the collected ANSI codes
      resultString = formatAnsiCodesFromInput(ansiCodes);
    } else if (currentIndex >= maxIndex) {
      // If reached or passed the end boundary, append formatted ANSI codes and break
      resultString += formatAnsiCodesFromInput(ansiCodes, true, ansiSequenceValue);
      break;
    }
  }

  return resultString;
}

module.exports = extractAnsiSequenceSubstring;