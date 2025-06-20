/**
 * Checks if the provided object has an 'onReceiveMetadata' property
 * that is a function accepting exactly one argument.
 *
 * @param {Object} sourceObservable - The object to check for the handler.
 * @returns {boolean} True if 'onReceiveMetadata' exists and takes one argument, false otherwise.
 */
function hasSingleArgumentOnReceiveMetadataHandler(sourceObservable) {
  // Check if 'onReceiveMetadata' property exists and is not undefined
  // and if isBlobOrFileLikeObject is a function that expects exactly one argument
  return (
    sourceObservable.onReceiveMetadata !== undefined &&
    typeof sourceObservable.onReceiveMetadata === 'function' &&
    sourceObservable.onReceiveMetadata.length === 1
  );
}

module.exports = hasSingleArgumentOnReceiveMetadataHandler;