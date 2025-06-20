/**
 * Determines if the current value differs from the latest snapshot value.
 *
 * @param {Object} observableWrapper - An object containing a value and a getSnapshot method.
 * @param {any} observableWrapper.value - The current value to compare.
 * @param {Function} observableWrapper.getSnapshot - Function that returns the latest snapshot value.
 * @returns {boolean} True if the value has changed compared to the snapshot, or if an error occurs during snapshot retrieval; otherwise, false.
 */
function hasSnapshotValueChanged(observableWrapper) {
  const { getSnapshot, value: currentValue } = observableWrapper;
  try {
    // Retrieve the latest snapshot value
    const snapshotValue = getSnapshot();
    // Compare current value with snapshot value using LB (deep equality check or similar)
    return !LB(currentValue, snapshotValue);
  } catch (error) {
    // If an error occurs (e.g., snapshot retrieval fails), assume value has changed
    return true;
  }
}

module.exports = hasSnapshotValueChanged;