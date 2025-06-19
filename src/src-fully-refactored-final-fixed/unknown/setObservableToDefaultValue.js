/**
 * Sets the provided observable as a key in the internal data map with a default value, then returns the current instance for chaining.
 *
 * @param {Observable} observable - The observable to associate with the default value in the internal data map.
 * @returns {Object} The current instance (for method chaining).
 */
function setObservableToDefaultValue(observable) {
  // Set the observable as a key in the internal __data__ map with the default value 'gv2'
  this.__data__.set(observable, gv2);
  // Return the current instance to allow method chaining
  return this;
}

module.exports = setObservableToDefaultValue;