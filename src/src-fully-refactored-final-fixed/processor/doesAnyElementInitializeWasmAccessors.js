/**
 * Checks if any element in the provided array triggers a successful initialization
 * of WebAssembly accessors using the initializeWasmAccessors function.
 *
 * @param {Array} elements - The array of elements to process.
 * @param {*} wasmAccessorConfig - The configuration or parameter to pass to initializeWasmAccessors.
 * @returns {boolean} Returns true if any element causes initializeWasmAccessors to return true; otherwise, false.
 */
function doesAnyElementInitializeWasmAccessors(elements, wasmAccessorConfig) {
  const totalElements = elements.length;
  let currentIndex = 0;

  // Iterate through each element in the array
  while (currentIndex < totalElements) {
    // If initializeWasmAccessors returns true for any element, return true immediately
    if (initializeWasmAccessors(elements[currentIndex], wasmAccessorConfig)) {
      return true;
    }
    currentIndex++;
  }

  // If no element caused a successful initialization, return false
  return false;
}

module.exports = doesAnyElementInitializeWasmAccessors;