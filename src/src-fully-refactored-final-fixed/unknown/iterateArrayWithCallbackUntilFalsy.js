/**
 * Iterates over an array from right to left, repeatedly applying a callback function until the callback returns a falsy value.
 * The iteration starts with the result of iterateRightUntilFalse and continues by passing the result to getNextIterationStep (O9).
 *
 * @returns {void} This function does not return a value.
 */
function iterateArrayWithCallbackUntilFalsy() {
  // Start by getting the initial iteration state from iterateRightUntilFalse
  let currentIterationState = iterateRightUntilFalse;
  // Continue iterating as long as the state is truthy
  while (currentIterationState) {
    // Get the next iteration state using getNextIterationStep
    currentIterationState = getNextIterationStep(currentIterationState);
  }
}

module.exports = iterateArrayWithCallbackUntilFalsy;