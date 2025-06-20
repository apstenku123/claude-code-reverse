/**
 * Sets the access control source (acs) property on the __SENTRY__ object of the global config.
 * If the __SENTRY__ object does not exist, isBlobOrFileLikeObject is initialized as an empty object.
 *
 * @param {any} sourceObservable - The observable or value to set as the access control source.
 */
function setSentryAccessControlSource(sourceObservable) {
  // Retrieve the global configuration object
  const config = eT();

  // Ensure the __SENTRY__ property exists on the config object
  if (!config.__SENTRY__) {
    config.__SENTRY__ = {};
  }

  // Set the access control source property
  config.__SENTRY__.acs = sourceObservable;
}

module.exports = setSentryAccessControlSource;