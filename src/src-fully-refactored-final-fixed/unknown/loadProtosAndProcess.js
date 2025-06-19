/**
 * Loads protocol definitions synchronously with the provided options and processes the result.
 *
 * @param {string} protoSource - The source path or identifier for the protocol definitions to load.
 * @param {object} options - Configuration options for loading and processing the protocol definitions.
 * @returns {any} The result of processing the loaded protocol definitions with the given options.
 */
function loadProtosAndProcess(protoSource, options) {
  // Load protocol definitions synchronously using the provided source and options
  const loadedProtos = Gh1.loadProtosWithOptionsSync(protoSource, options);
  // Process the loaded protocol definitions with the same options
  return gZ1(loadedProtos, options);
}

module.exports = loadProtosAndProcess;