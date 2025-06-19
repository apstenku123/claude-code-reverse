/**
 * Sets the __esModule property to true on a new object and processes isBlobOrFileLikeObject with the provided observable.
 *
 * @param {any} sourceObservable - The observable or object to be processed.
 * @returns {any} The result of processing the object with the __esModule flag set to true.
 */
const setEsModuleFlagAndProcess = (sourceObservable) => {
  // Create a new object with __esModule property set to true
  const esModuleConfig = AQ1({}, "__esModule", {
    value: true
  });
  // Pass the config and the source observable to copyMissingPropertiesWithGetters for further processing
  return copyMissingPropertiesWithGetters(esModuleConfig, sourceObservable);
};

module.exports = setEsModuleFlagAndProcess;