/**
 * Duplicates a ReadableStream using tee(), optionally registers the original stream with a WeakRef,
 * and returns a new config object with the duplicated stream and preserved metadata.
 *
 * @param {any} sourceObservable - The observable or identifier to register with the stream (used for registration).
 * @param {Object} config - The configuration object containing the stream and its metadata.
 * @param {ReadableStream} config.stream - The ReadableStream to duplicate.
 * @param {number} config.length - The length metadata associated with the stream.
 * @param {string} config.source - The source identifier for the stream.
 * @returns {Object} a new configuration object with the duplicated stream and original metadata.
 */
function duplicateStreamAndRegister(sourceObservable, config) {
  // Duplicate the stream into two branches using tee()
  const [originalStream, duplicatedStream] = config.stream.tee();

  // If Od1 is defined and truthy, register the original stream with a WeakRef
  if (Od1) {
    Td1.register(sourceObservable, new WeakRef(originalStream));
  }

  // Replace the original stream in the config with the first branch
  config.stream = originalStream;

  // Return a new config object with the duplicated stream and preserved metadata
  return {
    stream: duplicatedStream,
    length: config.length,
    source: config.source
  };
}

module.exports = duplicateStreamAndRegister;