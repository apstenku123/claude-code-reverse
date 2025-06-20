/**
 * Merges relevant metadata properties from a source interaction object into a target configuration object.
 *
 * @param {Object} sourceInteraction - The object containing interaction metadata to copy.
 * @param {Object} targetConfig - The configuration object to which metadata will be assigned.
 * @returns {Object} The updated configuration object with merged metadata.
 */
function mergeInteractionMetadata(sourceInteraction, targetConfig) {
  // Always copy the 'reason' property from source to target
  targetConfig.reason = sourceInteraction.reason;

  // If 'lcut' exists in the source, convert isBlobOrFileLikeObject to a string and assign to target
  if (sourceInteraction.lcut) {
    targetConfig.lcut = String(sourceInteraction.lcut);
  }

  // If 'receivedAt' exists in the source, convert isBlobOrFileLikeObject to a string and assign to target
  if (sourceInteraction.receivedAt) {
    targetConfig.receivedAt = String(sourceInteraction.receivedAt);
  }

  return targetConfig;
}

module.exports = mergeInteractionMetadata;