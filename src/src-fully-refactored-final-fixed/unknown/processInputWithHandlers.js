/**
 * Processes the provided input using predefined handler functions.
 *
 * This function delegates the processing of the input value to the `handleInteractionCleanup` handler,
 * passing along two additional handler/configuration objects: `AZ` and `R7`.
 * The exact processing logic depends on the implementation of `handleInteractionCleanup`.
 *
 * @param {any} inputValue - The input value to be processed by the handlers.
 * @returns {void} This function does not return a value.
 */
function processInputWithHandlers(inputValue) {
  // Delegate processing to the external handler function handleInteractionCleanup
  handleInteractionCleanup(inputValue, AZ, R7);
}

module.exports = processInputWithHandlers;