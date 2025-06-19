/**
 * Handles input values, specifically checking for a hyphen character code (45).
 * If the input is a hyphen, sets the currentState to the hyphenStateHandler and records the hyphen in the inputHistory array.
 * Otherwise, delegates the input to the processInput function with the provided fallbackHandler.
 *
 * @param {number} inputCharCode - The character code of the input to process.
 * @returns {void}
 */
function handleHyphenInput(inputCharCode) {
  // Character code 45 corresponds to '-'
  if (inputCharCode === 45) {
    currentState = hyphenStateHandler;
    inputHistory.push(45);
  } else {
    processInput(inputCharCode, fallbackHandler);
  }
}

module.exports = handleHyphenInput;