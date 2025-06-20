/**
 * Updates the snapshot value and getter on the provided observer object.
 * If the observer is in a 'notifiable' state, triggers a notification on the source object.
 *
 * @param {Object} sourceObject - The object that may be notified (e.g., a store or observable).
 * @param {Object} observer - The observer object whose snapshot and getter are updated.
 * @param {*} newSnapshotValue - The new snapshot value to assign to the observer.
 * @param {Function} snapshotGetter - The function to retrieve the current snapshot value.
 * @returns {void}
 */
function updateSnapshotAndNotifyIfNeeded(sourceObject, observer, newSnapshotValue, snapshotGetter) {
  // Update the observer'createInteractionAccessor current value
  observer.value = newSnapshotValue;
  // Set the observer'createInteractionAccessor snapshot getter function
  observer.getSnapshot = snapshotGetter;
  // If the observer is in a notifiable state, notify the source object
  if (hasSnapshotValueChanged(observer)) {
    $createDebouncedFunction(sourceObject);
  }
}

module.exports = updateSnapshotAndNotifyIfNeeded;