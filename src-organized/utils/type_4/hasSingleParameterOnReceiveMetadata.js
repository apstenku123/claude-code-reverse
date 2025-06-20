/**
 * Checks if the given object has an 'onReceiveMetadata' property
 * and that this property is a function accepting exactly one argument.
 *
 * @param {Object} sourceObject - The object to check for the 'onReceiveMetadata' property.
 * @returns {boolean} True if 'onReceiveMetadata' exists and takes one parameter, otherwise false.
 */
function hasSingleParameterOnReceiveMetadata(sourceObject) {
  // Ensure 'onReceiveMetadata' property exists and is not undefined
  // Then check if its 'length' property equals 1 (i.e., expects one argument)
  return sourceObject.onReceiveMetadata !== undefined &&
    sourceObject.onReceiveMetadata.length === 1;
}

module.exports = hasSingleParameterOnReceiveMetadata;
