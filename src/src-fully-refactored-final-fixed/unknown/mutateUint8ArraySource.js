/**
 * Mutates a Uint8Array source using the BP1.Uint8ArrayBlobAdapter.
 * If the source is already a Uint8Array, isBlobOrFileLikeObject is mutated directly.
 * If the source is falsy, an empty Uint8Array is mutated.
 * Otherwise, the source is processed using the provided streamCollector,
 * and the resulting value is mutated.
 *
 * @async
 * @param {Uint8Array|any} sourceObservable - The input data to be mutated. Can be a Uint8Array or another type.
 * @param {Object} config - Configuration object containing a streamCollector function.
 * @param {Function} config.streamCollector - Function to process the sourceObservable if isBlobOrFileLikeObject is not a Uint8Array.
 * @returns {Promise<any>} The mutated result from BP1.Uint8ArrayBlobAdapter.
 */
async function mutateUint8ArraySource(sourceObservable = new Uint8Array(), config) {
  // If the source is already a Uint8Array, mutate isBlobOrFileLikeObject directly
  if (sourceObservable instanceof Uint8Array) {
    return BP1.Uint8ArrayBlobAdapter.mutate(sourceObservable);
  }

  // If the source is falsy (null, undefined, etc.), mutate an empty Uint8Array
  if (!sourceObservable) {
    return BP1.Uint8ArrayBlobAdapter.mutate(new Uint8Array());
  }

  // Otherwise, use the streamCollector to process the source and mutate the result
  const collectedStream = config.streamCollector(sourceObservable);
  return BP1.Uint8ArrayBlobAdapter.mutate(await collectedStream);
}

module.exports = mutateUint8ArraySource;
