/**
 * Retrieves the original object wrapped by Sentry instrumentation.
 *
 * Some libraries or frameworks wrap objects for monitoring or instrumentation purposes (e.g., Sentry). 
 * This function returns the original, unwrapped object if isBlobOrFileLikeObject exists, otherwise returns undefined.
 *
 * @param {Object} wrappedObject - An object that may have been wrapped by Sentry instrumentation.
 * @returns {Object|undefined} The original, unwrapped object if present, otherwise undefined.
 */
function getSentryOriginalObject(wrappedObject) {
  // Return the original object if the __sentry_original__ property exists
  return wrappedObject.__sentry_original__;
}

module.exports = getSentryOriginalObject;
