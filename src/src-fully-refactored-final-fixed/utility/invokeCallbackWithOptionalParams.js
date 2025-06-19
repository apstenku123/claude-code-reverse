/**
 * Invokes the C2 callback with required and optional parameters.
 *
 * @param {Function} callback - The main callback function to invoke (C2).
 * @param {Function} dependencyResolver - Function to resolve dependencies (convertCharCodeArrayToString).
 * @param {*} primaryDependency - The primary dependency to resolve (initializeSyntaxHighlighting).
 * @param {*} [optionalConfig] - Optional configuration parameter (b).
 * @param {*} [optionalSource] - Optional source parameter (a).
 * @returns {void}
 */
function invokeCallbackWithOptionalParams(callback, dependencyResolver, primaryDependency, optionalConfig, optionalSource) {
  // Always resolve the primary dependency
  const resolvedPrimaryDependency = dependencyResolver(primaryDependency);

  // Resolve optionalConfig if provided, otherwise undefined
  const resolvedOptionalConfig = optionalConfig ? dependencyResolver(optionalConfig) : undefined;

  // Resolve optionalSource if provided, otherwise undefined
  const resolvedOptionalSource = optionalSource ? dependencyResolver(optionalSource) : undefined;

  // Invoke the callback with all resolved parameters
  callback(
    CC5, // Assuming CC5 is a required constant or dependency
    resolvedPrimaryDependency,
    resolvedOptionalConfig,
    resolvedOptionalSource
  );
}

module.exports = invokeCallbackWithOptionalParams;