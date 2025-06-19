/**
 * Processes an HTML-like string, applying transformation callbacks to text and tags.
 *
 * This function scans the input string, detects tag boundaries (e.g., <tag>), and applies:
 *   - `processTextCallback` to text outside of tags
 *   - `processTagCallback` to each tag, passing tag position and metadata
 * Handles quoted attribute values and nested tags robustly.
 *
 * @param {string} inputString - The string to process, containing HTML-like tags.
 * @param {function} processTagCallback - Callback invoked for each tag. Receives (tagStartIndex, outputLength, tagName, tagString, tagMeta).
 * @param {function} processTextCallback - Callback invoked for each text segment outside tags. Receives (textSegment).
 * @returns {string} The processed string with callbacks applied to text and tags.
 */
function processHtmlTagsWithCallbacks(inputString, processTagCallback, processTextCallback) {
  let output = ""; // Final output string
  let textStartIndex = 0; // Start index of current text segment
  let tagStartIndex = false; // Index of '<' if inside a tag, otherwise false
  let insideQuote = false; // Stores the quote character if inside a quoted attribute value, otherwise false
  const inputLength = inputString.length;

  // Helper: Extracts tag name from tag string
  function extractTagName(tagString) {
    // Assumes tagString starts with '<' and ends with '>'
    // Removes angle brackets and splits by whitespace
    return tagString.slice(1, tagString.length - 1).trim().split(/\s+/)[0];
  }

  // Helper: Extracts tag metadata (placeholder for uP6)
  function extractTagMeta(tagString) {
    // Placeholder for uP6; implement as needed
    return {};
  }

  // Main loop: iterate through each character
  for (let currentIndex = 0; currentIndex < inputLength; currentIndex++) {
    const currentChar = inputString.charAt(currentIndex);

    // Not inside a tag
    if (tagStartIndex === false) {
      if (currentChar === "<") {
        tagStartIndex = currentIndex;
        continue;
      }
    }
    // Inside a tag, not inside a quoted attribute value
    else if (insideQuote === false) {
      if (currentChar === "<") {
        // Found a nested '<' before closing previous tag: treat previous text as text
        output += processTextCallback(inputString.slice(textStartIndex, currentIndex));
        tagStartIndex = currentIndex;
        textStartIndex = currentIndex;
        continue;
      }
      if (currentChar === ">" || currentIndex === inputLength - 1) {
        // End of tag or end of string
        output += processTextCallback(inputString.slice(textStartIndex, tagStartIndex));
        const tagString = inputString.slice(tagStartIndex, currentIndex + 1);
        const tagName = extractTagName(tagString); // Equivalent to dP6
        const tagMeta = extractTagMeta(tagString); // Equivalent to uP6
        output += processTagCallback(tagStartIndex, output.length, tagName, tagString, tagMeta);
        textStartIndex = currentIndex + 1;
        tagStartIndex = false;
        continue;
      }
      if (currentChar === '"' || currentChar === "'") {
        // Check if this quote is starting an attribute value (after '=')
        let lookback = 1;
        let prevChar = inputString.charAt(currentIndex - lookback);
        while (prevChar.trim() === "" || prevChar === "=") {
          if (prevChar === "=") {
            insideQuote = currentChar; // Store quote character
            // Skip to next character (inside quoted value)
            continue;
          }
          prevChar = inputString.charAt(currentIndex - ++lookback);
        }
      }
    }
    // Inside a quoted attribute value
    else if (currentChar === insideQuote) {
      // End of quoted attribute value
      insideQuote = false;
      continue;
    }
  }

  // Process any remaining text after the last tag
  if (textStartIndex < inputLength) {
    output += processTextCallback(inputString.substr(textStartIndex));
  }

  return output;
}

module.exports = processHtmlTagsWithCallbacks;