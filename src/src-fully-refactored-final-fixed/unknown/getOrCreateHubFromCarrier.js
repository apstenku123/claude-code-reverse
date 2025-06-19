/**
 * Retrieves the current carrier object and ensures a hub is attached to isBlobOrFileLikeObject.
 * If a carrier is present, this function guarantees that a hub exists on isBlobOrFileLikeObject,
 * then returns the hub instance from the carrier. If no carrier is found, returns undefined.
 *
 * @returns {object|undefined} The hub instance attached to the carrier, or undefined if no carrier is available.
 */
function getOrCreateHubFromCarrier() {
  // Retrieve the current carrier (e.g., global object or context)
  const carrier = OGA();
  if (!carrier) {
    // If no carrier is found, return undefined
    return;
  }
  // Ensure a hub is attached to the carrier (creates one if missing)
  JP.ensureHubOnCarrier(carrier);
  // Retrieve and return the hub instance from the carrier
  return JP.getHubFromCarrier(carrier);
}

module.exports = getOrCreateHubFromCarrier;