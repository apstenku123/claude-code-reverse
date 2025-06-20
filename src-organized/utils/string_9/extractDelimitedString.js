/**
 * Extracts a substring from the input string, starting at a given index, up to a specified delimiter sequence,
 * while properly handling quoted substrings and normalizing tabs to spaces.
 * 
 * @param {string} input - The string to extract from.
 * @param {number} startIndex - The index to start extraction from.
 * @param {string} [delimiter=">"] - The delimiter sequence to stop at (can be one or two characters).
 * @returns {{ data: string, index: number }|undefined} An object containing the extracted data and the index where the delimiter was found, or undefined if the delimiter is not found.
 */
function extractDelimitedString(input, startIndex, delimiter = ">") {
  let quoteChar = ""; // Tracks the current quote character if inside quotes
  let extracted = "";

  for (let currentIndex = startIndex; currentIndex < input.length; currentIndex++) {
    let currentChar = input[currentIndex];

    if (quoteChar) {
      // If inside quotes, check for closing quote
      if (currentChar === quoteChar) {
        quoteChar = "";
      }
    } else if (currentChar === '"' || currentChar === "'") {
      // Enter quoted section
      quoteChar = currentChar;
    } else if (currentChar === delimiter[0]) {
      // Check for delimiter match
      if (delimiter[1]) {
        // Delimiter is two characters, check next character
        if (input[currentIndex + 1] === delimiter[1]) {
          return {
            data: extracted,
            index: currentIndex
          };
        }
      } else {
        // Delimiter is a single character
        return {
          data: extracted,
          index: currentIndex
        };
      }
    } else if (currentChar === "\processRuleBeginHandlers") {
      // Normalize tabs to spaces
      currentChar = " ";
    }
    extracted += currentChar;
  }
}

module.exports = extractDelimitedString;