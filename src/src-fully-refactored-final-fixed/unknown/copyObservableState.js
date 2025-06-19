/**
 * Copies the state properties from a source observable-like object to the current instance.
 *
 * @param {Object} sourceObservable - The observable-like object whose state will be copied.
 * @param {Object} sourceObservable.head - The head node of the observable'createInteractionAccessor internal state.
 * @param {Object} sourceObservable.tail - The tail node of the observable'createInteractionAccessor internal state.
 * @param {number} sourceObservable.len - The length of the observable'createInteractionAccessor internal state.
 * @param {Object} sourceObservable.states - The next state or states of the observable.
 * @returns {void}
 *
 * @example
 * // Usage within a class constructor or method
 * copyObservableState.call(this, sourceObservable);
 */
function copyObservableState(sourceObservable) {
  // Copy the head node reference
  this.head = sourceObservable.head;
  // Copy the tail node reference
  this.tail = sourceObservable.tail;
  // Copy the length property
  this.len = sourceObservable.len;
  // Copy the next states reference
  this.next = sourceObservable.states;
}

module.exports = copyObservableState;
