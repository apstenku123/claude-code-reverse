/**
 * Parses a specially formatted string into an array of key-value pairs.
 * The string format supports nested parentheses, quoted strings (single and double),
 * and escaped quotes. Each key-value pair is separated by a colon (:) and terminated by a semicolon (;).
 *
 * Example input: "key1: value1; key2: 'value: with colon'; key3: (nested(value));"
 *
 * @param {string} input - The input string containing key-value pairs.
 * @returns {Array<string>} An array alternating between keys and values, e.g. [key1, value1, key2, value2, ...]
 */
function parseKeyValuePairs(input) {
  const keyValuePairs = [];
  let parenDepth = 0; // Tracks nesting level of parentheses
  let quoteChar = 0; // Tracks current quote context (0 = none, 39 = single, 34 = double)
  let currentIndex = 0; // Current index in the input string
  let keyStartIndex = 0; // Start index of the current key or value
  let valueStartIndex = 0; // Start index of the current value
  let currentKey = null; // Holds the current key being parsed

  while (currentIndex < input.length) {
    const charCode = input.charCodeAt(currentIndex++);
    switch (charCode) {
      case 40: // '('
        parenDepth++;
        break;
      case 41: // ')'
        parenDepth--;
        break;
      case 39: // "'"
        // Toggle single quote context if not escaped
        if (quoteChar === 0) {
          quoteChar = 39;
        } else if (quoteChar === 39 && input.charCodeAt(currentIndex - 1) !== 92) {
          quoteChar = 0;
        }
        break;
      case 34: // '"'
        // Toggle double quote context if not escaped
        if (quoteChar === 0) {
          quoteChar = 34;
        } else if (quoteChar === 34 && input.charCodeAt(currentIndex - 1) !== 92) {
          quoteChar = 0;
        }
        break;
      case 58: // ':'
        // Only treat as key-value separator if not inside parentheses or quotes, and key not already set
        if (!currentKey && parenDepth === 0 && quoteChar === 0) {
          // RM2 is assumed to process the key string (e.g., trim, normalize, etc.)
          currentKey = RM2(input.substring(keyStartIndex, currentIndex - 1).trim());
          valueStartIndex = currentIndex;
        }
        break;
      case 59: // ';'
        // Only treat as end of key-value pair if not inside parentheses or quotes, and key is set
        if (currentKey && valueStartIndex > 0 && parenDepth === 0 && quoteChar === 0) {
          const value = input.substring(valueStartIndex, currentIndex - 1).trim();
          keyValuePairs.push(currentKey, value);
          keyStartIndex = currentIndex;
          valueStartIndex = 0;
          currentKey = null;
        }
        break;
    }
  }

  // Handle the last key-value pair if the string does not end with a semicolon
  if (currentKey && valueStartIndex) {
    const value = input.slice(valueStartIndex).trim();
    keyValuePairs.push(currentKey, value);
  }

  return keyValuePairs;
}

module.exports = parseKeyValuePairs;