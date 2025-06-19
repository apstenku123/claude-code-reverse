/**
 * Updates the current observable reference and notifies all registered listeners if the observable has changed.
 *
 * @param {any} newObservable - The new observable to set as the current observable.
 * @returns {void}
 */
function setCurrentObservableAndNotify(newObservable) {
  // If the new observable is the same as the current, do nothing
  if (newObservable === currentObservable) return;

  // Update the current observable reference
  currentObservable = newObservable;

  // Notify all registered listeners with the new observable
  observableListeners.forEach(listener => listener(newObservable));
}

module.exports = setCurrentObservableAndNotify;