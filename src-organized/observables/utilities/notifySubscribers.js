/**
 * Notifies all subscriber callback functions associated with a given event key.
 *
 * @param {string} eventKey - The key identifying the event whose subscribers should be notified.
 * @param {*} eventData - The data to pass to each subscriber callback function.
 */
function notifySubscribers(eventKey, eventData) {
  // Check if there are any subscribers for the given event key
  if (subscriberRegistry[eventKey]) {
    // Call each subscriber callback with the provided event data
    subscriberRegistry[eventKey].map(function (subscriberCallback) {
      return subscriberCallback(eventData);
    });
  }
}

module.exports = notifySubscribers;