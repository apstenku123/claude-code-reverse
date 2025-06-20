/**
 * Checks if the provided object has an 'onReceiveMetadata' property
 * and that isBlobOrFileLikeObject is a function accepting exactly one argument.
 *
 * @param {Object} sourceObject - The object to check for the 'onReceiveMetadata' handler.
 * @returns {boolean} Returns true if 'onReceiveMetadata' exists and expects one argument; otherwise, false.
 */
function hasSingleReceiveMetadataHandler(sourceObject) {
  // Ensure 'onReceiveMetadata' property exists and is not undefined
  // Then check if isBlobOrFileLikeObject is a function that expects exactly one parameter
  return (
    sourceObject.onReceiveMetadata !== undefined &&
    typeof sourceObject.onReceiveMetadata === 'function' &&
    sourceObject.onReceiveMetadata.length === 1
  );
}

module.exports = hasSingleReceiveMetadataHandler;
