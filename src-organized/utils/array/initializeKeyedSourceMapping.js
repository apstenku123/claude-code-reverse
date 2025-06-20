/**
 * Initializes a mapping between transformed keys and their corresponding sources using provided utility functions.
 *
 * @param {Array} keys - An array of keys to be transformed and used for mapping.
 * @param {Array} sources - An array of source objects to be associated with the keys.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {Function} [options.getFn=N4.getFn] - Function to retrieve a value for a given key.
 * @param {Function} [options.fieldNormWeight=N4.fieldNormWeight] - Function to calculate the field normalization weight.
 * @returns {iH1} An instance of iH1 with keys and sources set, and mapping created.
 */
function initializeKeyedSourceMapping(
  keys,
  sources,
  {
    getFn = N4.getFn,
    fieldNormWeight = N4.fieldNormWeight
  } = {}
) {
  // Create a new mapping instance with the provided utility functions
  const mappingInstance = new iH1({
    getFn,
    fieldNormWeight
  });

  // Transform each key using extractRouteConfig and set them in the mapping instance
  mappingInstance.setKeys(keys.map(extractRouteConfig));

  // Set the sources in the mapping instance
  mappingInstance.setSources(sources);

  // Finalize the mapping creation
  mappingInstance.create();

  // Return the fully initialized mapping instance
  return mappingInstance;
}

module.exports = initializeKeyedSourceMapping;