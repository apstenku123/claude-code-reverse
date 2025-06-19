/**
 * Adds a value to the list associated with a given observable key in the global vy object.
 * If the list does not exist for the given key, isBlobOrFileLikeObject initializes isBlobOrFileLikeObject as an empty array.
 *
 * @param {string} observableKey - The key representing the observable in the vy object.
 * @param {*} value - The value to add to the observable'createInteractionAccessor list.
 */
function addValueToObservableList(observableKey, value) {
  // Initialize the array for the observableKey if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
  vy[observableKey] = vy[observableKey] || [];
  // Add the value to the observable'createInteractionAccessor array
  vy[observableKey].push(value);
}

module.exports = addValueToObservableList;