/**
 * Initializes and configures a keyed source mapper instance.
 *
 * This function creates a new iH1 instance (a keyed source mapper),
 * sets its keys by mapping the provided keys array through the extractRouteConfig function,
 * sets its sources, and then creates the instance.
 *
 * @param {Array} keysArray - The array of keys to be mapped and set on the mapper.
 * @param {Array} sourcesArray - The array of source objects to be set as sources.
 * @param {Object} [options={}] - Optional configuration for the mapper.
 * @param {Function} [options.getFn=N4.getFn] - Function to retrieve values for each key.
 * @param {Function} [options.fieldNormWeight=N4.fieldNormWeight] - Function to calculate field normalization weight.
 * @returns {iH1} The configured and created keyed source mapper instance.
 */
function initializeKeyedSourceMapper(
  keysArray,
  sourcesArray,
  {
    getFn = N4.getFn,
    fieldNormWeight = N4.fieldNormWeight
  } = {}
) {
  // Create a new keyed source mapper instance with the provided functions
  const keyedSourceMapper = new iH1({
    getFn,
    fieldNormWeight
  });

  // Map the keys using extractRouteConfig and set them on the mapper
  keyedSourceMapper.setKeys(keysArray.map(extractRouteConfig));

  // Set the sources on the mapper
  keyedSourceMapper.setSources(sourcesArray);

  // Finalize the creation of the mapper
  keyedSourceMapper.create();

  // Return the configured mapper instance
  return keyedSourceMapper;
}

module.exports = initializeKeyedSourceMapper;