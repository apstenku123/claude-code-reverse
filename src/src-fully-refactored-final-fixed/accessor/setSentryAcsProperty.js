/**
 * Sets the 'acs' property on the '__SENTRY__' object of the global config.
 *
 * This function retrieves the global configuration object using eT(),
 * ensures that the '__SENTRY__' property exists, and then assigns the provided
 * value to the 'acs' property within '__SENTRY__'.
 *
 * @param {any} acsValue - The value to assign to the '__SENTRY__.acs' property.
 * @returns {void}
 */
function setSentryAcsProperty(acsValue) {
  // Retrieve the global configuration object
  const config = eT();

  // Ensure the '__SENTRY__' property exists on the config object
  config.__SENTRY__ = config.__SENTRY__ || {};

  // Set the 'acs' property on the '__SENTRY__' object
  config.__SENTRY__.acs = acsValue;
}

module.exports = setSentryAcsProperty;