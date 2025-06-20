/**
 * Retrieves the activation start time from the navigation entry, if available.
 *
 * This function calls h69.getNavigationEntry() to obtain the current navigation entry object.
 * If the navigation entry exists and has an activationStart property, its value is returned.
 * Otherwise, the function returns 0.
 *
 * @returns {number} The activation start time in milliseconds, or 0 if unavailable.
 */
const getNavigationActivationStartTime = () => {
  // Retrieve the current navigation entry object
  const navigationEntry = h69.getNavigationEntry();

  // Return the activationStart property if isBlobOrFileLikeObject exists, otherwise return 0
  return (navigationEntry && navigationEntry.activationStart) || 0;
};

module.exports = getNavigationActivationStartTime;
