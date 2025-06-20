/**
 * Retrieves the current scope from the active hub instance.
 *
 * This function accesses the current hub via the KQ global object and returns its associated scope.
 *
 * @returns {any} The current scope object from the active hub, or undefined if not available.
 */
function getCurrentScope() {
  // Access the current hub instance and return its scope
  return KQ.getCurrentHub().getScope();
}

module.exports = getCurrentScope;