/**
 * Extracts content from a string starting at a given index, handling tag delimiters and closure.
 *
 * This function iterates over the input string from the specified start index, accumulating characters
 * until isBlobOrFileLikeObject detects a tag closure or mismatched tag delimiters. It supports two types of tag delimiters
 * (represented by the external constants `_54` and `j54`). If the tag is not properly closed, isBlobOrFileLikeObject returns false.
 *
 * @param {string} inputString - The string to extract content from.
 * @param {number} startIndex - The index to start extraction from.
 * @returns {false | { value: string, index: number, tagClosed: boolean }}
 *   Returns an object with the extracted value, the index after extraction, and whether a tag was closed.
 *   Returns false if a tag delimiter was left unclosed.
 */
function extractTagContent(inputString, startIndex) {
  let extractedContent = ""; // Accumulates the extracted characters
  let currentDelimiter = ""; // Tracks the current tag delimiter in use
  let tagClosed = false;      // Indicates if a tag closure ('>') was found

  // Iterate through the string starting from startIndex
  while (startIndex < inputString.length) {
    const currentChar = inputString[startIndex];

    // Check for tag delimiter characters (e.g., quotes or other markers)
    if (currentChar === _54 || currentChar === j54) {
      if (currentDelimiter === "") {
        // Start a new delimiter context
        currentDelimiter = currentChar;
      } else if (currentDelimiter !== currentChar) {
        // Different delimiter found while one is open; ignore
        // (No action needed, continue accumulating)
      } else {
        // Closing the current delimiter
        currentDelimiter = "";
      }
    } else if (currentChar === ">") {
      // Check for tag closure only if not inside a delimiter
      if (currentDelimiter === "") {
        tagClosed = true;
        break;
      }
    }
    // Accumulate the character
    extractedContent += currentChar;
    startIndex++;
  }

  // If a delimiter was left open, extraction failed
  if (currentDelimiter !== "") {
    return false;
  }

  return {
    value: extractedContent,
    index: startIndex,
    tagClosed: tagClosed
  };
}

module.exports = extractTagContent;