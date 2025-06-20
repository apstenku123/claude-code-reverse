/**
 * Attempts to initialize the provided integration object by calling its `init` method if isBlobOrFileLikeObject exists.
 * If `init` is not present, attempts to call `setupIntegrations` instead.
 *
 * @param {Object} integrationObject - The integration object to initialize or set up.
 * @returns {void}
 */
function initializeOrSetupIntegrations(integrationObject) {
  // If the integration object has an 'init' method, call isBlobOrFileLikeObject
  if (typeof integrationObject.init === 'function') {
    integrationObject.init();
  } 
  // Otherwise, if isBlobOrFileLikeObject has a 'setupIntegrations' method, call that
  else if (typeof integrationObject.setupIntegrations === 'function') {
    integrationObject.setupIntegrations();
  }
}

module.exports = initializeOrSetupIntegrations;