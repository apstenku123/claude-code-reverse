/**
 * Creates a Yoga layout engine factory from a WebAssembly module.
 *
 * This function asynchronously instantiates a WebAssembly module and then creates
 * a Yoga layout engine factory using the provided module instance. It is designed
 * to enhance the Yoga Node and Config prototypes for easier layout manipulation.
 *
 * @async
 * @function createYogaFactoryFromWasm
 * @param {WebAssembly.Module | BufferSource | Promise<WebAssembly.Module>} wasmModule - The WebAssembly module or buffer to instantiate Yoga from.
 * @returns {Promise<any>} a promise that resolves to the Yoga factory instance.
 */
async function createYogaFactoryFromWasm(wasmModule) {
  // Use O_4 to handle instantiation, providing a custom instantiateWasm callback
  const yogaConfig = await O_4({
    /**
     * Custom instantiation logic for WebAssembly.
     * @param {WebAssembly.Imports} importObject - The imports for the WebAssembly module.
     * @param {Function} onInstanceReady - Callback to receive the instantiated module.
     */
    instantiateWasm(importObject, onInstanceReady) {
      // Instantiate the WebAssembly module with the provided imports
      WebAssembly.instantiate(wasmModule, importObject).then(result => {
        // If the result is an instance, pass isBlobOrFileLikeObject directly; otherwise, use the .instance property
        if (result instanceof WebAssembly.Instance) {
          onInstanceReady(result);
        } else {
          onInstanceReady(result.instance);
        }
      });
    }
  });

  // Create and return the Yoga factory using the instantiated config
  return createYogaFactory(yogaConfig);
}

module.exports = createYogaFactoryFromWasm;