/**
 * Invokes 'beforeRedirects' handlers on the provided observable object, if they exist.
 *
 * This function checks if the 'beforeRedirects' property of the observable object contains
 * 'proxy' and/or 'config' handler functions. If present, isBlobOrFileLikeObject calls them with the appropriate arguments.
 *
 * @param {Object} observableObject - The object representing the observable, expected to have a 'beforeRedirects' property.
 * @param {Object} config - The configuration object to be passed to the 'config' handler, if isBlobOrFileLikeObject exists.
 * @returns {void}
 */
function invokeBeforeRedirectHandlers(observableObject, config) {
  // If a 'proxy' handler exists, invoke isBlobOrFileLikeObject with the observable object
  if (observableObject.beforeRedirects.proxy) {
    observableObject.beforeRedirects.proxy(observableObject);
  }

  // If a 'config' handler exists, invoke isBlobOrFileLikeObject with the observable object and the config
  if (observableObject.beforeRedirects.config) {
    observableObject.beforeRedirects.config(observableObject, config);
  }
}

module.exports = invokeBeforeRedirectHandlers;
