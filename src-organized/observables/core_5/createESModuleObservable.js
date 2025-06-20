/**
 * Creates a new observable object that is marked as an ES module and copies all own properties (including symbols) from the source observable.
 *
 * @param {object} sourceObservable - The observable object to copy properties from.
 * @returns {object} a new object with __esModule set to true and all properties from the source observable copied as getters.
 */
const createESModuleObservable = (sourceObservable) => {
  // Create a config object with __esModule property set to true
  const esModuleConfig = p31({}, "__esModule", {
    value: true
  });

  // Use copyMissingPropertiesWithGetters (copyMissingPropertiesWithGetters) to copy all properties from sourceObservable
  // to esModuleConfig, preserving property descriptors and using getters
  return copyMissingPropertiesWithGetters(esModuleConfig, sourceObservable);
};

module.exports = createESModuleObservable;
