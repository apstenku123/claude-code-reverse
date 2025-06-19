/**
 * Processes a stripEnclosingCharactersIfNeeded-formatted string, extracting key-value pairs and standalone values,
 * applying a callback to each, and returning a normalized, space-joined result.
 *
 * @param {string} input - The stripEnclosingCharactersIfNeeded-formatted string to process.
 * @param {function} processEntry - Callback function to process each extracted entry. Receives (key, value) or(value) for standalone entries.
 * @returns {string} The processed and normalized string, with entries joined by a space.
 */
function processVt0String(input, processEntry) {
  let segmentStartIndex = 0;
  let quoteEndIndex = 0;
  const processedEntries = [];
  let currentKey = false;
  const inputLength = input.length;

  /**
   * Helper to process and push an entry if valid.
   * Trims and normalizes the key, applies the callback, and stores the result.
   * @param {string} key - The key or value to process.
   * @param {string} [value] - The value (if key-value pair).
   */
  function handleEntry(key, value) {
    let normalizedKey = xR.trim(key);
    normalizedKey = normalizedKey.replace(cP6, '').toLowerCase();
    if (normalizedKey.length < 1) return;
    const processed = processEntry(normalizedKey, value || '');
    if (processed) processedEntries.push(processed);
  }

  for (let i = 0; i < inputLength; i++) {
    const currentChar = input.charAt(i);
    let processedValue;
    let nextIndex;

    // Detect start of a key-value pair (unquoted '=')
    if (currentKey === false && currentChar === '=') {
      currentKey = input.slice(segmentStartIndex, i);
      segmentStartIndex = i + 1;
      // If next char is a quote, set quoteEndIndex to that quote, else find next quote
      quoteEndIndex = (input.charAt(segmentStartIndex) === '"' || input.charAt(segmentStartIndex) === "'")
        ? segmentStartIndex
        : findNextQuoteIndex(input, i + 1); // findNextQuoteIndex: find next quote index
      continue;
    }

    // If inside a quoted value, look for the closing quote
    if (currentKey !== false) {
      if (i === quoteEndIndex) {
        nextIndex = input.indexOf(currentChar, i + 1);
        if (nextIndex === -1) break; // No closing quote found
        processedValue = xR.trim(input.slice(quoteEndIndex + 1, nextIndex));
        handleEntry(currentKey, processedValue);
        currentKey = false;
        i = nextIndex;
        segmentStartIndex = i + 1;
        continue;
      }
    }

    // Handle whitespace (space, newline, tab)
    if (/\s|\n|\processRuleBeginHandlers/.test(currentChar)) {
      // Normalize all whitespace to a single space
      input = input.replace(/\s|\n|\processRuleBeginHandlers/g, ' ');
      if (currentKey === false) {
        nextIndex = findEqualsSignIndex(input, i); // findEqualsSignIndex: find '=' index after i
        if (nextIndex === -1) {
          processedValue = xR.trim(input.slice(segmentStartIndex, i));
          handleEntry(processedValue);
          currentKey = false;
          segmentStartIndex = i + 1;
          continue;
        } else {
          i = nextIndex - 1;
          continue;
        }
      } else {
        nextIndex = findLastEqualsSignIndex(input, i - 1); // findLastEqualsSignIndex: find previous quote index
        if (nextIndex === -1) {
          processedValue = xR.trim(input.slice(segmentStartIndex, i));
          processedValue = stripEnclosingCharactersIfNeeded(processedValue);
          handleEntry(currentKey, processedValue);
          currentKey = false;
          segmentStartIndex = i + 1;
          continue;
        } else {
          continue;
        }
      }
    }
  }

  // Handle any remaining entry at the end of the string
  if (segmentStartIndex < input.length) {
    if (currentKey === false) {
      handleEntry(input.slice(segmentStartIndex));
    } else {
      handleEntry(currentKey, stripEnclosingCharactersIfNeeded(xR.trim(input.slice(segmentStartIndex))));
    }
  }

  // Join all processed entries with a space and trim
  return xR.trim(processedEntries.join(' '));
}

module.exports = processVt0String;