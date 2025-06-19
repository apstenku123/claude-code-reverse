/**
 * Sets the global current observable reference.
 *
 * @param {any} sourceObservable - The observable to set as the current reference.
 * @returns {void}
 */
function setCurrentObservable(sourceObservable) {
  // Assign the provided observable to the global reference
  iF0 = sourceObservable;
}

module.exports = setCurrentObservable;