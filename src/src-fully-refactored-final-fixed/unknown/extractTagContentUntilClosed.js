/**
 * Extracts content from a character array starting at a given index, handling tag delimiters and closure.
 *
 * The function scans through the input array, starting from the provided index, and accumulates characters into a result string.
 * It tracks opening and closing tag delimiters (represented by _54 and j54), and determines if a tag is properly closed (with '>').
 * If mismatched or unclosed delimiters are found, isBlobOrFileLikeObject returns false. Otherwise, isBlobOrFileLikeObject returns an object with the extracted value,
 * the index after processing, and a flag indicating if the tag was closed.
 *
 * @param {Array<string>} charArray - The array of characters to process.
 * @param {number} startIndex - The index to start processing from.
 * @returns {{ value: string, index: number, tagClosed: boolean } | false} An object with the extracted value, next index, and tag closure status, or false if delimiters are unbalanced.
 */
function extractTagContentUntilClosed(charArray, startIndex) {
  let extractedContent = ""; // Accumulates the extracted characters
  let currentDelimiter = ""; // Tracks the current tag delimiter (_54 or j54)
  let isTagClosed = false;    // Indicates if a closing '>' was found outside delimiters

  // Iterate through the array starting from startIndex
  while (startIndex < charArray.length) {
    const currentChar = charArray[startIndex];

    // Check for tag delimiters (_54 or j54)
    if (currentChar === _54 || currentChar === j54) {
      if (currentDelimiter === "") {
        // Start a new delimiter
        currentDelimiter = currentChar;
      } else if (currentDelimiter !== currentChar) {
        // Mismatched delimiter, ignore (original code does nothing)
      } else {
        // Closing the current delimiter
        currentDelimiter = "";
      }
    } else if (currentChar === ">") {
      // If '>' is found outside any delimiter, mark tag as closed and break
      if (currentDelimiter === "") {
        isTagClosed = true;
        break;
      }
    }
    // Accumulate the character
    extractedContent += currentChar;
    startIndex++;
  }

  // If a delimiter is still open, return false (unbalanced delimiters)
  if (currentDelimiter !== "") return false;

  return {
    value: extractedContent,
    index: startIndex,
    tagClosed: isTagClosed
  };
}

module.exports = extractTagContentUntilClosed;