/**
 * Parses an HTML-like string, applies transformations to text and tags, and reconstructs the result.
 *
 * @param {string} input - The HTML-like string to parse and transform.
 * @param {function} tagTransformer - Function to process each tag. Receives (tagStartIndex, outputLength, tagName, tagString, tagAttributes).
 * @param {function} textTransformer - Function to process plain text segments. Receives (textSegment).
 * @returns {string} The transformed string with processed tags and text.
 */
function parseAndTransformHtmlTags(input, tagTransformer, textTransformer) {
  let output = ""; // Final output string
  let segmentStart = 0; // Start index of the current text segment
  let tagStartIndex = false; // Index where a tag starts, or false if not in a tag
  let insideQuotedAttribute = false; // Holds the quote character if inside a quoted attribute value, or false otherwise
  const inputLength = input.length;
  let currentTagString = ""; // The full tag string (e.g., <div class="foo">)
  let tagName = ""; // The tag name (e.g., div)

  // Main parsing loop
  for (let i = 0; i < inputLength; i++) {
    const currentChar = input.charAt(i);

    // Not inside a tag
    if (tagStartIndex === false) {
      if (currentChar === "<") {
        tagStartIndex = i;
        continue;
      }
    }
    // Inside a tag, but not inside a quoted attribute
    else if (insideQuotedAttribute === false) {
      if (currentChar === "<") {
        // Found a new tag start before closing the previous one
        // Process the text before this tag
        output += textTransformer(input.slice(segmentStart, i));
        tagStartIndex = i;
        segmentStart = i;
        continue;
      }
      if (currentChar === ">" || i === inputLength - 1) {
        // End of tag or end of input
        // Process the text before the tag
        output += textTransformer(input.slice(segmentStart, tagStartIndex));
        currentTagString = input.slice(tagStartIndex, i + 1);
        tagName = dP6(currentTagString); // Extract tag name
        // Process the tag and append to output
        output += tagTransformer(
          tagStartIndex,
          output.length,
          tagName,
          currentTagString,
          uP6(currentTagString)
        );
        segmentStart = i + 1;
        tagStartIndex = false;
        continue;
      }
      if (currentChar === '"' || currentChar === "'") {
        // Check if this quote is starting an attribute value
        let lookback = 1;
        let prevChar = input.charAt(i - lookback);
        while (prevChar.trim() === "" || prevChar === "=") {
          if (prevChar === "=") {
            insideQuotedAttribute = currentChar; // Set the quote character
            // Continue parsing inside quoted attribute
            continue;
          }
          prevChar = input.charAt(i - ++lookback);
        }
      }
    }
    // Inside a quoted attribute value
    else if (currentChar === insideQuotedAttribute) {
      // Closing quote found
      insideQuotedAttribute = false;
      continue;
    }
  }
  // Process any remaining text after the last tag
  if (segmentStart < inputLength) {
    output += textTransformer(input.substr(segmentStart));
  }
  return output;
}

module.exports = parseAndTransformHtmlTags;