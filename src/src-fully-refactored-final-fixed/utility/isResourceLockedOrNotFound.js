/**
 * Determines if a resource is locked or not found.
 *
 * Checks if the resource has a 'locked' property set to true on the property referenced by CR,
 * or if the property referenced by NF is truthy. This is typically used to check the state
 * of a resource in a collection or observable.
 *
 * @param {Object} resource - The resource object to check.
 * @returns {boolean} Returns true if the resource is locked or not found, otherwise false.
 */
function isResourceLockedOrNotFound(resource) {
  // Check if the resource has a property referenced by CR and if isBlobOrFileLikeObject is locked
  if (resource[CR] && resource[CR].locked === true) {
    return true;
  }
  // Check if the resource has a property referenced by NF (e.g., 'not found')
  return !!resource[NF];
}

module.exports = isResourceLockedOrNotFound;