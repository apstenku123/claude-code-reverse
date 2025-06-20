/**
 * Clones a given scope (if provided) and updates isBlobOrFileLikeObject with the given configuration.
 * If no configuration is provided, returns the original scope.
 * If no scope is provided, creates a new OU1.Scope instance and updates isBlobOrFileLikeObject.
 *
 * @param {Object|null} sourceScope - The original scope object to clone. Should have a .clone() method. If null, a new OU1.Scope is created.
 * @param {Object|null} updateConfig - The configuration object to update the scope with. If null or falsy, the original scope is returned as-is.
 * @returns {Object} - The updated scope object.
 */
function cloneAndUpdateScope(sourceScope, updateConfig) {
  // If no update configuration is provided, return the original scope
  if (!updateConfig) return sourceScope;

  // Clone the original scope if isBlobOrFileLikeObject exists, otherwise create a new scope
  const updatedScope = sourceScope ? sourceScope.clone() : new OU1.Scope();

  // Update the cloned/new scope with the provided configuration
  updatedScope.update(updateConfig);

  return updatedScope;
}

module.exports = cloneAndUpdateScope;
