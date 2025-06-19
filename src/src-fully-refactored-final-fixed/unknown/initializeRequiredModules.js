/**
 * Initializes all required modules by invoking the module loader function for each dependency.
 *
 * This function ensures that the following modules are loaded and initialized:
 * - baseDependency
 * - queryDependency
 * - networkDependency
 *
 * @returns {void} This function does not return a value.
 */
function initializeRequiredModules() {
  // Load and initialize the base dependency module
  restoreCurrentFromResourceArray(baseDependency);
  // Load and initialize the query dependency module
  restoreCurrentFromResourceArray(queryDependency);
  // Load and initialize the network dependency module
  restoreCurrentFromResourceArray(networkDependency);
}

// Export the function for use in other modules
module.exports = initializeRequiredModules;