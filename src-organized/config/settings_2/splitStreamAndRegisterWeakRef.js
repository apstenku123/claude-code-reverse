/**
 * Splits a ReadableStream into two branches using tee(), optionally registers a WeakRef to one branch,
 * and returns a new config object with the second branch as the stream.
 *
 * @param {any} sourceObservable - The observable or identifier to register with the WeakRef (used as a key).
 * @param {Object} config - The configuration object containing the stream, length, and source.
 * @param {ReadableStream} config.stream - The ReadableStream to be split.
 * @param {number} config.length - The length of the stream or associated data.
 * @param {any} config.source - The original source of the stream.
 * @returns {Object} a new config object with the split stream and original metadata.
 */
function splitStreamAndRegisterWeakRef(sourceObservable, config) {
  // Split the stream into two branches using tee()
  const [primaryStream, secondaryStream] = config.stream.tee();

  // If Od1 is defined and truthy, register a WeakRef to the primary stream
  if (Od1) {
    Td1.register(sourceObservable, new WeakRef(primaryStream));
  }

  // Replace the original stream in config with the primary stream
  config.stream = primaryStream;

  // Return a new config object with the secondary stream and original metadata
  return {
    stream: secondaryStream,
    length: config.length,
    source: config.source
  };
}

module.exports = splitStreamAndRegisterWeakRef;