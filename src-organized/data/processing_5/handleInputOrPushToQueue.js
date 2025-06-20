/**
 * Handles a specific input value by either triggering a reset and updating a global state,
 * or by pushing a default value to a processing queue and delegating further handling.
 *
 * @param {number} inputValue - The input value to process.
 * @returns {void}
 */
function handleInputOrPushToQueue(inputValue) {
  // If the input value is 47, trigger a reset and update the global state
  if (inputValue === 47) {
    triggerReset();
    globalState = stateAfterReset;
  } else {
    // Otherwise, push 60 to the processing queue and delegate further handling
    processingQueue.push(60);
    delegateInputHandling(inputValue, auxiliaryHandler);
  }
}

module.exports = handleInputOrPushToQueue;