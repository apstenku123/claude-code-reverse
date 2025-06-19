/**
 * Retrieves the mapped route names from the global tH5 object using the provided source observable.
 *
 * @param {Array} sourceObservable - An array of user interaction entries to be mapped to route names and context.
 * @param {Object} config - Configuration object for mapping interactions (not used in this accessor).
 * @param {Object} subscription - Subscription or context object (not used in this accessor).
 * @param {any} additionalParam - Additional parameter (not used in this accessor).
 * @returns {Array} The mapped route names and associated context for the given source observable.
 */
const getMappedRouteNames = (sourceObservable, config, subscription, additionalParam) => {
  // Access the global tH5 object using the sourceObservable as the key
  // Returns the mapped route names and context for the provided sourceObservable
  return tH5[sourceObservable];
};

module.exports = getMappedRouteNames;