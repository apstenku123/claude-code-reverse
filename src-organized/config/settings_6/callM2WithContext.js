/**
 * Calls the $M2 function with the current context, passing in the provided observable and configuration.
 * This is typically used to initialize or delegate to a parent class or function with specific parameters.
 *
 * @param {Object} sourceObservable - The observable or data source to be passed to $M2.
 * @param {Object} config - Configuration options to be passed to $M2.
 * @returns {any} The result of calling $M2 with the current context and provided arguments.
 */
function callM2WithContext(sourceObservable, config) {
  // Delegate to $M2 with the current context and provided arguments
  return $M2.call(this, sourceObservable, config);
}

module.exports = callM2WithContext;