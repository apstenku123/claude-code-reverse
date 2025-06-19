/**
 * Applies a list of configurations to a given observable and returns the results.
 *
 * @param {Observable} sourceObservable - The observable to which configurations will be applied.
 * @returns {Array<any>} An array containing the results of applying each configuration to the observable.
 */
function applyConfigurationsToObservable(sourceObservable) {
  // dL9 is assumed to be an array of configuration objects
  // invokeWithSpreadOrDirect is a function that applies a configuration to the observable
  return dL9.map(function (configuration) {
    return invokeWithSpreadOrDirect(sourceObservable, configuration);
  });
}

module.exports = applyConfigurationsToObservable;