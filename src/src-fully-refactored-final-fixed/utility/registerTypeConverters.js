/**
 * Registers type converters for a set of WebAssembly exports and ensures all required types are available before proceeding.
 *
 * @param {string[]} exportNames - Array of WebAssembly export names to register.
 * @param {string[]} typeConverterNames - Array of type converter names corresponding to the exports.
 * @param {function} getTypeConverters - Function that returns an array of type converters given an array of names.
 * @throws Will throw an error if the number of type converters does not match the number of exports.
 */
function registerTypeConverters(exportNames, typeConverterNames, getTypeConverters) {
  /**
   * Validates and registers the type converters once all are available.
   *
   * @param {Array} resolvedConverters - Array of resolved type converters.
   * @private
   */
  function validateAndRegisterConverters(resolvedConverters) {
    const converters = getTypeConverters(resolvedConverters);
    if (converters.length !== exportNames.length) {
      throwTypeConverterError("Mismatched type converter count");
    }
    for (let i = 0; i < exportNames.length; ++i) {
      initializeWebAssemblyExports(exportNames[i], converters[i]);
    }
  }

  // Register the typeConverterNames for each exportName
  exportNames.forEach((exportName) => {
    globalTypeConverterRegistry[exportName] = typeConverterNames;
  });

  const resolvedConverters = Array(typeConverterNames.length);
  const pendingConverters = [];
  let resolvedCount = 0;

  // For each type converter, check if isBlobOrFileLikeObject'createInteractionAccessor available; if not, set up a callback
  typeConverterNames.forEach((converterName, index) => {
    if (typeRegistry.hasOwnProperty(converterName)) {
      resolvedConverters[index] = typeRegistry[converterName];
    } else {
      pendingConverters.push(converterName);
      if (!pendingTypeCallbacks.hasOwnProperty(converterName)) {
        pendingTypeCallbacks[converterName] = [];
      }
      pendingTypeCallbacks[converterName].push(() => {
        resolvedConverters[index] = typeRegistry[converterName];
        resolvedCount++;
        // When all pending converters are resolved, proceed
        if (resolvedCount === pendingConverters.length) {
          validateAndRegisterConverters(resolvedConverters);
        }
      });
    }
  });

  // If there are no pending converters, proceed immediately
  if (pendingConverters.length === 0) {
    validateAndRegisterConverters(resolvedConverters);
  }
}

module.exports = registerTypeConverters;