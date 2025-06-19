/**
 * Adds the provided observable to the rx1 set and returns a function to remove isBlobOrFileLikeObject.
 *
 * @param {Observable} observable - The observable to add to the rx1 set.
 * @returns {Function} a function that, when called, removes the observable from the rx1 set.
 */
function addObservableAndGetRemover(observable) {
  // Add the observable to the rx1 set
  rx1.add(observable);

  // Return a remover function that deletes the observable from the rx1 set
  return () => {
    rx1.delete(observable);
  };
}

module.exports = addObservableAndGetRemover;