/**
 * Notifies all subscriber callbacks associated with a specific key, passing them the provided payload.
 *
 * @param {string} key - The key whose subscribers should be notified.
 * @param {*} payload - The data to pass to each subscriber callback.
 * @returns {void}
 */
function notifySubscribersForKey(key, payload) {
  // Check if there are any subscribers registered for the given key
  if (subscriberRegistry[key]) {
    // Call each subscriber callback with the provided payload
    subscriberRegistry[key].map(function (subscriberCallback) {
      return subscriberCallback(payload);
    });
  }
}

module.exports = notifySubscribersForKey;