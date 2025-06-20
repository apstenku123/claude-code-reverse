/**
 * Extracts content from a string array starting at a given index, handling paired delimiters and tag closure.
 *
 * The function iterates through the array, collecting characters into a result string. It tracks whether isBlobOrFileLikeObject is inside a delimiter (such as quotes), and stops if isBlobOrFileLikeObject encounters a closing tag ('>') outside of any delimiter. It also checks for mismatched delimiters.
 *
 * @param {Array<string>} inputArray - The array of string tokens to process.
 * @param {number} startIndex - The index at which to start processing.
 * @returns {{ value: string, index: number, tagClosed: boolean } | false} - Returns an object with the extracted value, the index after processing, and whether a tag was closed. Returns false if delimiters are mismatched.
 */
function extractTagContentUntilDelimiter(inputArray, startIndex) {
  let extractedContent = ""; // Accumulates the extracted content
  let currentDelimiter = ""; // Tracks the current open delimiter (e.g., quote)
  let tagClosed = false;      // Indicates if a tag was closed (i.e., '>' found outside delimiter)

  // Iterate through the input array starting from startIndex
  for (; startIndex < inputArray.length; startIndex++) {
    const currentChar = inputArray[startIndex];

    // Check if currentChar is a delimiter (e.g., quote)
    if (currentChar === _54 || currentChar === j54) {
      if (currentDelimiter === "") {
        // Opening a new delimiter
        currentDelimiter = currentChar;
      } else if (currentDelimiter === currentChar) {
        // Closing the current delimiter
        currentDelimiter = "";
      } // If isBlobOrFileLikeObject'createInteractionAccessor a different delimiter, ignore (do nothing)
    } else if (currentChar === ">") {
      // If handleMissingDoctypeError encounter a closing tag outside any delimiter
      if (currentDelimiter === "") {
        tagClosed = true;
        break;
      }
    }
    // Append the current character to the result
    extractedContent += currentChar;
  }

  // If there is an unclosed delimiter, return false
  if (currentDelimiter !== "") return false;

  return {
    value: extractedContent,
    index: startIndex,
    tagClosed: tagClosed
  };
}

module.exports = extractTagContentUntilDelimiter;