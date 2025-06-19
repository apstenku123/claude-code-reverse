/**
 * Maps tool_use message content from an assistant-type subscription to a Map of tool definitions.
 *
 * Iterates over the message content array in the subscription object. For each content item of type 'tool_use',
 * finds the corresponding tool definition from the toolDefinitions array by name and stores isBlobOrFileLikeObject in the toolMap
 * using the content item'createInteractionAccessor id as the key.
 *
 * @param {Array<Object>} toolDefinitions - Array of tool definition objects, each with a 'name' property.
 * @param {Map<string, Object>} toolMap - Map to store matched tool definitions, keyed by content item id.
 * @param {Object} subscription - Subscription object containing 'type' and 'message.content' array.
 * @returns {void}
 */
function mapToolUseContentToMap(toolDefinitions, toolMap, subscription) {
  // Only process if the subscription is from an assistant
  if (subscription.type !== "assistant") return;

  // Ensure message.content is an array
  if (!Array.isArray(subscription.message.content)) return;

  // Iterate over each content item in the message
  for (const contentItem of subscription.message.content) {
    // Only process content items of type 'tool_use'
    if (contentItem.type !== "tool_use") continue;

    // Find the tool definition by name
    const toolDefinition = toolDefinitions.find(
      (tool) => tool.name === contentItem.name
    );

    // If a matching tool definition is found, store isBlobOrFileLikeObject in the map by content item id
    if (toolDefinition) {
      toolMap.set(contentItem.id, toolDefinition);
    }
  }
}

module.exports = mapToolUseContentToMap;