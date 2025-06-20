/**
 * Processes the input string by handling any pending accessor stack, managing a flag for initial input,
 * and forwarding the cleaned string to a callback handler.
 *
 * @param {string} inputString - The string to process and forward.
 * @returns {void}
 */
function processInputString(inputString) {
  // If there are pending items in the accessor stack, process them first
  if (accessorStack.length > 0) {
    processAccessorStack();
  }

  // If the initialInputFlag is set, handle initial input logic
  if (initialInputFlag) {
    // Reset the flag so this logic only runs once
    initialInputFlag = false;
    // Remove leading newline if present
    if (inputString[0] === '\n') {
      inputString = inputString.substring(1);
    }
    // If the string is now empty, do not proceed further
    if (inputString.length === 0) {
      return;
    }
  }

  // Forward the processed string to the callback handler
  callbackHandler(callbackContext, inputString);
}

module.exports = processInputString;