/**
 * Parses a string containing key-value pairs separated by semicolons or commas, supporting quoted values and escape sequences.
 * Throws a SyntaxError if the input is malformed.
 *
 * @param {string} input - The string to parse, e.g. "key1=value1; key2=\"value2\"; key3=value3"
 * @returns {Object} An object mapping keys to values or sub-objects (for grouped values)
 */
function parseKeyValuePairs(input) {
  const result = Object.create(null); // Final parsed result
  let currentGroup = Object.create(null); // Current group of key-value pairs
  let isEscaped = false; // True if previous char was a backslash in a quoted value
  let inQuotedValue = false; // True if currently parsing inside quotes
  let hasEscapeInValue = false; // True if a value contains an escape
  let keyStart = -1; // Start index of a key or value
  let keyEnd = -1; // End index of a key or value
  let groupKey = undefined; // Key for the current group
  let currentKey = undefined; // Current key being parsed
  let charCode = 0; // Current character code
  let i = 0; // Current index in input

  // Helper: is this char a valid identifier character? (Ha is assumed to be a lookup table)
  // Ha[charCode] === 1 means valid identifier char
  // For this refactor, handleMissingDoctypeError assume Ha is defined elsewhere
  // Helper: add a key-value pair to an object (addValueToKeyedArray is assumed to be a helper function)
  // addValueToKeyedArray(obj, key, value)

  for (; i < input.length; i++) {
    charCode = input.charCodeAt(i);

    // --- Parsing group key (before first '=') ---
    if (groupKey === undefined) {
      if (keyEnd === -1 && Ha[charCode] === 1) {
        // Start of a key
        if (keyStart === -1) keyStart = i;
      } else if (i !== 0 && (charCode === 32 || charCode === 9)) {
        // Whitespace after key
        if (keyEnd === -1 && keyStart !== -1) keyEnd = i;
      } else if (charCode === 59 || charCode === 44) {
        // Semicolon or comma: end of group key
        if (keyStart === -1) throw new SyntaxError(`Unexpected character at index ${i}`);
        if (keyEnd === -1) keyEnd = i;
        const groupKeyCandidate = input.slice(keyStart, keyEnd);
        if (charCode === 44) {
          addValueToKeyedArray(result, groupKeyCandidate, currentGroup);
          currentGroup = Object.create(null);
        } else {
          groupKey = groupKeyCandidate;
        }
        keyStart = keyEnd = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    }
    // --- Parsing key (before '=') ---
    else if (currentKey === undefined) {
      if (keyEnd === -1 && Ha[charCode] === 1) {
        // Start of a key
        if (keyStart === -1) keyStart = i;
      } else if (charCode === 32 || charCode === 9) {
        // Whitespace after key
        if (keyEnd === -1 && keyStart !== -1) keyEnd = i;
      } else if (charCode === 59 || charCode === 44) {
        // Semicolon or comma: end of key
        if (keyStart === -1) throw new SyntaxError(`Unexpected character at index ${i}`);
        if (keyEnd === -1) keyEnd = i;
        addValueToKeyedArray(currentGroup, input.slice(keyStart, keyEnd), true);
        if (charCode === 44) {
          addValueToKeyedArray(result, groupKey, currentGroup);
          currentGroup = Object.create(null);
          groupKey = undefined;
        }
        keyStart = keyEnd = -1;
      } else if (charCode === 61 && keyStart !== -1 && keyEnd === -1) {
        // Equals sign: end of key, start of value
        currentKey = input.slice(keyStart, i);
        keyStart = keyEnd = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    }
    // --- Parsing quoted value ---
    else if (isEscaped) {
      // Previous char was a backslash in a quoted value
      if (Ha[charCode] !== 1) throw new SyntaxError(`Unexpected character at index ${i}`);
      if (keyStart === -1) keyStart = i;
      else if (!hasEscapeInValue) hasEscapeInValue = true;
      isEscaped = false;
    } else if (inQuotedValue) {
      if (Ha[charCode] === 1) {
        // Valid identifier char inside quotes
        if (keyStart === -1) keyStart = i;
      } else if (charCode === 34 && keyStart !== -1) {
        // Closing quote
        inQuotedValue = false;
        keyEnd = i;
      } else if (charCode === 92) {
        // Backslash (escape)
        isEscaped = true;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    }
    // --- Start of quoted value ---
    else if (charCode === 34 && input.charCodeAt(i - 1) === 61) {
      inQuotedValue = true;
    }
    // --- Parsing value (unquoted) ---
    else if (keyEnd === -1 && Ha[charCode] === 1) {
      if (keyStart === -1) keyStart = i;
    } else if (keyStart !== -1 && (charCode === 32 || charCode === 9)) {
      if (keyEnd === -1) keyEnd = i;
    } else if (charCode === 59 || charCode === 44) {
      if (keyStart === -1) throw new SyntaxError(`Unexpected character at index ${i}`);
      if (keyEnd === -1) keyEnd = i;
      let value = input.slice(keyStart, keyEnd);
      if (hasEscapeInValue) {
        value = value.replace(/\\/g, "");
        hasEscapeInValue = false;
      }
      addValueToKeyedArray(currentGroup, currentKey, value);
      if (charCode === 44) {
        addValueToKeyedArray(result, groupKey, currentGroup);
        currentGroup = Object.create(null);
        groupKey = undefined;
      }
      currentKey = undefined;
      keyStart = keyEnd = -1;
    } else {
      throw new SyntaxError(`Unexpected character at index ${i}`);
    }
  }

  // Final checks and flush last value/group
  if (keyStart === -1 || inQuotedValue || charCode === 32 || charCode === 9) {
    throw new SyntaxError("Unexpected end of input");
  }
  if (keyEnd === -1) keyEnd = i;
  const lastValue = input.slice(keyStart, keyEnd);
  if (groupKey === undefined) {
    addValueToKeyedArray(result, lastValue, currentGroup);
  } else {
    if (currentKey === undefined) {
      addValueToKeyedArray(currentGroup, lastValue, true);
    } else if (hasEscapeInValue) {
      addValueToKeyedArray(currentGroup, currentKey, lastValue.replace(/\\/g, ""));
    } else {
      addValueToKeyedArray(currentGroup, currentKey, lastValue);
    }
    addValueToKeyedArray(result, groupKey, currentGroup);
  }
  return result;
}

module.exports = parseKeyValuePairs;