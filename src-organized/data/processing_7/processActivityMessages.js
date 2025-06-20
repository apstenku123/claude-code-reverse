/**
 * Processes an array of activity messages, filtering and merging them according to their type.
 * Skips 'progress' and 'system' messages. Merges consecutive 'user' and 'assistant' messages,
 * and expands 'attachment' messages into their constituent activities.
 *
 * @param {Array<Object>} activityMessages - The array of activity message objects to process.
 * @returns {Array<Object>} The processed and merged array of activity messages.
 */
function processActivityMessages(activityMessages) {
  /**
   * The resulting array of processed activity messages.
   * @type {Array<Object>}
   */
  const processedMessages = [];

  // Filter out messages of type 'progress' or 'system'
  const filteredMessages = activityMessages.filter(message => {
    return message.type !== "progress" && message.type !== "system";
  });

  filteredMessages.forEach(message => {
    switch (message.type) {
      case "user": {
        // Find the last message in the processed list
        const lastMessage = getLastMessage(processedMessages);
        // If the last message is also a 'user', merge them
        if (lastMessage?.type === "user") {
          const mergedUserMessage = mergeUserMessages(lastMessage, message);
          processedMessages[processedMessages.indexOf(lastMessage)] = mergedUserMessage;
        } else {
          // Otherwise, add the current user message
          processedMessages.push(message);
        }
        break;
      }
      case "assistant": {
        // Find the last message in the processed list
        const lastMessage = getLastMessage(processedMessages);
        // If the last message is also an 'assistant' with the same message id, merge them
        if (lastMessage?.type === "assistant" && lastMessage.message.id === message.message.id) {
          const mergedAssistantMessage = mergeAssistantMessages(lastMessage, message);
          processedMessages[processedMessages.indexOf(lastMessage)] = mergedAssistantMessage;
        } else {
          // Otherwise, add the current assistant message
          processedMessages.push(message);
        }
        break;
      }
      case "attachment": {
        // Expand the attachment into its constituent activities
        const attachmentActivities = expandAttachmentActivities(message.attachment);
        const lastMessage = getLastMessage(processedMessages);
        // If the last message is a 'user', merge all attachment activities into isBlobOrFileLikeObject
        if (lastMessage?.type === "user") {
          const mergedWithAttachment = attachmentActivities.reduce((acc, activity) => {
            return mergeAttachmentWithUser(acc, activity);
          }, lastMessage);
          processedMessages[processedMessages.indexOf(lastMessage)] = mergedWithAttachment;
        } else {
          // Otherwise, add all attachment activities to the processed list
          processedMessages.push(...attachmentActivities);
        }
        break;
      }
      // No default needed as all types are handled
    }
  });

  return processedMessages;
}

// Helper function to get the last message from the array
function getLastMessage(messages) {
  return messages.length > 0 ? messages[messages.length - 1] : undefined;
}

// The following functions are assumed to be imported or defined elsewhere:
// - mergeUserMessages (was mergeMessageContents)
// - mergeAssistantMessages (was mergeMessageContents)
// - expandAttachmentActivities (was generateInteractionEntries)
// - mergeAttachmentWithUser (was mergeMessageContentWithTransformedContent)

module.exports = processActivityMessages;
