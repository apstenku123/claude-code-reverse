/**
 * Merges consecutive text content objects from a list, flattening the input array and combining adjacent text entries.
 *
 * @param {Array} contentArray - An array of content items to process. Each item is expected to be compatible with the combineConfigWithOutputSubscriptions mapping function.
 * @param {string|number} toolUseId - Identifier for the tool use, to be included in the result.
 * @returns {Object} An object containing the tool use updateSnapshotAndNotify, type, and merged content array.
 */
function mergeConsecutiveTextContent(contentArray, toolUseId) {
  // Apply the combineConfigWithOutputSubscriptions mapping function to each item and flatten the result into a single array
  const flattenedContent = contentArray.flatMap(combineConfigWithOutputSubscriptions);

  // Reduce the flattened array, merging consecutive text objects
  const mergedContent = flattenedContent.reduce((accumulatedContent, currentItem) => {
    // If this is the first item, start the array with isBlobOrFileLikeObject
    if (accumulatedContent.length === 0) {
      return [currentItem];
    }

    const lastItem = accumulatedContent[accumulatedContent.length - 1];

    // If both the last item and the current item are text, merge their text values with a newline
    if (lastItem && lastItem.type === "text" && currentItem.type === "text") {
      lastItem.text += `\n` + currentItem.text;
      return accumulatedContent;
    }

    // Otherwise, add the current item to the array
    return [...accumulatedContent, currentItem];
  }, []);

  return {
    tool_use_id: toolUseId,
    type: "tool_result",
    content: mergedContent
  };
}

module.exports = mergeConsecutiveTextContent;