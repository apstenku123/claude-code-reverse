/**
 * Appends a new configuration object to the list of configurations associated with an observable subscription.
 *
 * @param {[any, Array<any>]} observableWithConfigs - a tuple containing the observable subscription and its associated configuration array.
 * @param {any} newConfig - The configuration object to append to the configuration array.
 * @returns {[any, Array<any>]} a new tuple with the original observable subscription and the updated configuration array.
 */
function appendConfigToObservable(observableWithConfigs, newConfig) {
  // Destructure the tuple into the observable subscription and its configuration array
  const [subscription, configArray] = observableWithConfigs;

  // Return a new tuple with the subscription and the configuration array with the new config appended
  return [subscription, [...configArray, newConfig]];
}

module.exports = appendConfigToObservable;