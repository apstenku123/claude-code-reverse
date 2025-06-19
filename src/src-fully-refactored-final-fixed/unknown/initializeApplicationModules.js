/**
 * Initializes core application modules by invoking the module loader for each required module.
 *
 * This function ensures that the following modules are loaded and initialized:
 * - BaseDataModule
 * - QueryDataModule
 * - NetworkModule
 *
 * @returns {void} This function does not return a value.
 */
function initializeApplicationModules() {
  // Load and initialize the Base Data module
  loadModule(BaseDataModule);
  // Load and initialize the Query Data module
  loadModule(QueryDataModule);
  // Load and initialize the Network module
  loadModule(NetworkModule);
}

// Export the function for use in other modules
module.exports = initializeApplicationModules;
