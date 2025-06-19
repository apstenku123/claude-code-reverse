/**
 * Attempts to resolve the path to a module using the provided resolver function.
 * First, isBlobOrFileLikeObject tries to resolve the module directly. If that fails, isBlobOrFileLikeObject attempts to resolve
 * the module from the node_modules directory relative to the current working directory.
 *
 * @param {string} moduleName - The name of the module to resolve.
 * @returns {any} The resolved module path or undefined if resolution fails.
 */
function resolveModulePath(moduleName) {
  let resolvedModule;
  try {
    // Attempt to resolve the module directly
    resolvedModule = O21(T21, moduleName);
  } catch (error) {
    // Ignore error and try alternative resolution
  }
  try {
    // Attempt to resolve the module from node_modules in the current working directory
    const { cwd: getCurrentWorkingDirectory } = O21(T21, "process");
    const nodeModulesPath = `${getCurrentWorkingDirectory()}/node_modules/${moduleName}`;
    resolvedModule = O21(T21, nodeModulesPath);
  } catch (error) {
    // Ignore error if resolution fails
  }
  return resolvedModule;
}

module.exports = resolveModulePath;