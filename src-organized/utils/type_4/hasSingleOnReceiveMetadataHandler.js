/**
 * Checks if the provided object has an 'onReceiveMetadata' property
 * and that property is a function accepting exactly one argument.
 *
 * @param {Object} sourceObservable - The object to check for the 'onReceiveMetadata' handler.
 * @returns {boolean} True if 'onReceiveMetadata' exists and takes one argument; otherwise, false.
 */
function hasSingleOnReceiveMetadataHandler(sourceObservable) {
  // Check if 'onReceiveMetadata' property exists and is not undefined
  // Then check if its 'length' property is exactly 1 (i.e., expects one argument)
  return (
    sourceObservable.onReceiveMetadata !== undefined &&
    sourceObservable.onReceiveMetadata.length === 1
  );
}

module.exports = hasSingleOnReceiveMetadataHandler;