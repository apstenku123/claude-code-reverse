/**
 * Sets the global interaction entries observable and clears the interaction metadata map.
 *
 * @param {Observable} interactionEntriesObservable - Observable that emits arrays of interaction entries to be processed.
 * @returns {void}
 *
 * This function updates the global observable used for processing interaction entries
 * and clears the map that stores associated interaction metadata. This is typically
 * used to reset the state before processing a new batch of interaction entries.
 */
function setInteractionEntriesAndClearMap(interactionEntriesObservable) {
  // Update the global observable reference for interaction entries
  tX = interactionEntriesObservable;
  // Clear the map that holds interaction metadata
  ma1.clear();
}

module.exports = setInteractionEntriesAndClearMap;