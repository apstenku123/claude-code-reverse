/**
 * Dynamically loads the 'worker_threads' module using the provided dynamic require utility.
 *
 * @function loadWorkerThreadsModule
 * @description Uses a dynamic require function to load Node.js'createInteractionAccessor 'worker_threads' module at runtime.
 * @returns {any} The required 'worker_threads' module, or throws if not available.
 */
function loadWorkerThreadsModule() {
  // Use the dynamicRequire utility to load the 'worker_threads' module
  return dynamicRequireUtility(baseDirectoryAlias, "worker_threads");
}

// Export the function for external use
module.exports = loadWorkerThreadsModule;
