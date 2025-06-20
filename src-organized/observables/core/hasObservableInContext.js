/**
 * Checks if the provided observable exists within the current context'createInteractionAccessor observable set.
 *
 * @param {Object} observable - The observable to check for existence in the context.
 * @returns {boolean} True if the observable exists in the context, otherwise false.
 */
function hasObservableInContext(observable) {
  // Retrieve the set of observables associated with the current context (this)
  const observableSet = Oq(this, observable);
  // Check if the provided observable exists in the set
  return observableSet.has(observable);
}

module.exports = hasObservableInContext;