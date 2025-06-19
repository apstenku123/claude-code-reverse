/**
 * Parses a string of key-value pairs, processes each pair using a provided callback, and returns a formatted string of results.
 * Handles quoted values, whitespace, and custom parsing logic for each pair.
 *
 * @param {string} input - The string containing key-value pairs to parse.
 * @param {function} processPairCallback - Callback function to process each key or key-value pair. Should return a string or falsy value.
 * @returns {string} a trimmed string of processed results, joined by spaces.
 */
function parseKeyValuePairs(input, processPairCallback) {
  let currentKeyStart = 0; // Start index of the current key or value
  let quoteEndIndex = 0;   // End index of a quoted value
  const processedPairs = [];
  let currentKey = false;  // Holds the current key being processed, or false if not in a key-value pair
  const inputLength = input.length;

  /**
   * Helper to process a key or key-value pair using the callback and store the result if present.
   * @param {string} key - The key to process.
   * @param {string} [value] - The value to process (optional).
   */
  function processPair(key, value) {
    // Trim and clean the key
    key = xR.trim(key);
    key = key.replace(cP6, "").toLowerCase();
    if (key.length < 1) return;
    const result = processPairCallback(key, value || "");
    if (result) processedPairs.push(result);
  }

  for (let charIndex = 0; charIndex < inputLength; charIndex++) {
    const currentChar = input.charAt(charIndex);
    let value, quoteCloseIndex;

    // Detect start of key-value pair (key = value)
    if (currentKey === false && currentChar === "=") {
      currentKey = input.slice(currentKeyStart, charIndex);
      currentKeyStart = charIndex + 1;
      // If value is quoted, set quoteEndIndex to the quote character'createInteractionAccessor index, else find next quote
      quoteEndIndex = (input.charAt(currentKeyStart) === '"' || input.charAt(currentKeyStart) === "'")
        ? currentKeyStart
        : findNextQuoteIndex(input, charIndex + 1); // findNextQuoteIndex: finds next quote index
      continue;
    }

    // If inside a quoted value, look for the closing quote
    if (currentKey !== false) {
      if (charIndex === quoteEndIndex) {
        quoteCloseIndex = input.indexOf(currentChar, charIndex + 1);
        if (quoteCloseIndex === -1) break;
        else {
          value = xR.trim(input.slice(quoteEndIndex + 1, quoteCloseIndex));
          processPair(currentKey, value);
          currentKey = false;
          charIndex = quoteCloseIndex;
          currentKeyStart = charIndex + 1;
          continue;
        }
      }
    }

    // Handle whitespace (space, newline, tab)
    if (/\s|\n|\processRuleBeginHandlers/.test(currentChar)) {
      // Normalize whitespace in the input string
      input = input.replace(/\s|\n|\processRuleBeginHandlers/g, " ");
      if (currentKey === false) {
        // Not in a key-value pair: try to find next equals sign
        quoteCloseIndex = findEqualsSignIndex(input, charIndex);
        if (quoteCloseIndex === -1) {
          value = xR.trim(input.slice(currentKeyStart, charIndex));
          processPair(value);
          currentKey = false;
          currentKeyStart = charIndex + 1;
          continue;
        } else {
          charIndex = quoteCloseIndex - 1;
          continue;
        }
      } else {
        // In a key-value pair: try to find end of value
        quoteCloseIndex = findLastEqualsSignIndex(input, charIndex - 1); // findLastEqualsSignIndex: finds end of quoted value
        if (quoteCloseIndex === -1) {
          value = xR.trim(input.slice(currentKeyStart, charIndex));
          value = stripEnclosingCharactersIfNeeded(value); // stripEnclosingCharactersIfNeeded: custom value transform
          processPair(currentKey, value);
          currentKey = false;
          currentKeyStart = charIndex + 1;
          continue;
        } else {
          continue;
        }
      }
    }
  }

  // Handle any trailing key or key-value pair after the loop
  if (currentKeyStart < input.length) {
    if (currentKey === false) {
      processPair(input.slice(currentKeyStart));
    } else {
      processPair(currentKey, stripEnclosingCharactersIfNeeded(xR.trim(input.slice(currentKeyStart))));
    }
  }

  // Join all processed pairs with a space and trim the result
  return xR.trim(processedPairs.join(" "));
}

module.exports = parseKeyValuePairs;