/**
 * Parses a semicolon- or comma-separated key-value list string into a nested object structure.
 * Handles quoted values, escaped characters, and whitespace. Throws on malformed input.
 *
 * Example input: 'key1=value1; key2="value2,with,comma"; key3=value3'
 *
 * @param {string} input - The string to parse, containing key-value pairs.
 * @returns {Object} Parsed object mapping keys to values or nested objects.
 * @throws {SyntaxError} If the input is malformed.
 */
function parseKeyValueList(input) {
  const result = Object.create(null); // Final output object
  let currentEntry = Object.create(null); // Current key-value group being built
  let isEscaped = false; // Tracks if inside an escape sequence
  let insideQuotedValue = false; // Tracks if inside quoted value
  let foundEscapeInValue = false; // Tracks if a value had an escape
  let currentKey = undefined; // Current key being parsed
  let currentValue = undefined; // Current value being parsed
  let keyStart = -1; // Start index of a key or value
  let keyEnd = -1; // End index of a key or value
  let valueStart = -1; // Start index of a value
  let i = 0;

  // Ha is assumed to be a lookup table: Ha[charCode] === 1 means valid identifier char
  // addValueToKeyedArray is assumed to be a function to assign key-value pairs to objects
  // Both must be available in the module scope

  for (; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    // PHASE 1: Parsing key (currentKey is undefined)
    if (currentKey === undefined) {
      if (keyEnd === -1 && Ha[charCode] === 1) {
        // Start of a key
        if (keyStart === -1) keyStart = i;
      } else if (i !== 0 && (charCode === 32 || charCode === 9)) {
        // Whitespace after key
        if (keyEnd === -1 && keyStart !== -1) keyEnd = i;
      } else if (charCode === 59 || charCode === 44) {
        // Semicolon or comma: end of entry
        if (keyStart === -1) throw new SyntaxError(`Unexpected character at index ${i}`);
        if (keyEnd === -1) keyEnd = i;
        const key = input.slice(keyStart, keyEnd);
        if (charCode === 44) {
          addValueToKeyedArray(result, key, currentEntry);
          currentEntry = Object.create(null);
        } else {
          currentKey = key;
        }
        keyStart = keyEnd = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    }
    // PHASE 2: Parsing value (currentKey defined, currentValue undefined)
    else if (currentValue === undefined) {
      if (keyEnd === -1 && Ha[charCode] === 1) {
        // Start of a value
        if (keyStart === -1) keyStart = i;
      } else if (charCode === 32 || charCode === 9) {
        // Whitespace after value
        if (keyEnd === -1 && keyStart !== -1) keyEnd = i;
      } else if (charCode === 59 || charCode === 44) {
        // End of value
        if (keyStart === -1) throw new SyntaxError(`Unexpected character at index ${i}`);
        if (keyEnd === -1) keyEnd = i;
        addValueToKeyedArray(currentEntry, input.slice(keyStart, keyEnd), true);
        if (charCode === 44) {
          addValueToKeyedArray(result, currentKey, currentEntry);
          currentEntry = Object.create(null);
          currentKey = undefined;
        }
        keyStart = keyEnd = -1;
      } else if (charCode === 61 && keyStart !== -1 && keyEnd === -1) {
        // Equals sign: start of value
        currentValue = input.slice(keyStart, i);
        keyStart = keyEnd = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    }
    // PHASE 3: Parsing quoted value or escape sequences
    else if (isEscaped) {
      // Previous character was a backslash
      if (Ha[charCode] !== 1) throw new SyntaxError(`Unexpected character at index ${i}`);
      if (keyStart === -1) keyStart = i;
      else if (!foundEscapeInValue) foundEscapeInValue = true;
      isEscaped = false;
    } else if (insideQuotedValue) {
      if (Ha[charCode] === 1) {
        // Continue quoted value
        if (keyStart === -1) keyStart = i;
      } else if (charCode === 34 && keyStart !== -1) {
        // End of quoted value
        insideQuotedValue = false;
        keyEnd = i;
      } else if (charCode === 92) {
        // Escape inside quoted value
        isEscaped = true;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else if (charCode === 34 && input.charCodeAt(i - 1) === 61) {
      // Start of quoted value after equals
      insideQuotedValue = true;
    } else if (keyEnd === -1 && Ha[charCode] === 1) {
      // Start of unquoted value
      if (keyStart === -1) keyStart = i;
    } else if (keyStart !== -1 && (charCode === 32 || charCode === 9)) {
      // Whitespace after value
      if (keyEnd === -1) keyEnd = i;
    } else if (charCode === 59 || charCode === 44) {
      // End of value
      if (keyStart === -1) throw new SyntaxError(`Unexpected character at index ${i}`);
      if (keyEnd === -1) keyEnd = i;
      let value = input.slice(keyStart, keyEnd);
      if (foundEscapeInValue) {
        value = value.replace(/\\/g, "");
        foundEscapeInValue = false;
      }
      addValueToKeyedArray(currentEntry, currentValue, value);
      if (charCode === 44) {
        addValueToKeyedArray(result, currentKey, currentEntry);
        currentEntry = Object.create(null);
        currentKey = undefined;
      }
      currentValue = undefined;
      keyStart = keyEnd = -1;
    } else {
      throw new SyntaxError(`Unexpected character at index ${i}`);
    }
  }

  // Final checks and flush last entry
  if (keyStart === -1 || insideQuotedValue || input.charCodeAt(i - 1) === 32 || input.charCodeAt(i - 1) === 9) {
    throw new SyntaxError("Unexpected end of input");
  }
  if (keyEnd === -1) keyEnd = i;
  const lastToken = input.slice(keyStart, keyEnd);
  if (currentKey === undefined) {
    addValueToKeyedArray(result, lastToken, currentEntry);
  } else {
    if (currentValue === undefined) {
      addValueToKeyedArray(currentEntry, lastToken, true);
    } else if (foundEscapeInValue) {
      addValueToKeyedArray(currentEntry, currentValue, lastToken.replace(/\\/g, ""));
    } else {
      addValueToKeyedArray(currentEntry, currentValue, lastToken);
    }
    addValueToKeyedArray(result, currentKey, currentEntry);
  }
  return result;
}

module.exports = parseKeyValueList;