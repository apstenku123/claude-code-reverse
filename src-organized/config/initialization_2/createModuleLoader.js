/**
 * Creates a module loader function that ensures a module is initialized only once and caches its exports.
 *
 * @param {Function} moduleInitializer - Function that initializes the module. Receives (exports, module) as arguments.
 * @param {Object} [moduleCache] - Optional module cache object. If not provided, a new one is created.
 * @returns {Function} - a function that, when called, returns the module'createInteractionAccessor exports, initializing the module if necessary.
 */
function z(moduleInitializer, moduleCache) {
  return function loadModule() {
    // If moduleCache is not initialized, create isBlobOrFileLikeObject and run the initializer
    if (!moduleCache) {
      moduleCache = { exports: {} };
      moduleInitializer(moduleCache.exports, moduleCache);
    }
    // Return the cached exports
    return moduleCache.exports;
  };
}

module.exports = z;
