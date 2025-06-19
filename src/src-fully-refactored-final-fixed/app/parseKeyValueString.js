/**
 * Parses a specially-formatted key-value string into a nested object structure.
 *
 * The input string is expected to contain key-value pairs separated by semicolons (;) or commas (,),
 * with optional whitespace and support for quoted values and escape sequences.
 *
 * Example input: 'key1=value1; key2="value2,with,comma"; key3=value3'
 *
 * @param {string} input - The key-value string to parse.
 * @returns {Object} Parsed representation as a nested object.
 * @throws {SyntaxError} If the input string is malformed.
 */
function parseKeyValueString(input) {
  // Helper: Checks if a character code is a valid identifier character (alphanumeric or underscore)
  // Ha is assumed to be a lookup table: Ha[charCode] === 1 if valid identifier character
  // addValueToKeyedArray is a helper to assign key-value pairs to an object (see dependencies)
  
  const result = Object.create(null); // Final parsed object
  let currentPair = Object.create(null); // Current key-value pair being built
  let isEscaped = false; // Tracks if inside an escape sequence
  let isInQuotes = false; // Tracks if inside quoted value
  let hasEscapeInValue = false; // Tracks if value contains escape sequences
  let currentKey = undefined; // Current key being parsed
  let currentValue = undefined; // Current value being parsed
  let keyStart = -1; // Start index of current key
  let keyEnd = -1; // End index of current key
  let valueStart = -1; // Start index of current value
  let valueEnd = -1; // End index of current value
  let index = 0; // Current position in input

  while (index < input.length) {
    const charCode = input.charCodeAt(index);
    // --- Parsing key (currentKey === undefined) ---
    if (currentKey === undefined) {
      if (keyEnd === -1 && Ha[charCode] === 1) {
        // Start of key
        if (keyStart === -1) keyStart = index;
      } else if (index !== 0 && (charCode === 32 || charCode === 9)) {
        // Whitespace after key
        if (keyEnd === -1 && keyStart !== -1) keyEnd = index;
      } else if (charCode === 59 || charCode === 44) { // ';' or ','
        // End of key-value pair (no value)
        if (keyStart === -1) throw new SyntaxError(`Unexpected character at index ${index}`);
        if (keyEnd === -1) keyEnd = index;
        const key = input.slice(keyStart, keyEnd);
        if (charCode === 44) {
          addValueToKeyedArray(result, key, currentPair);
          currentPair = Object.create(null);
        } else {
          currentKey = key;
        }
        keyStart = keyEnd = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${index}`);
      }
    // --- Parsing value (currentValue === undefined) ---
    } else if (currentValue === undefined) {
      if (valueEnd === -1 && Ha[charCode] === 1) {
        // Start of value
        if (valueStart === -1) valueStart = index;
      } else if (charCode === 32 || charCode === 9) {
        // Whitespace after value
        if (valueEnd === -1 && valueStart !== -1) valueEnd = index;
      } else if (charCode === 59 || charCode === 44) { // ';' or ','
        // End of value
        if (valueStart === -1) throw new SyntaxError(`Unexpected character at index ${index}`);
        if (valueEnd === -1) valueEnd = index;
        addValueToKeyedArray(currentPair, input.slice(valueStart, valueEnd), true);
        if (charCode === 44) {
          addValueToKeyedArray(result, currentKey, currentPair);
          currentPair = Object.create(null);
          currentKey = undefined;
        }
        valueStart = valueEnd = -1;
        currentValue = undefined;
      } else if (charCode === 61 && valueStart !== -1 && valueEnd === -1) { // '='
        // Key-value separator
        currentValue = input.slice(valueStart, index);
        valueStart = valueEnd = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${index}`);
      }
    // --- Parsing quoted value or escape sequence ---
    } else if (isEscaped) {
      // Previous character was '\', so this character is escaped
      if (Ha[charCode] !== 1) throw new SyntaxError(`Unexpected character at index ${index}`);
      if (valueStart === -1) valueStart = index;
      else if (!hasEscapeInValue) hasEscapeInValue = true;
      isEscaped = false;
    } else if (isInQuotes) {
      if (Ha[charCode] === 1) {
        // Inside quotes, valid identifier
        if (valueStart === -1) valueStart = index;
      } else if (charCode === 34 && valueStart !== -1) { // '"'
        // End of quoted value
        isInQuotes = false;
        valueEnd = index;
      } else if (charCode === 92) { // '\'
        // Start escape sequence
        isEscaped = true;
      } else {
        throw new SyntaxError(`Unexpected character at index ${index}`);
      }
    } else if (charCode === 34 && input.charCodeAt(index - 1) === 61) { // '"' after '='
      // Start quoted value
      isInQuotes = true;
    } else if (valueEnd === -1 && Ha[charCode] === 1) {
      // Start of value (unquoted)
      if (valueStart === -1) valueStart = index;
    } else if (valueStart !== -1 && (charCode === 32 || charCode === 9)) {
      // Whitespace after value
      if (valueEnd === -1) valueEnd = index;
    } else if (charCode === 59 || charCode === 44) { // ';' or ','
      // End of value
      if (valueStart === -1) throw new SyntaxError(`Unexpected character at index ${index}`);
      if (valueEnd === -1) valueEnd = index;
      let value = input.slice(valueStart, valueEnd);
      if (hasEscapeInValue) {
        value = value.replace(/\\/g, "");
        hasEscapeInValue = false;
      }
      addValueToKeyedArray(currentPair, currentValue, value);
      if (charCode === 44) {
        addValueToKeyedArray(result, currentKey, currentPair);
        currentPair = Object.create(null);
        currentKey = undefined;
      }
      currentValue = undefined;
      valueStart = valueEnd = -1;
    } else {
      throw new SyntaxError(`Unexpected character at index ${index}`);
    }
    index++;
  }

  // Final checks and flush last key/value
  if (keyStart === -1 || isInQuotes || charCode === 32 || charCode === 9) {
    throw new SyntaxError("Unexpected end of input");
  }
  if (keyEnd === -1) keyEnd = index;
  const lastKeyOrValue = input.slice(keyStart, keyEnd);
  if (currentKey === undefined) {
    addValueToKeyedArray(result, lastKeyOrValue, currentPair);
  } else {
    if (currentValue === undefined) {
      addValueToKeyedArray(currentPair, lastKeyOrValue, true);
    } else if (hasEscapeInValue) {
      addValueToKeyedArray(currentPair, currentValue, lastKeyOrValue.replace(/\\/g, ""));
    } else {
      addValueToKeyedArray(currentPair, currentValue, lastKeyOrValue);
    }
    addValueToKeyedArray(result, currentKey, currentPair);
  }
  return result;
}

module.exports = parseKeyValueString;