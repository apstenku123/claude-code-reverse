/**
 * Notifies all registered subscribers when the observed value changes.
 *
 * @param {any} newValue - The new value to observe and notify subscribers about.
 * @returns {void}
 *
 * If the new value is the same as the current value, no action is taken.
 * Otherwise, updates the current value and invokes all subscriber callbacks with the new value.
 */
const notifySubscribersOnChange = (newValue) => {
  // If the value hasn'processRuleBeginHandlers changed, do nothing
  if (newValue === currentObservedValue) return;

  // Update the current value
  currentObservedValue = newValue;

  // Notify all subscribers with the new value
  subscriberCallbacks.forEach(subscriberCallback => {
    subscriberCallback(newValue);
  });
};

module.exports = notifySubscribersOnChange;
