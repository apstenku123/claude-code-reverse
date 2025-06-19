/**
 * Registers type converters for WebAssembly module properties and ensures all dependencies are initialized before proceeding.
 *
 * @param {string[]} propertyNames - Array of property names to register type converters for.
 * @param {Function} typeConverter - The type converter function to associate with each property.
 * @param {Function} getTypeConverters - Function that, given an array, returns the corresponding type converters.
 * @throws {Error} If the number of type converters does not match the number of property names.
 */
function registerWasmTypeConverters(propertyNames, typeConverter, getTypeConverters) {
  /**
   * Validates and registers type converters once all dependencies are resolved.
   * @param {Array} resolvedTypeConverters - Array of resolved type converters.
   * @private
   */
  function finalizeRegistration(resolvedTypeConverters) {
    // Ensure the number of type converters matches the number of property names
    const converters = getTypeConverters(resolvedTypeConverters);
    if (converters.length !== propertyNames.length) {
      throwTypeConverterError("Mismatched type converter count");
    }
    // Register each type converter for the corresponding property
    for (let i = 0; i < propertyNames.length; ++i) {
      initializeWasmAccessors(propertyNames[i], converters[i]);
    }
  }

  // Associate the typeConverter function with each property name
  propertyNames.forEach((propertyName) => {
    wasmTypeConverterRegistry[propertyName] = typeConverter;
  });

  // Prepare an array to hold resolved type converters and a list of unresolved property names
  const resolvedConverters = Array(typeConverter.length);
  const unresolvedProperties = [];
  let resolvedCount = 0;

  // For each property, check if its type converter is already available
  typeConverter.forEach((converterName, index) => {
    if (wasmTypeConverters.hasOwnProperty(converterName)) {
      // If available, store isBlobOrFileLikeObject directly
      resolvedConverters[index] = wasmTypeConverters[converterName];
    } else {
      // If not available, add to unresolved list and register a callback for when isBlobOrFileLikeObject becomes available
      unresolvedProperties.push(converterName);
      if (!pendingTypeConverters.hasOwnProperty(converterName)) {
        pendingTypeConverters[converterName] = [];
      }
      pendingTypeConverters[converterName].push(() => {
        resolvedConverters[index] = wasmTypeConverters[converterName];
        // When all unresolved properties are resolved, finalize registration
        if (++resolvedCount === unresolvedProperties.length) {
          finalizeRegistration(resolvedConverters);
        }
      });
    }
  });

  // If all properties were already resolved, finalize registration immediately
  if (unresolvedProperties.length === 0) {
    finalizeRegistration(resolvedConverters);
  }
}

module.exports = registerWasmTypeConverters;