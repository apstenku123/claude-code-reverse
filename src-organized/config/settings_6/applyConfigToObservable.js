/**
 * Applies a configuration to a given observable using the compareValuesWithRegex utility function.
 *
 * @param {Object} config - The configuration object to apply.
 * @param {Object} sourceObservable - The observable to which the configuration will be applied.
 * @returns {any} The result of applying the configuration to the observable via compareValuesWithRegex.
 */
const applyConfigToObservable = (config, sourceObservable) => {
  // Delegates to compareValuesWithRegex, passing config and observable in the required order
  return compareValuesWithRegex(config, sourceObservable);
};

module.exports = applyConfigToObservable;
