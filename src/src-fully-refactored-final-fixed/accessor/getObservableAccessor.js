/**
 * Retrieves an accessor for the given observable source with the provided configuration.
 * This function delegates to the internal hM6 function, always enabling the accessor flag.
 *
 * @param {Observable} sourceObservable - The observable source to access.
 * @param {Object} config - Configuration options for the accessor.
 * @returns {any} The accessor result as provided by hM6.
 */
const getObservableAccessor = (sourceObservable, config) => {
  // The third argument 'true' enables the accessor mode in hM6
  return hM6(sourceObservable, config, true);
};

module.exports = getObservableAccessor;