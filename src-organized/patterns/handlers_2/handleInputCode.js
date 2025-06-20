/**
 * Handles an input code by updating the current state and output buffer accordingly.
 *
 * Depending on the input code, this function sets the global state variable and pushes appropriate values to the output buffer.
 *
 * @param {number} inputCode - The input code to process. Expected values: 45, 60, 0, -1, or any other number.
 * @returns {void}
 */
function handleInputCode(inputCode) {
  switch (inputCode) {
    case 45:
      // Hyphen-minus character: set state to hyphen handler and record the code
      currentState = hyphenState;
      outputBuffer.push(45);
      break;
    case 60:
      // Less-than sign: set state to tag open handler and record the code
      currentState = tagOpenState;
      outputBuffer.push(60);
      break;
    case 0:
      // Null character: set state to null handler and push replacement character
      currentState = nullState;
      outputBuffer.push(65533); // Unicode replacement character
      break;
    case -1:
      // End of input: call end-of-input handler
      handleEndOfInput();
      break;
    default:
      // Any other character: set state to null handler and record the code
      currentState = nullState;
      outputBuffer.push(inputCode);
      break;
  }
}

module.exports = handleInputCode;