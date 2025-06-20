/**
 * Initializes the Yoga WASM factory with enhanced JavaScript bindings.
 *
 * This function loads a WebAssembly module (typically Yoga), instantiates isBlobOrFileLikeObject,
 * and then wraps the resulting WASM instance with additional JavaScript-friendly
 * utilities and error-checked interfaces for easier and safer usage.
 *
 * @async
 * @param {WebAssembly.Module | BufferSource} wasmModule - The WebAssembly module or binary buffer to instantiate.
 * @returns {Promise<any>} The enhanced Yoga WASM factory with ergonomic JavaScript bindings.
 */
async function initializeYogaWasmFactory(wasmModule) {
  // Load and instantiate the WASM module using a custom instantiation callback
  const yogaWasmBindings = await O_4({
    /**
     * Custom instantiation logic for the WASM module.
     * @param {WebAssembly.Imports} imports - The imports object for the WASM module.
     * @param {function(WebAssembly.Instance): void} onInstanceReady - Callback to receive the instantiated module.
     */
    instantiateWasm(imports, onInstanceReady) {
      WebAssembly.instantiate(wasmModule, imports).then(result => {
        // If the result is a WebAssembly.Instance, pass isBlobOrFileLikeObject directly; otherwise, pass the instance property
        if (result instanceof WebAssembly.Instance) {
          onInstanceReady(result);
        } else {
          onInstanceReady(result.instance);
        }
      });
    }
  });

  // Enhance the WASM bindings with JavaScript-friendly utilities and return
  return createYogaFactory(yogaWasmBindings);
}

module.exports = initializeYogaWasmFactory;