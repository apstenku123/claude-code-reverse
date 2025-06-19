/**
 * Converts a given source (Uint8Array or compatible) into a Blob adapter using BP1.Uint8ArrayBlobAdapter.mutate.
 * If the source is already a Uint8Array, isBlobOrFileLikeObject is mutated directly. If the source is falsy, an empty Uint8Array is used.
 * Otherwise, the source is processed using the provided config'createInteractionAccessor streamCollector, and the result is mutated.
 *
 * @async
 * @param {Uint8Array|any} sourceData - The data to be converted or mutated. If not provided, defaults to an empty Uint8Array.
 * @param {Object} config - Configuration object that must contain a streamCollector function.
 * @param {Function} config.streamCollector - Function to process the sourceData if isBlobOrFileLikeObject is not a Uint8Array.
 * @returns {Promise<any>} The result of BP1.Uint8ArrayBlobAdapter.mutate applied to the processed data.
 */
async function mutateUint8ArrayToBlobAdapter(sourceData = new Uint8Array(), config) {
  // If the source is already a Uint8Array, mutate isBlobOrFileLikeObject directly
  if (sourceData instanceof Uint8Array) {
    return BP1.Uint8ArrayBlobAdapter.mutate(sourceData);
  }

  // If the source is falsy (null, undefined, etc.), mutate an empty Uint8Array
  if (!sourceData) {
    return BP1.Uint8ArrayBlobAdapter.mutate(new Uint8Array());
  }

  // Otherwise, process the source using the provided streamCollector, then mutate the result
  const collectedStream = config.streamCollector(sourceData);
  const collectedData = await collectedStream;
  return BP1.Uint8ArrayBlobAdapter.mutate(collectedData);
}

module.exports = mutateUint8ArrayToBlobAdapter;
