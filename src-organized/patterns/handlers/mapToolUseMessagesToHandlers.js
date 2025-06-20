/**
 * Maps 'tool_use' messages from an assistant-type subscription to their corresponding handlers and stores them in a Map.
 *
 * @param {Array<Object>} toolHandlers - Array of tool handler objects, each with a 'name' property.
 * @param {Map<string, Object>} handlerMap - Map to store the mapping from message id to handler object.
 * @param {Object} subscription - Subscription object containing the message and its type.
 * @returns {void}
 */
function mapToolUseMessagesToHandlers(toolHandlers, handlerMap, subscription) {
  // Only process if the subscription is from an assistant
  if (subscription.type !== "assistant") return;

  // Ensure the message content is an array
  if (!Array.isArray(subscription.message.content)) return;

  // Iterate over each message in the content array
  for (const messageItem of subscription.message.content) {
    // Only process messages of type 'tool_use'
    if (messageItem.type !== "tool_use") continue;

    // Find the corresponding handler by name
    const matchingHandler = toolHandlers.find(handler => handler.name === messageItem.name);

    // If a matching handler is found, map the message id to the handler
    if (matchingHandler) {
      handlerMap.set(messageItem.id, matchingHandler);
    }
  }
}

module.exports = mapToolUseMessagesToHandlers;