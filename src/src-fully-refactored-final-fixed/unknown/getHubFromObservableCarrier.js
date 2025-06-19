/**
 * Ensures a hub is attached to a carrier object using the provided observable source,
 * then retrieves the hub from the carrier.
 *
 * @param {any} sourceObservable - The observable or carrier source to attach the hub to.
 * @returns {any} The hub object retrieved from the carrier.
 */
function getHubFromObservableCarrier(sourceObservable) {
  // Create a new carrier object to attach the hub
  const carrier = {};
  // Ensure the hub is attached to the carrier using the provided observable
  JP.ensureHubOnCarrier(carrier, sourceObservable);
  // Retrieve and return the hub from the carrier
  return JP.getHubFromCarrier(carrier);
}

module.exports = getHubFromObservableCarrier;