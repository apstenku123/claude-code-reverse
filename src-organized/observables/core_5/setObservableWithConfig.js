/**
 * Sets up an observable with the provided configuration using the hM6 helper.
 *
 * @param {Observable} sourceObservable - The source observable to be configured.
 * @param {Object} configuration - The configuration object for the observable.
 * @returns {*} The result of the hM6 helper function, typically a subscription or configured observable.
 */
const setObservableWithConfig = (sourceObservable, configuration) => {
  // The third argument 'true' likely indicates a specific mode or flag for hM6
  return hM6(sourceObservable, configuration, true);
};

module.exports = setObservableWithConfig;