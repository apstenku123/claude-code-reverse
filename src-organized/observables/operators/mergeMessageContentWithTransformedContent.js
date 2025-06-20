/**
 * Merges the content of the source message with a transformed version based on another message'createInteractionAccessor content.
 *
 * This function takes two message objects, transforms their 'content' fields using the external 'normalizeTextEntry' function,
 * then combines the transformed contents using the external 'mergeToolResultWithTextEntries' function. The result is a new object based on the
 * first message, but with its 'content' property replaced by the merged/transformed content.
 *
 * @param {Object} sourceMessageObj - The original message object whose content will be merged.
 * @param {Object} targetMessageObj - The message object providing content for merging/transformation.
 * @returns {Object} a new message object with merged/transformed content.
 */
function mergeMessageContentWithTransformedContent(sourceMessageObj, targetMessageObj) {
  // Transform the content of both source and target messages using normalizeTextEntry
  const transformedSourceContent = normalizeTextEntry(sourceMessageObj.message.content);
  const transformedTargetContent = normalizeTextEntry(targetMessageObj.message.content);

  // Merge/transform the two contents using mergeToolResultWithTextEntries
  const mergedContent = mergeToolResultWithTextEntries(transformedSourceContent, transformedTargetContent);

  // Return a new object with the merged content, preserving all other properties
  return {
    ...sourceMessageObj,
    message: {
      ...sourceMessageObj.message,
      content: mergedContent
    }
  };
}

module.exports = mergeMessageContentWithTransformedContent;