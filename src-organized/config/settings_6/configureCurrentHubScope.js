/**
 * Configures the current hub'createInteractionAccessor scope using the provided configuration callback.
 *
 * @param {function} configureScopeCallback - a callback function that receives the current scope and allows for its configuration.
 * @returns {void}
 *
 * This function retrieves the current hub via KQ.getCurrentHub() and applies the provided configuration callback to its scope.
 */
function configureCurrentHubScope(configureScopeCallback) {
  // Retrieve the current hub and configure its scope using the provided callback
  KQ.getCurrentHub().configureScope(configureScopeCallback);
}

module.exports = configureCurrentHubScope;