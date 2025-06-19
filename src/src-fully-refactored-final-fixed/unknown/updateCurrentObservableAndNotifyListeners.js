/**
 * Updates the current observable reference and notifies all registered listeners if the observable has changed.
 *
 * @param {any} newObservable - The new observable or value to set as the current reference.
 * @returns {void}
 *
 * If the new observable is the same as the current one, no action is taken.
 * Otherwise, updates the current observable and notifies all listeners by invoking them with the new value.
 */
const updateCurrentObservableAndNotifyListeners = (newObservable) => {
  // If the new observable is the same as the current, do nothing
  if (newObservable === currentObservable) return;

  // Update the current observable reference
  currentObservable = newObservable;

  // Notify all registered listeners with the new observable
  listeners.forEach(listenerCallback => listenerCallback(newObservable));
};

module.exports = updateCurrentObservableAndNotifyListeners;
