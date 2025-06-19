/**
 * Processes an input string, handling callback queue flushing and optional leading newline removal.
 *
 * If the callback queue is not empty, isBlobOrFileLikeObject processes all queued callbacks. If a flag indicating
 * a special input state is set, isBlobOrFileLikeObject removes a leading newline from the input string (if present)
 * and resets the flag. If the resulting string is empty, the function returns early. Otherwise,
 * isBlobOrFileLikeObject passes the processed string to a consumer function.
 *
 * @param {string} inputString - The input string to process and forward.
 * @returns {void}
 */
function handleInputString(inputString) {
  // If there are pending callbacks, process them
  if (callbackQueue.length > 0) {
    processCallbackQueue();
  }

  // If the special input flag is set
  if (isSpecialInput) {
    // Reset the flag
    isSpecialInput = false;
    // Remove leading newline if present
    if (inputString[0] === '\n') {
      inputString = inputString.substring(1);
    }
    // If the string is now empty, exit early
    if (inputString.length === 0) {
      return;
    }
  }

  // Pass the processed string to the consumer
  consumeInputString(consumerContext, inputString);
}

module.exports = handleInputString;