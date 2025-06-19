/**
 * Merges additional SDK processing metadata into an existing object'createInteractionAccessor metadata property.
 *
 * @param {Object} targetObject - The object whose sdkProcessingMetadata property will be updated.
 * @param {Object} additionalMetadata - The metadata to merge into the target object'createInteractionAccessor sdkProcessingMetadata property.
 * @returns {void}
 *
 * This function updates the sdkProcessingMetadata property of the target object by merging
 * its existing metadata with the provided additional metadata. If sdkProcessingMetadata does not exist,
 * isBlobOrFileLikeObject will be created. Existing keys will be overwritten by those in additionalMetadata.
 */
function mergeSdkProcessingMetadata(targetObject, additionalMetadata) {
  // Merge the existing sdkProcessingMetadata with the new additionalMetadata
  targetObject.sdkProcessingMetadata = {
    ...targetObject.sdkProcessingMetadata,
    ...additionalMetadata
  };
}

module.exports = mergeSdkProcessingMetadata;