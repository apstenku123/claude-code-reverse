/**
 * Parses a quoted string from the given input, handling escape sequences.
 *
 * @param {string} input - The source string to parse from.
 * @param {{ position: number }} cursor - An object with a 'position' property indicating the current index in the input string. This will be mutated as the function parses.
 * @param {boolean} [returnValueOnly=false] - If true, returns only the parsed string value. If false, returns the full quoted substring (including quotes and escapes).
 * @returns {string} The parsed quoted string value or the full quoted substring, depending on returnValueOnly.
 */
function parseQuotedString(input, cursor, returnValueOnly) {
  const startPosition = cursor.position;
  let parsedValue = "";

  // Ensure the current character is a starting quote
  assert(input[cursor.position] === '"');
  cursor.position++;

  while (true) {
    // Append all characters up to the next quote or backslash
    parsedValue += readUntil(char => char !== '"' && char !== '\\', input, cursor);

    // If handleMissingDoctypeError'removeTrailingCharacters reached the end of the input, break
    if (cursor.position >= input.length) {
      break;
    }

    const currentChar = input[cursor.position];
    cursor.position++;

    if (currentChar === '\\') {
      // Handle escape sequence
      if (cursor.position >= input.length) {
        parsedValue += '\\'; // Add the trailing backslash
        break;
      }
      parsedValue += input[cursor.position];
      cursor.position++;
    } else {
      // Should be a closing quote
      assert(currentChar === '"');
      break;
    }
  }

  if (returnValueOnly) {
    return parsedValue;
  }
  // Return the full quoted substring (including quotes and escapes)
  return input.slice(startPosition, cursor.position);
}

// Helper function: Asserts a condition, throws if false
function assert(condition) {
  if (!condition) {
    throw new Error('Assertion failed');
  }
}

// Helper function: Reads characters from input while predicate is true, advances cursor
function readUntil(predicate, input, cursor) {
  let result = '';
  while (cursor.position < input.length && predicate(input[cursor.position])) {
    result += input[cursor.position];
    cursor.position++;
  }
  return result;
}

module.exports = parseQuotedString;