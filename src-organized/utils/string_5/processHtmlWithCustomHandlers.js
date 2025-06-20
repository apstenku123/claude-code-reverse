/**
 * Processes an HTML-like string, applying custom handlers to text and tag segments.
 * 
 * Iterates through the input string, detects tag boundaries (using '<' and '>'),
 * and applies the provided textHandler to plain text and tagHandler to tags.
 * Handles quoted attribute values and ensures correct parsing of nested or consecutive tags.
 * 
 * @param {string} htmlString - The HTML-like string to process.
 * @param {function} tagHandler - Function called for each tag segment. Receives (tagStartIndex, outputLength, tagName, tagString, tagType).
 * @param {function} textHandler - Function called for each text segment. Receives (textSegment).
 * @returns {string} The processed string with handlers applied to text and tag segments.
 */
function processHtmlWithCustomHandlers(htmlString, tagHandler, textHandler) {
  let output = "";
  let currentIndex = 0;
  let inTag = false;
  let inQuote = false;
  let quoteChar = '';
  let tagStartIndex = 0;
  const htmlLength = htmlString.length;
  let tagString = "";
  let tagName = "";

  // Main parsing loop
  for (let i = 0; i < htmlLength; i++) {
    const currentChar = htmlString.charAt(i);

    // Not inside a tag yet
    if (!inTag) {
      if (currentChar === '<') {
        inTag = true;
        tagStartIndex = i;
        continue;
      }
    } else if (!inQuote) {
      // Inside a tag, not inside a quoted attribute value
      if (currentChar === '<') {
        // Encountered a new tag before closing the previous one
        // Process the text before this tag
        output += textHandler(htmlString.slice(currentIndex, i));
        tagStartIndex = i;
        currentIndex = i;
        continue;
      }
      if (currentChar === '>' || i === htmlLength - 1) {
        // End of tag or end of string
        // Process the text before the tag
        output += textHandler(htmlString.slice(currentIndex, tagStartIndex));
        tagString = htmlString.slice(tagStartIndex, i + 1);
        tagName = extractTagName(tagString); // dP6 equivalent
        output += tagHandler(
          tagStartIndex,
          output.length,
          tagName,
          tagString,
          extractTagType(tagString) // uP6 equivalent
        );
        currentIndex = i + 1;
        inTag = false;
        continue;
      }
      if (currentChar === '"' || currentChar === "'") {
        // Check if this quote is starting an attribute value
        let lookback = 1;
        let prevChar = htmlString.charAt(i - lookback);
        while (prevChar.trim() === '' || prevChar === '=') {
          if (prevChar === '=') {
            inQuote = true;
            quoteChar = currentChar;
            // Continue main loop, now inside a quoted attribute
            continue;
          }
          prevChar = htmlString.charAt(i - ++lookback);
        }
      }
    } else if (currentChar === quoteChar) {
      // Closing quote for attribute value
      inQuote = false;
      continue;
    }
  }

  // Process any remaining text after the last tag
  if (currentIndex < htmlLength) {
    output += textHandler(htmlString.substr(currentIndex));
  }

  return output;
}

/**
 * Extracts the tag name from a tag string (e.g., '<div class="x">' => 'div').
 * Placeholder for dP6.
 * @param {string} tagString
 * @returns {string}
 */
function extractTagName(tagString) {
  // Simple regex to extract tag name
  const match = tagString.match(/^<\/?\s*([a-zA-Z0-9\-]+)/);
  return match ? match[1] : '';
}

/**
 * Determines the tag type from a tag string.
 * Placeholder for uP6.
 * @param {string} tagString
 * @returns {string}
 */
function extractTagType(tagString) {
  // Placeholder: implement as needed
  return '';
}

module.exports = processHtmlWithCustomHandlers;
