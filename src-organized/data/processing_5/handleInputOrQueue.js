/**
 * Handles a specific input value by either triggering a reset and updating a global state,
 * or by queuing the input for further processing.
 *
 * @param {number} inputValue - The input value to be processed.
 * @returns {void}
 */
function handleInputOrQueue(inputValue) {
  // If the input value is 47 (e.g., representing '/'), perform a reset and update the parser state
  if (inputValue === 47) {
    performReset(); // External function to reset state
    parserState = parserStateAfterReset; // Update global parser state
  } else {
    // Otherwise, queue the input (60 could represent '<') for further processing
    inputQueue.push(60);
    processInput(inputValue, inputHandler);
  }
}

module.exports = handleInputOrQueue;