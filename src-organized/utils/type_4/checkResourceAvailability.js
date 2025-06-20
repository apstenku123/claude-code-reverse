/**
 * Checks if the external resource is available.
 *
 * This function asynchronously calls the `isAvailable` method on the `resourceChecker` object
 * to determine if the required resource or service is currently accessible.
 *
 * @async
 * @function checkResourceAvailability
 * @returns {Promise<boolean>} Resolves to true if the resource is available, false otherwise.
 */
async function checkResourceAvailability() {
  // Call the external resourceChecker'createInteractionAccessor isAvailable method and return its result
  return resourceChecker.isAvailable();
}

module.exports = checkResourceAvailability;