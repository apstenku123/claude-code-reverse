/**
 * Initializes a keyed source collection by mapping provided keys, setting sources, and creating the collection.
 *
 * @param {Array<any>} keys - The array of keys to be mapped and set in the collection.
 * @param {Array<any>} sources - The array of source objects to be set in the collection.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {Function} [options.getFn=N4.getFn] - Function to retrieve values for keys.
 * @param {Function} [options.fieldNormWeight=N4.fieldNormWeight] - Function to determine field normalization weight.
 * @returns {iH1} The initialized keyed source collection instance.
 */
function initializeKeyedSourceCollection(
  keys,
  sources,
  {
    getFn = N4.getFn,
    fieldNormWeight = N4.fieldNormWeight
  } = {}
) {
  // Create a new instance of iH1 with provided getter and field normalization functions
  const keyedSourceCollection = new iH1({
    getFn,
    fieldNormWeight
  });

  // Map the keys using extractRouteConfig and set them in the collection
  const mappedKeys = keys.map(extractRouteConfig);
  keyedSourceCollection.setKeys(mappedKeys);

  // Set the sources in the collection
  keyedSourceCollection.setSources(sources);

  // Finalize the collection setup
  keyedSourceCollection.create();

  // Return the fully initialized collection
  return keyedSourceCollection;
}

module.exports = initializeKeyedSourceCollection;