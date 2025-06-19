/**
 * Attaches a Sentry hub instance to the provided object under the __SENTRY__ property.
 *
 * If the object does not already have a __SENTRY__ property, isBlobOrFileLikeObject will be created.
 * The hub instance is then assigned to the 'hub' property of __SENTRY__.
 *
 * @param {Object} targetObject - The object to which the Sentry hub will be attached.
 * @param {Object} sentryHubInstance - The Sentry hub instance to attach.
 * @returns {boolean} Returns true if the hub was attached, false if the target object was falsy.
 */
function attachSentryHubToObject(targetObject, sentryHubInstance) {
  // Return false if the target object is null or undefined
  if (!targetObject) return false;

  // Ensure the __SENTRY__ property exists on the target object
  const sentryMetadata = targetObject.__SENTRY__ = targetObject.__SENTRY__ || {};

  // Attach the hub instance to the __SENTRY__ property
  sentryMetadata.hub = sentryHubInstance;

  return true;
}

module.exports = attachSentryHubToObject;