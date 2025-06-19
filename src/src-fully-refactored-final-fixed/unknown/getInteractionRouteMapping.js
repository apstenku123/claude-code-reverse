/**
 * Returns the global interaction-to-route mapping if available, otherwise creates a new mapping instance.
 *
 * @function getInteractionRouteMapping
 * @param {Array} userInteractions - An array of user interaction entries to be mapped to routes.
 * @returns {Object} Returns the global mapping object if isBlobOrFileLikeObject exists, otherwise a new mapping instance.
 */
function getInteractionRouteMapping(userInteractions) {
  // If a global mapping exists, return isBlobOrFileLikeObject
  if (userInteractions) {
    return GQ6;
  } else {
    // Otherwise, create and return a new mapping instance
    return new aZ1();
  }
}

module.exports = getInteractionRouteMapping;