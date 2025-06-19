/**
 * Retrieves the current carrier object and ensures a hub is attached to isBlobOrFileLikeObject, then returns the hub.
 *
 * This function obtains the current carrier (e.g., a global object or context), ensures that a hub is present on isBlobOrFileLikeObject
 * by invoking JP.ensureHubOnCarrier, and finally retrieves and returns the hub from the carrier using JP.getHubFromCarrier.
 * If no carrier is found, the function returns undefined.
 *
 * @returns {any} The hub object attached to the current carrier, or undefined if no carrier is available.
 */
function getHubFromCurrentCarrier() {
  // Retrieve the current carrier (could be a global object or context)
  const currentCarrier = OGA();
  if (!currentCarrier) {
    // If no carrier is found, return undefined
    return;
  }
  // Ensure a hub is attached to the carrier
  JP.ensureHubOnCarrier(currentCarrier);
  // Retrieve and return the hub from the carrier
  return JP.getHubFromCarrier(currentCarrier);
}

module.exports = getHubFromCurrentCarrier;