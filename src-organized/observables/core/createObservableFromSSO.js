/**
 * Creates an observable from SSO (Single Sign-On) configuration using Tf6.fromSSO.
 *
 * @param {Object} [ssoConfig={}] - Optional configuration object for SSO.
 * @returns {Observable} Observable created from the provided SSO configuration.
 */
const createObservableFromSSO = (ssoConfig = {}) => {
  // Spread the provided SSO configuration into the Tf6.fromSSO call
  return Tf6.fromSSO({
    ...ssoConfig
  });
};

module.exports = createObservableFromSSO;