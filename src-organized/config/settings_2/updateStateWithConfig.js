/**
 * Updates the global state variables based on the provided source and configuration.
 *
 * @param {any} source - The source object or value to process.
 * @param {any} config - The configuration object or value to apply.
 * @returns {void}
 *
 * This function calls the processSourceWithConfig function with the provided source and config,
 * then updates the globalState, previousState, and currentState variables accordingly.
 */
function updateStateWithConfig(source, config) {
  // Process the source and config (side effects may occur)
  processSourceWithConfig(source, config);

  // Update global state variables
  globalState = globalStateSnapshot;
  previousState = currentState;
  currentState = nextState;
}

module.exports = updateStateWithConfig;