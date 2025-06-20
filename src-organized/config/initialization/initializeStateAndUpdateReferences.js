/**
 * Initializes state and updates global references based on the provided source and configuration.
 *
 * @param {Object} sourceObject - The source object to initialize or update.
 * @param {Object} configObject - The configuration object used for initialization.
 * @returns {void}
 */
function initializeStateAndUpdateReferences(sourceObject, configObject) {
  // Perform initialization or update using the provided source and configuration
  performInitialization(sourceObject, configObject);

  // Update global reference to the current state
  globalStateReference = globalStateSnapshot;

  // Update previous reference to the current reference
  previousReference = currentReference;

  // Set the current reference to the new reference
  currentReference = nextReference;
}

module.exports = initializeStateAndUpdateReferences;