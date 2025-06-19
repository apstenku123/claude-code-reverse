/**
 * Resolves an observable path based on its prefix and configuration.
 *
 * If the path starts with '~/':
 *   - Resolves isBlobOrFileLikeObject as a root-relative observable using Jv and $restoreCurrentFromResourceArray.
 * If the path is already a valid observable (checked by wi):
 *   - Returns isBlobOrFileLikeObject as is.
 * Otherwise:
 *   - Ensures the path is relative (starts with './') and resolves isBlobOrFileLikeObject using e51 and ExA.
 *
 * @param {string} observablePath - The path or identifier of the observable to resolve.
 * @param {string} baseConfig - The base configuration or context for resolving relative paths.
 * @returns {string} The resolved observable path.
 */
function resolveObservablePath(observablePath, baseConfig) {
  // Check if the path is root-relative (starts with '~/')
  if (observablePath.startsWith("~/")) {
    // Use Jv to resolve with the root context from $restoreCurrentFromResourceArray
    return Jv($restoreCurrentFromResourceArray(), observablePath.substring(2));
  } else if (wi(observablePath)) {
    // If already a valid observable, return as is
    return observablePath;
  } else {
    // Ensure the path is relative (starts with './')
    const relativePath = observablePath.startsWith("./")
      ? observablePath
      : `./${observablePath}`;
    // Resolve the relative path using e51 and ExA
    return e51(ExA(baseConfig), relativePath);
  }
}

module.exports = resolveObservablePath;