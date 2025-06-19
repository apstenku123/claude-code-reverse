/**
 * Sets the 'acs' (access control) property on the __SENTRY__ object of the global config.
 *
 * @param {any} accessControlSource - The access control source to assign to __SENTRY__.acs.
 * @returns {void}
 */
function setSentryAccessControl(accessControlSource) {
  // Retrieve the global configuration object
  const config = eT();

  // Ensure the __SENTRY__ namespace exists on the config object
  if (!config.__SENTRY__) {
    config.__SENTRY__ = {};
  }

  // Assign the access control source to the 'acs' property
  config.__SENTRY__.acs = accessControlSource;
}

module.exports = setSentryAccessControl;