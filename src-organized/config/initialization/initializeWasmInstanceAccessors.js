/**
 * Initializes global accessors for the exports of a given WebAssembly instance.
 *
 * This function normalizes the provided WebAssembly instance, initializes global accessors
 * for its exports, and performs any required post-initialization steps.
 *
 * @param {object} wasmInstance - The WebAssembly instance to initialize accessors for.
 * @returns {object} The result of initializing the WebAssembly instance accessors.
 */
function initializeWasmInstanceAccessors(wasmInstance) {
  // Normalize the input WebAssembly instance
  const normalizedInstance = aZ(wasmInstance);

  // Initialize global accessors for the instance'createInteractionAccessor exports
  const wasmAccessors = MA(normalizedInstance);

  // Perform any required post-initialization steps
  clearLocalStorageByStoreConfig(normalizedInstance);

  return wasmAccessors;
}

module.exports = initializeWasmInstanceAccessors;