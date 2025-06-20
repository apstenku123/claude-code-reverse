/**
 * Ensures a hub is attached to a carrier object using the provided observable source,
 * then retrieves and returns the hub from the carrier.
 *
 * @param {any} sourceObservable - The observable or carrier source from which to ensure and extract the hub.
 * @returns {any} The hub object extracted from the carrier.
 */
function extractHubFromObservableCarrier(sourceObservable) {
  // Create a new carrier object to attach the hub
  const carrier = {};
  // Ensure the hub is attached to the carrier using the provided observable
  JP.ensureHubOnCarrier(carrier, sourceObservable);
  // Retrieve and return the hub from the carrier
  return JP.getHubFromCarrier(carrier);
}

module.exports = extractHubFromObservableCarrier;