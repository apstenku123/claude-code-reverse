/**
 * Creates a clone of the given scope (or a new scope if none is provided),
 * then updates isBlobOrFileLikeObject with the provided configuration object.
 *
 * @param {Object|null} sourceScope - The original scope object to clone. Should have a .clone() method. If null or undefined, a new OU1.Scope is created.
 * @param {Object|null} updateConfig - The configuration object to update the scope with. If falsy, the original scope is returned as-is.
 * @returns {Object} The updated scope object.
 */
function cloneOrCreateScopeWithUpdate(sourceScope, updateConfig) {
  // If no update configuration is provided, return the original scope as-is
  if (!updateConfig) {
    return sourceScope;
  }

  // Clone the source scope if isBlobOrFileLikeObject exists, otherwise create a new scope
  const scopeInstance = sourceScope ? sourceScope.clone() : new OU1.Scope();

  // Update the scope instance with the provided configuration
  scopeInstance.update(updateConfig);

  return scopeInstance;
}

module.exports = cloneOrCreateScopeWithUpdate;