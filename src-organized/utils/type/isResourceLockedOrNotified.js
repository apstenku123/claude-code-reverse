/**
 * Checks if the resource is either locked or has a notification flag set.
 *
 * This function inspects the provided resource object to determine if:
 *   1. The resource has a property referenced by CR, and that property has a 'locked' field set to true, OR
 *   2. The resource has a property referenced by NF that is truthy.
 *
 * @param {Object} resource - The resource object to check for lock or notification status.
 * @returns {boolean} Returns true if the resource is locked or has a notification flag; otherwise, false.
 */
function isResourceLockedOrNotified(resource) {
  // Check if the resource has a lock property and if isBlobOrFileLikeObject is locked
  const isLocked = resource[CR] && resource[CR].locked === true;

  // Check if the resource has a notification flag
  const hasNotificationFlag = resource[NF];

  // Return true if either locked or notification flag is set
  return isLocked || hasNotificationFlag;
}

module.exports = isResourceLockedOrNotified;