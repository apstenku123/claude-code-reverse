/**
 * Returns the provided Promise implementation, or falls back to a configured Promise, or the global Promise.
 *
 * @param {any} customPromiseImplementation - a custom Promise implementation to use, if provided.
 * @returns {any} The resolved Promise implementation (custom, configured, or global).
 */
function getPromiseImplementation(customPromiseImplementation) {
  // Attempt to use the provided custom Promise implementation
  let resolvedPromiseImplementation = customPromiseImplementation !== null && customPromiseImplementation !== undefined
    ? customPromiseImplementation
    // If not provided, try to use the configured Promise from aN9.config
    : (aN9 && aN9.config && aN9.config.Promise);

  // If neither custom nor configured Promise is available, fall back to the global Promise
  return resolvedPromiseImplementation !== null && resolvedPromiseImplementation !== undefined
    ? resolvedPromiseImplementation
    : Promise;
}

module.exports = getPromiseImplementation;