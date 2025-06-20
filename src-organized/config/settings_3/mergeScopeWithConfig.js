/**
 * Merges a given scope with a configuration object if provided.
 * If no configuration is given, returns the original scope.
 * If a configuration is provided, clones the scope (or creates a new one),
 * updates isBlobOrFileLikeObject with the configuration, and returns the updated scope.
 *
 * @param {Object} sourceScope - The original scope object, expected to have a clone() method.
 * @param {Object} config - Optional configuration object to update the scope with.
 * @returns {Object} - The original scope if no config is provided, otherwise the updated scope.
 */
function mergeScopeWithConfig(sourceScope, config) {
  // If no config is provided, return the original scope as-is
  if (!config) return sourceScope;

  // Clone the source scope if isBlobOrFileLikeObject exists, otherwise create a new OU1.Scope instance
  const updatedScope = sourceScope ? sourceScope.clone() : new OU1.Scope();

  // Update the cloned/new scope with the provided config
  updatedScope.update(config);

  // Return the updated scope
  return updatedScope;
}

module.exports = mergeScopeWithConfig;