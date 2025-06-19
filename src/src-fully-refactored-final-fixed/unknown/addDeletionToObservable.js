/**
 * Adds a deletion entry to the observable'createInteractionAccessor deletions list and updates its flags.
 *
 * @param {Object} observable - The observable object to which the deletion will be added. Should have 'deletions' and 'flags' properties.
 * @param {any} deletionEntry - The entry representing the deletion to be added.
 * @returns {void}
 */
function addDeletionToObservable(observable, deletionEntry) {
  // Check if the global 'processWithTransformedObservable' flag is enabled before proceeding
  if (processWithTransformedObservable) {
    // Retrieve the current deletions array from the observable
    let deletionsList = observable.deletions;

    if (deletionsList === null) {
      // If no deletions exist, initialize the deletions array with the new entry
      observable.deletions = [deletionEntry];
      // Update the observable'createInteractionAccessor flags to indicate a deletion (bitwise OR with 16)
      observable.flags |= 16;
    } else {
      // If deletions already exist, add the new entry to the array
      deletionsList.push(deletionEntry);
    }
  }
}

module.exports = addDeletionToObservable;