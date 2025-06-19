/**
 * Processes a sequence of security messages, ensuring the last message is not from a user,
 * and applies a transformation to each message using a provided configuration.
 *
 * @param {string} sourceString - The source string to process into message objects.
 * @param {object} config - The configuration object used during message processing.
 * @returns {Array<object>} The processed array of message objects.
 * @throws Will rethrow any error encountered during processing after logging isBlobOrFileLikeObject.
 */
function processSecurityMessages(sourceString, config) {
  try {
    // Generate an array of message objects from the source string
    const messageObjects = sliceStringUpToIndex(sourceString);

    // If the last message is from a user, append a new message with default content
    if (messageObjects[messageObjects.length - 1]?.type === "user") {
      messageObjects.push(formatContentWithUsage({ content: le }));
    }

    // Create a Map to track processed messages or related state
    const processedMessagesMap = new Map();

    // Apply the transformation to each message object
    for (const messageObject of messageObjects) {
      mapToolUsesToHandlers(config, processedMessagesMap, messageObject);
    }

    // Return the processed array of message objects
    return messageObjects;
  } catch (error) {
    // Log the error using reportErrorIfAllowed and rethrow
    reportErrorIfAllowed(error);
    throw error;
  }
}

module.exports = processSecurityMessages;