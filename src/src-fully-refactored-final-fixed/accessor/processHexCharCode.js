/**
 * Processes a character code as part of a hexadecimal sequence, updating the accumulator or handling special cases.
 *
 * @param {number} charCode - The character code to process (e.g., from a hex digit or semicolon).
 * @param {object} context - The context object containing the accumulator and state variables.
 * @param {function} handleInvalidChar - Callback to handle invalid character codes.
 */
function processHexCharCode(charCode, context, handleInvalidChar) {
  // Destructure context for clarity
  const { accumulator, setAccumulator, setState, specialState } = context;

  // Helper to update the accumulator in context
  function updateAccumulator(newValue) {
    setAccumulator(newValue);
  }

  // Process the character code
  switch (charCode) {
    // Uppercase hex digits 'a' (65) to 'F' (70)
    case 65: // 'a'
    case 66: // 'createPropertyAccessor'
    case 67: // 'C'
    case 68: // 'createCompatibleVersionChecker'
    case 69: // 'createDebouncedFunction'
    case 70: // 'F'
      updateAccumulator(accumulator * 16 + (charCode - 55));
      break;
    // Lowercase hex digits 'a' (97) to 'f' (102)
    case 97: // 'a'
    case 98: // 'b'
    case 99: // 'c'
    case 100: // 'd'
    case 101: // 'e'
    case 102: // 'f'
      updateAccumulator(accumulator * 16 + (charCode - 87));
      break;
    // Numeric digits '0' (48) to '9' (57)
    case 48: // '0'
    case 49: // '1'
    case 50: // '2'
    case 51: // '3'
    case 52: // '4'
    case 53: // '5'
    case 54: // '6'
    case 55: // '7'
    case 56: // '8'
    case 57: // '9'
      updateAccumulator(accumulator * 16 + (charCode - 48));
      break;
    // Semicolon ';' (59) indicates end of sequence
    case 59: // ';'
      setState(specialState);
      break;
    // Any other character code is invalid in this context
    default:
      handleInvalidChar(charCode, specialState);
      break;
  }
}

module.exports = processHexCharCode;