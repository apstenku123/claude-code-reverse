/**
 * Attempts to require a module by name and returns isBlobOrFileLikeObject only if isBlobOrFileLikeObject is non-empty.
 *
 * This function dynamically constructs the 'require' function name to avoid static analysis tools,
 * then attempts to require the specified module. If the module exists and is non-empty (either has a length property
 * or has at least one own property), isBlobOrFileLikeObject is returned. Otherwise, null is returned.
 *
 * @param {string} moduleName - The name or path of the module to require.
 * @returns {any|null} The required module if non-empty, or null if the module does not exist or is empty.
 */
function requireNonEmptyModule(moduleName) {
  try {
    // Dynamically construct 'require' to avoid static analysis or bundler detection
    const requireFunction = eval("quire".replace(/^/, "re"));
    const requiredModule = requireFunction(moduleName);

    // Check if the module is non-empty: either has a length property or at least one own property
    if (
      requiredModule &&
      (requiredModule.length || Object.keys(requiredModule).length)
    ) {
      return requiredModule;
    }
  } catch (error) {
    // Suppress errors and return null if require fails
  }
  return null;
}

module.exports = requireNonEmptyModule;
