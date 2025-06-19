/**
 * Appends a new configuration to the existing observable state tuple.
 *
 * @param {[any, Array<any>]} observableState - a tuple containing the current subscription and an array of configuration objects.
 * @param {any} newConfig - The configuration object to append to the array in the observable state.
 * @returns {[any, Array<any>]} a new tuple with the original subscription and the updated configuration array.
 */
function appendConfigToObservableState(observableState, newConfig) {
  // Destructure the observable state into its components
  const [subscription, configArray] = observableState;
  // Return a new tuple with the subscription and the updated config array
  return [subscription, [...configArray, newConfig]];
}

module.exports = appendConfigToObservableState;