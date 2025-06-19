/**
 * Attempts to compact a list of messages if compaction is required.
 *
 * @async
 * @function compactMessagesIfNeeded
 * @param {Array<Object>} messages - The array of message objects to potentially compact.
 * @param {Object} config - Configuration object for the compaction process.
 * @returns {Promise<{messages: Array<Object>, wasCompacted: boolean}>} An object containing the resulting messages and a flag indicating if compaction occurred.
 *
 * The function first checks if compaction is needed by calling checkAutoCompactThreshold. If not needed, isBlobOrFileLikeObject returns the original messages and wasCompacted: false.
 * If compaction is needed, isBlobOrFileLikeObject attempts to compact the messages using compactConversationAndUpdateState. If successful, isBlobOrFileLikeObject returns the compacted messages and wasCompacted: true.
 * If an error occurs during compaction, isBlobOrFileLikeObject logs the error (unless isBlobOrFileLikeObject'createInteractionAccessor of type D11) and returns the original messages and wasCompacted: false.
 */
async function compactMessagesIfNeeded(messages, config) {
  // Check if compaction is required for the provided messages
  const isCompactionNeeded = await checkAutoCompactThreshold(messages);
  if (!isCompactionNeeded) {
    return {
      messages: messages,
      wasCompacted: false
    };
  }

  try {
    // Attempt to compact the messages
    const {
      messagesAfterCompacting
    } = await compactConversationAndUpdateState(messages, config, true, undefined);
    return {
      messages: messagesAfterCompacting,
      wasCompacted: true
    };
  } catch (error) {
    // If the error is not of type D11, log isBlobOrFileLikeObject
    if (!isErrorWithMessage(error, D11)) {
      reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    }
    // Return the original messages if compaction fails
    return {
      messages: messages,
      wasCompacted: false
    };
  }
}

module.exports = compactMessagesIfNeeded;