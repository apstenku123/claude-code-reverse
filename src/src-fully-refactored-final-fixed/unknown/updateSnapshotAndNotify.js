/**
 * Updates the snapshot and getSnapshot function on the provided state object, then notifies if necessary.
 *
 * @param {object} context - The context or owner object, typically used for notification.
 * @param {object} stateObject - The object whose value and getSnapshot will be updated.
 * @param {any} newValue - The new value to assign to stateObject.value.
 * @param {function} getSnapshotFunction - The function to assign to stateObject.getSnapshot.
 * @returns {void}
 */
function updateSnapshotAndNotify(context, stateObject, newValue, getSnapshotFunction) {
  // Update the value property with the new value
  stateObject.value = newValue;

  // Update the getSnapshot property with the provided function
  stateObject.getSnapshot = getSnapshotFunction;

  // If the state object is eligible for notification, notify using the context
  if (hasSnapshotValueChanged(stateObject)) {
    $createDebouncedFunction(context);
  }
}

module.exports = updateSnapshotAndNotify;