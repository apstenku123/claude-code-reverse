/**
 * Checks if the given observable reference exists within the current context using the Oq utility.
 *
 * @param {any} observableReference - The observable reference to check for existence.
 * @returns {boolean} True if the observable reference exists in the context; otherwise, false.
 */
function hasObservableReference(observableReference) {
  // Use the Oq utility to get the collection of observables for this context,
  // then check if the provided observableReference exists in that collection.
  return Oq(this, observableReference).has(observableReference);
}

module.exports = hasObservableReference;