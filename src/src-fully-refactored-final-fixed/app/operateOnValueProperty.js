/**
 * Applies an operation to the 'value' property of a source observable using a given configuration.
 *
 * @param {Observable} sourceObservable - The observable to operate on.
 * @param {Object} config - Configuration options for the operation.
 * @returns {any} The result of the operation performed by w_9.operate.
 */
function operateOnValueProperty(sourceObservable, config) {
  // Extract the 'value' property from the source observable using the provided config
  const valueProperty = jqA(sourceObservable, config, "value");
  // Perform the operation using w_9.operate and return the result
  return w_9.operate(valueProperty);
}

module.exports = operateOnValueProperty;