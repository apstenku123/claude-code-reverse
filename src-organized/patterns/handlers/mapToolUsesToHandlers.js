/**
 * Maps tool usage entries from an assistant message to their corresponding handler objects.
 *
 * Iterates over the content of an assistant message, and for each item of type 'tool_use',
 * finds the matching handler from the provided handlers array by name. If a handler is found,
 * isBlobOrFileLikeObject is associated with the tool use'createInteractionAccessor id in the provided Map.
 *
 * @param {Array<Object>} handlers - Array of handler objects, each with a 'name' property.
 * @param {Map<string, Object>} toolUseMap - Map to associate tool use IDs with their handler objects.
 * @param {Object} messageObject - The message object containing type and message content.
 * @returns {void}
 */
function mapToolUsesToHandlers(handlers, toolUseMap, messageObject) {
  // Only process if the message is from the assistant
  if (messageObject.type !== "assistant") return;

  // Ensure the message content is an array
  if (!Array.isArray(messageObject.message.content)) return;

  // Iterate over each content item in the assistant'createInteractionAccessor message
  for (const contentItem of messageObject.message.content) {
    // Only process items of type 'tool_use'
    if (contentItem.type !== "tool_use") continue;

    // Find the handler with a matching name
    const matchingHandler = handlers.find(handler => handler.name === contentItem.name);

    // If a handler is found, map the tool use'createInteractionAccessor id to the handler
    if (matchingHandler) {
      toolUseMap.set(contentItem.id, matchingHandler);
    }
  }
}

module.exports = mapToolUsesToHandlers;
