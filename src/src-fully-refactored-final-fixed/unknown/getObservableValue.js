/**
 * Retrieves the current value from an observable-like object.
 *
 * @param {Object} sourceObservable - An object that contains a 'value' property, typically representing the current state or value of an observable.
 * @param {Object} config - Additional configuration or options (unused in this function).
 * @returns {*} The current value held by the sourceObservable'createInteractionAccessor 'value' property.
 */
function getObservableValue(sourceObservable, config) {
  // Return the current value from the observable-like object
  return sourceObservable.value;
}

module.exports = getObservableValue;