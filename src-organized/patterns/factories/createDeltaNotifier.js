/**
 * Creates a notifier function that tracks changes in a numeric value and triggers a callback with the delta.
 *
 * @param {Function} onDelta - Callback function to invoke when a delta is detected.
 * @param {Object} valueConfig - Object containing a 'value' property (number) and a 'delta' property (number).
 * @param {boolean} isSubscribed - Indicates if the notifier should always trigger on call.
 * @returns {Function} Notifier function that takes a boolean flag to force notification.
 */
function createDeltaNotifier(onDelta, valueConfig, isSubscribed) {
  let previousValue;
  let delta;

  /**
   * Notifies if the value has changed or if forced by parameters.
   * @param {boolean} forceNotify - If true, forces the notification regardless of value change.
   */
  return function notifyIfChanged(forceNotify) {
    // Only proceed if the value is non-negative
    if (valueConfig.value >= 0) {
      // Notify if forced or if always subscribed
      if (forceNotify || isSubscribed) {
        // Compute the delta between current and previous value
        delta = valueConfig.value - (previousValue || 0);
        // Notify if delta is non-zero or if previousValue is undefined
        if (delta || previousValue === undefined) {
          previousValue = valueConfig.value;
          valueConfig.delta = delta;
          onDelta(valueConfig);
        }
      }
    }
  };
}

module.exports = createDeltaNotifier;