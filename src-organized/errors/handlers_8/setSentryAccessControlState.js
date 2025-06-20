/**
 * Sets the Sentry access control state by assigning the provided access control source to the global Sentry configuration object.
 *
 * @param {any} accessControlSource - The access control source to assign to the Sentry configuration.
 * @returns {void}
 */
function setSentryAccessControlState(accessControlSource) {
  // Retrieve the global Sentry configuration object
  const sentryConfig = eT();

  // Ensure the __SENTRY__ property exists on the configuration object
  sentryConfig.__SENTRY__ = sentryConfig.__SENTRY__ || {};

  // Assign the access control source to the 'acs' property
  sentryConfig.__SENTRY__.acs = accessControlSource;
}

module.exports = setSentryAccessControlState;