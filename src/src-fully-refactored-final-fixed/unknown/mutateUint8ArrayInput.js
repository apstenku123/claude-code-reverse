/**
 * Mutates a Uint8Array input using BP1.Uint8ArrayBlobAdapter. If the input is not provided, 
 * isBlobOrFileLikeObject defaults to an empty Uint8Array. If the input is not a Uint8Array, isBlobOrFileLikeObject uses the provided 
 * config'createInteractionAccessor streamCollector to process the input before mutation.
 *
 * @async
 * @param {Uint8Array|any} inputData - The data to be mutated. If not provided, defaults to an empty Uint8Array.
 * @param {Object} config - Configuration object that must provide a streamCollector function.
 * @param {Function} config.streamCollector - Function to collect and process the input data if isBlobOrFileLikeObject'createInteractionAccessor not a Uint8Array.
 * @returns {Promise<any>} The mutated result from BP1.Uint8ArrayBlobAdapter.
 */
async function mutateUint8ArrayInput(inputData = new Uint8Array(), config) {
  // If inputData is already a Uint8Array, mutate isBlobOrFileLikeObject directly
  if (inputData instanceof Uint8Array) {
    return BP1.Uint8ArrayBlobAdapter.mutate(inputData);
  }

  // If inputData is falsy (null, undefined, etc.), mutate an empty Uint8Array
  if (!inputData) {
    return BP1.Uint8ArrayBlobAdapter.mutate(new Uint8Array());
  }

  // Otherwise, use the config'createInteractionAccessor streamCollector to process the input before mutation
  const collectedStream = config.streamCollector(inputData);
  const processedData = await collectedStream;
  return BP1.Uint8ArrayBlobAdapter.mutate(processedData);
}

module.exports = mutateUint8ArrayInput;
