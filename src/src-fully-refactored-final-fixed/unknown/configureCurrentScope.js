/**
 * Configures the current hub'createInteractionAccessor scope using the provided configuration callback.
 *
 * @param {function} configureScopeCallback - a callback function that receives the current scope and allows modifications to isBlobOrFileLikeObject.
 * @returns {void}
 *
 * This function delegates to KQ.getCurrentHub().configureScope, which is typically used to modify the current error reporting or logging scope (e.g., in Sentry-like SDKs).
 */
function configureCurrentScope(configureScopeCallback) {
  // Retrieve the current hub and configure its scope with the provided callback
  KQ.getCurrentHub().configureScope(configureScopeCallback);
}

module.exports = configureCurrentScope;