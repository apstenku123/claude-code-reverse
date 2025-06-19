/**
 * Initializes a keyed source manager with provided keys and sources.
 *
 * @param {Array} keyDefinitions - An array of key definitions to be mapped and set as keys.
 * @param {Array} sourceData - An array of source data to be set as sources.
 * @param {Object} [options={}] - Optional configuration for the manager.
 * @param {Function} [options.getFn=N4.getFn] - Function to retrieve values for keys.
 * @param {Function} [options.fieldNormWeight=N4.fieldNormWeight] - Function to calculate field normalization weight.
 * @returns {iH1} An instance of the keyed source manager, initialized with keys and sources.
 */
function initializeKeyedSourceManager(
  keyDefinitions,
  sourceData,
  {
    getFn = N4.getFn,
    fieldNormWeight = N4.fieldNormWeight
  } = {}
) {
  // Create a new instance of the keyed source manager with provided functions
  const keyedSourceManager = new iH1({
    getFn,
    fieldNormWeight
  });

  // Map key definitions using extractRouteConfig and set them as keys
  keyedSourceManager.setKeys(keyDefinitions.map(extractRouteConfig));

  // Set the provided source data
  keyedSourceManager.setSources(sourceData);

  // Finalize the manager'createInteractionAccessor setup
  keyedSourceManager.create();

  // Return the initialized manager instance
  return keyedSourceManager;
}

module.exports = initializeKeyedSourceManager;