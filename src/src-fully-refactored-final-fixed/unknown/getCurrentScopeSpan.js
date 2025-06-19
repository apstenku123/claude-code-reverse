/**
 * Retrieves the current execution scope'createInteractionAccessor span object.
 *
 * This function accesses the global 'ly' object to obtain the current scope
 * and then retrieves its associated span. The span typically contains tracing
 * or context information for the current execution flow.
 *
 * @returns {any} The span object associated with the current scope, or undefined if not available.
 */
function getCurrentScopeSpan() {
  // Access the global 'ly' object to get the current execution scope
  const currentScope = ly.getCurrentScope();

  // Retrieve and return the span from the current scope
  return currentScope.getSpan();
}

module.exports = getCurrentScopeSpan;