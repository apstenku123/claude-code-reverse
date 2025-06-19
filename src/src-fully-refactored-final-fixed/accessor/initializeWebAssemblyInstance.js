/**
 * Initializes the WebAssembly exports for a given WebAssembly instance wrapper.
 *
 * @param {Object} webAssemblyInstanceWrapper - An object containing the WebAssembly instance to initialize.
 * @property {WebAssembly.Instance} webAssemblyInstanceWrapper.instance - The actual WebAssembly instance to be initialized.
 * @returns {void}
 */
function initializeWebAssemblyInstance(webAssemblyInstanceWrapper) {
  // Call the function to initialize WebAssembly exports, update global state,
  // and manage the callback queue for when all modules are loaded.
  initializeWebAssemblyExports(webAssemblyInstanceWrapper.instance);
}

module.exports = initializeWebAssemblyInstance;