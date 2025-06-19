/**
 * Sets the value of a specific observable property to true.
 *
 * @param {Object} observableInstance - The observable object that exposes a setValue method.
 * @returns {*} The result of the setValue call on the observable instance.
 */
function enableObservableValue(observableInstance) {
  // Yv1 is assumed to be a constant key representing the property to set on the observable
  // The value is set to true
  return observableInstance.setValue(Yv1, true);
}

module.exports = enableObservableValue;