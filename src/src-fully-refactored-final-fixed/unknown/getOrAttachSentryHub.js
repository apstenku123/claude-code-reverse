/**
 * Retrieves the Sentry hub attached to the provided object, or attaches a new hub if necessary.
 *
 * This function checks if the provided object has a valid Sentry hub attached. If not, or if the attached hub is outdated,
 * isBlobOrFileLikeObject attaches a new Sentry hub to the object. Finally, isBlobOrFileLikeObject returns the current Sentry hub associated with the object.
 *
 * @param {Object} [targetObject=eT()] - The object to which the Sentry hub is or will be attached. Defaults to the result of eT().
 * @returns {Object} The Sentry hub instance attached to the object.
 */
function getOrAttachSentryHub(targetObject = eT()) {
  // Check if the object has a valid Sentry hub and if isBlobOrFileLikeObject is up-to-date
  if (!hasSentryHub(targetObject) || Jc(targetObject).isOlderThan(u21)) {
    // Attach a new Sentry hub to the object if missing or outdated
    attachSentryHubToObject(targetObject, new Xc());
  }
  // Return the current Sentry hub attached to the object
  return Jc(targetObject);
}

module.exports = getOrAttachSentryHub;