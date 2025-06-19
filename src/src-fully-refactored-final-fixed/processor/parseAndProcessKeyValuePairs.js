/**
 * Parses a string of key-value pairs and processes each pair using a provided callback.
 * Handles quoted values, trims whitespace, and supports custom processing for each pair.
 *
 * @param {string} inputString - The string containing key-value pairs to parse.
 * @param {function} processPairCallback - Callback function to process each key or key-value pair.
 *        Should accept (key, value) and return a processed result (or falsy to skip).
 * @returns {string} The processed and concatenated result of all key-value pairs, trimmed.
 */
function parseAndProcessKeyValuePairs(inputString, processPairCallback) {
  let segmentStartIndex = 0; // Start index of the current segment
  let quoteEndIndex = 0;     // End index of a quoted value
  const processedPairs = []; // Accumulates processed key-value pairs
  let currentKey = false;    // Holds the current key being parsed (false if not in key-value context)
  const inputLength = inputString.length;

  /**
   * Helper to process a key or key-value pair using the callback, after trimming and cleaning.
   * @param {string} key - The key to process.
   * @param {string} [value] - The value to process (optional).
   */
  function processPair(key, value) {
    key = xR.trim(key);
    key = key.replace(cP6, "").toLowerCase();
    if (key.length < 1) return;
    const result = processPairCallback(key, value || "");
    if (result) processedPairs.push(result);
  }

  for (let charIndex = 0; charIndex < inputLength; charIndex++) {
    const currentChar = inputString.charAt(charIndex);
    let value, nextIndex;

    // Detect start of key-value pair (key=...)
    if (currentKey === false && currentChar === "=") {
      currentKey = inputString.slice(segmentStartIndex, charIndex);
      segmentStartIndex = charIndex + 1;
      // If next char is a quote, set quoteEndIndex to that position, else find next quote
      quoteEndIndex = (inputString.charAt(segmentStartIndex) === '"' || inputString.charAt(segmentStartIndex) === "'")
        ? segmentStartIndex
        : findNextQuoteIndex(inputString, charIndex + 1);
      continue;
    }

    // If inside a quoted value, look for the closing quote
    if (currentKey !== false) {
      if (charIndex === quoteEndIndex) {
        nextIndex = inputString.indexOf(currentChar, charIndex + 1);
        if (nextIndex === -1) break; // No closing quote found, stop parsing
        value = xR.trim(inputString.slice(quoteEndIndex + 1, nextIndex));
        processPair(currentKey, value);
        currentKey = false;
        charIndex = nextIndex;
        segmentStartIndex = charIndex + 1;
        continue;
      }
    }

    // Handle whitespace, newlines, or tabs
    if (/\s|\n|\processRuleBeginHandlers/.test(currentChar)) {
      // Normalize all whitespace to a single space
      inputString = inputString.replace(/\s|\n|\processRuleBeginHandlers/g, " ");
      if (currentKey === false) {
        nextIndex = findEqualsSignIndex(inputString, charIndex);
        if (nextIndex === -1) {
          value = xR.trim(inputString.slice(segmentStartIndex, charIndex));
          processPair(value);
          currentKey = false;
          segmentStartIndex = charIndex + 1;
          continue;
        } else {
          charIndex = nextIndex - 1;
          continue;
        }
      } else {
        nextIndex = findLastEqualsSignIndex(inputString, charIndex - 1);
        if (nextIndex === -1) {
          value = xR.trim(inputString.slice(segmentStartIndex, charIndex));
          value = stripEnclosingCharactersIfNeeded(value);
          processPair(currentKey, value);
          currentKey = false;
          segmentStartIndex = charIndex + 1;
          continue;
        } else {
          continue;
        }
      }
    }
  }

  // Handle any trailing segment after the loop
  if (segmentStartIndex < inputString.length) {
    if (currentKey === false) {
      processPair(inputString.slice(segmentStartIndex));
    } else {
      processPair(currentKey, stripEnclosingCharactersIfNeeded(xR.trim(inputString.slice(segmentStartIndex))));
    }
  }

  return xR.trim(processedPairs.join(" "));
}

module.exports = parseAndProcessKeyValuePairs;