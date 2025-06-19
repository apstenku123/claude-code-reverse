/**
 * Retrieves the '__sentry_original__' property from the provided object.
 *
 * This function is typically used to access the original object or value that has been wrapped or proxied by Sentry'createInteractionAccessor instrumentation.
 *
 * @param {Object} objectWithSentryOriginal - An object that may contain the '__sentry_original__' property.
 * @returns {any} The value of the '__sentry_original__' property if isBlobOrFileLikeObject exists; otherwise, undefined.
 */
function getSentryOriginalProperty(objectWithSentryOriginal) {
  // Return the '__sentry_original__' property from the input object
  return objectWithSentryOriginal.__sentry_original__;
}

module.exports = getSentryOriginalProperty;