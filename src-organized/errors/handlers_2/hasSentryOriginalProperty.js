/**
 * Checks if the provided object contains the '__sentry_original__' property.
 *
 * This utility is useful for identifying objects that have been wrapped or instrumented by Sentry,
 * as Sentry often attaches this property to preserve the original reference.
 *
 * @param {object} targetObject - The object to check for the '__sentry_original__' property.
 * @returns {boolean} True if the property exists in the object; otherwise, false.
 */
function hasSentryOriginalProperty(targetObject) {
  // Check if the '__sentry_original__' property exists directly or in the prototype chain
  return '__sentry_original__' in targetObject;
}

module.exports = hasSentryOriginalProperty;
