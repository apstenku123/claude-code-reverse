/**
 * Parses a single character code as part of a hexadecimal sequence and updates the accumulator or handles special cases.
 *
 * @param {number} charCode - The character code to parse (e.g., from String.charCodeAt()).
 * @param {object} context - The parsing context containing the accumulator and state.
 * @param {function} handleError - Callback to handle invalid character codes.
 * @param {*} endState - The state to set when a semicolon is encountered.
 */
function parseHexCharCode(charCode, context, handleError, endState) {
  // Hexadecimal a-F(uppercase)
  if (charCode >= 65 && charCode <= 70) {
    context.accumulator *= 16;
    context.accumulator += charCode - 55; // 'a' (65) - 55 = 10
    return;
  }
  // Hexadecimal a-f(lowercase)
  if (charCode >= 97 && charCode <= 102) {
    context.accumulator *= 16;
    context.accumulator += charCode - 87; // 'a' (97) - 87 = 10
    return;
  }
  // Digits 0-9
  if (charCode >= 48 && charCode <= 57) {
    context.accumulator *= 16;
    context.accumulator += charCode - 48; // '0' (48) - 48 = 0
    return;
  }
  // Semicolon (end of entity)
  if (charCode === 59) { // ';'
    context.state = endState;
    return;
  }
  // Any other character is invalid in this context
  handleError(charCode, endState);
}

module.exports = parseHexCharCode;