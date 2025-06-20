/**
 * Creates a function that loads a module with caching semantics.
 *
 * This higher-order function returns a loader function that, when called, will either return the cached module exports
 * or invoke the provided moduleFactory to initialize the module and cache its exports. This pattern is commonly used
 * to implement CommonJS-style module loading with singleton behavior.
 *
 * @param {Function} moduleFactory - a function that receives (exports, module) and populates module.exports.
 * @param {Object} [cachedModule] - Optional. An object representing the cached module. If not provided, a new one is created.
 * @returns {Function} a function that, when invoked, returns the module'createInteractionAccessor exports, initializing them if necessary.
 */
function createCachedModuleLoader(moduleFactory, cachedModule) {
  return function loadModule() {
    // If the module has already been initialized, return its exports
    if (cachedModule) {
      return cachedModule.exports;
    }

    // Initialize the module and cache its exports
    cachedModule = { exports: {} };
    moduleFactory(cachedModule.exports, cachedModule);
    return cachedModule.exports;
  };
}

module.exports = createCachedModuleLoader;
