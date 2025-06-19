/**
 * Converts a JavaScript value to a JSON string and appends a newline character. 
 *
 * @param {any} value - The value to be stringified to JSON.
 * @returns {string} The JSON string representation of the value, followed by a newline character.
 */
function stringifyWithNewline(value) {
  // Convert the value to a JSON string and append a newline character
  return JSON.stringify(value) + '\n';
}

module.exports = stringifyWithNewline;