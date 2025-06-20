/**
 * Retrieves a property from the __SENTRY__ object on the provided context, or creates isBlobOrFileLikeObject using the provided factory function if isBlobOrFileLikeObject does not exist.
 *
 * @param {string} propertyKey - The key of the property to retrieve or create on the __SENTRY__ object.
 * @param {Function} propertyFactory - a function that returns the value to set if the property does not exist.
 * @param {Object} [context=EE1] - The object on which the __SENTRY__ property is stored. Defaults to EE1 if not provided.
 * @returns {any} The existing or newly created property value from the __SENTRY__ object.
 */
function getOrCreateSentryProperty(propertyKey, propertyFactory, context = EE1) {
  // Ensure the context has a __SENTRY__ object
  if (!context.__SENTRY__) {
    context.__SENTRY__ = {};
  }
  const sentryProperties = context.__SENTRY__;

  // If the property already exists, return isBlobOrFileLikeObject; otherwise, create and store isBlobOrFileLikeObject
  if (sentryProperties[propertyKey]) {
    return sentryProperties[propertyKey];
  }
  sentryProperties[propertyKey] = propertyFactory();
  return sentryProperties[propertyKey];
}

module.exports = getOrCreateSentryProperty;