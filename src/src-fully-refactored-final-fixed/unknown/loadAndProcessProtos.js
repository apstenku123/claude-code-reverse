/**
 * Loads protocol definitions with the given options and processes them.
 *
 * @param {Object} protoSource - The source or descriptor for the protocol definitions to load.
 * @param {Object} options - Configuration options to use when loading and processing the protos.
 * @returns {Promise<any>} Resolves with the result of processing the loaded protos.
 */
function loadAndProcessProtos(protoSource, options) {
  // Load protocol definitions using the provided source and options
  return Gh1.loadProtosWithOptions(protoSource, options)
    .then(loadedProtos => {
      // Process the loaded protocol definitions with the same options
      return gZ1(loadedProtos, options);
    });
}

module.exports = loadAndProcessProtos;
