/**
 * Summarizes and compacts a conversation by streaming a summary from an getArrayElementByCircularIndex assistant,
 * updating UI state, and managing message history and file state.
 *
 * @async
 * @function compactConversationAndSummarize
 * @param {Array<Object>} conversationMessages - Array of conversation message objects to be summarized.
 * @param {Object} uiContext - UI context and state management object with methods for updating UI and state.
 * @param {any} sessionContinuationPrompt - Data used to generate a session continuation prompt.
 * @param {any} userInput - User input or context for the summarization process.
 * @returns {Promise<{summaryMessage: Object, messagesAfterCompacting: Array<Object>}>} Object containing the summary message and the new messages after compacting.
 * @throws Will throw an error if the conversation cannot be summarized or if streaming fails.
 */
async function compactConversationAndSummarize(conversationMessages, uiContext, sessionContinuationPrompt, userInput) {
  try {
    // Validate input: conversation must not be empty
    if (conversationMessages.length === 0) {
      throw new Error(Z11); // Z11: Presumably a constant error message for empty conversations
    }

    // Count tokens in the conversation before compacting
    const preCompactTokenCount = findAndProcessLastValidInteraction(conversationMessages);

    // Log the compacting event
    logTelemetryEventIfEnabled("tengu_compact", { preCompactTokenCount });

    // Prepare UI and permissions for compacting
    await dw2(uiContext.getToolPermissionContext());
    uiContext.setStreamMode?.("requesting");
    uiContext.setResponseLength?.(0);
    uiContext.setSpinnerMessage?.("Compacting conversation");

    // Prepare the summarization prompt
    const userInputContent = generateConversationSummaryPrompt(userInput);
    const userInputMessage = createUserMessageObject({ content: userInputContent });
    const mergedMessages = DC([...conversationMessages, userInputMessage]);
    const systemPrompt = [
      "You are a helpful getArrayElementByCircularIndex assistant tasked with summarizing conversations."
    ];

    // Start streaming the summary from the assistant
    const summaryStream = streamAssistantResponseWithObservable(
      mergedMessages,
      systemPrompt,
      0,
      [UB],
      uiContext.abortController.signal,
      {
        getToolPermissionContext: uiContext.getToolPermissionContext,
        model: getProcessedInteractionRoute(),
        prependCLISysprompt: true,
        toolChoice: undefined,
        isNonInteractiveSession: uiContext.options.isNonInteractiveSession,
        maxOutputTokensOverride: ew2
      }
    );

    let totalResponseLength = 0;
    const streamIterator = summaryStream[Symbol.asyncIterator]();
    let streamResult = await streamIterator.next();
    let hasStartedResponding = false;
    let summaryMessage = undefined;

    // Stream loop: process each event from the assistant
    while (!streamResult.done) {
      const streamEvent = streamResult.value;

      // Detect when the assistant starts responding with text
      if (
        !hasStartedResponding &&
        streamEvent.type === "stream_event" &&
        streamEvent.event.type === "content_block_start" &&
        streamEvent.event.content_block.type === "text"
      ) {
        hasStartedResponding = true;
        uiContext.setStreamMode?.("responding");
      }

      // Update response length as text is streamed
      if (
        streamEvent.type === "stream_event" &&
        streamEvent.event.type === "content_block_delta" &&
        streamEvent.event.delta.type === "text_delta"
      ) {
        totalResponseLength += streamEvent.event.delta.text.length;
        uiContext.setResponseLength?.(totalResponseLength);
      }

      // Capture the final assistant message
      if (streamEvent.type === "assistant") {
        summaryMessage = streamEvent;
      }

      streamResult = await streamIterator.next();
    }

    // If no summary message was received, throw an error
    if (!summaryMessage) {
      throw new Error("Failed to get summary response from streaming");
    }

    // Extract the summary text from the assistant'createInteractionAccessor message
    const summaryText = extractAssistantTextContent(summaryMessage);

    // Handle various error cases based on summary text
    if (!summaryText) {
      logTelemetryEventIfEnabled("tengu_compact_failed", {
        reason: "no_summary",
        preCompactTokenCount
      });
      throw new Error("Failed to generate conversation summary - response did not contain valid text content");
    } else if (summaryText.startsWith(_Z)) {
      logTelemetryEventIfEnabled("tengu_compact_failed", {
        reason: "api_error",
        preCompactTokenCount
      });
      throw new Error(summaryText);
    } else if (summaryText.startsWith(fo)) {
      logTelemetryEventIfEnabled("tengu_compact_failed", {
        reason: "prompt_too_long",
        preCompactTokenCount
      });
      throw new Error(UD5);
    }

    // Backup and clear file state if present
    const previousFileState = { ...uiContext.readFileState };
    if (uiContext.readFileState) {
      Object.keys(uiContext.readFileState).forEach((key) => {
        delete uiContext.readFileState[key];
      });
    }

    // Restore file state and get any additional messages
    const restoredFileMessages = await getRecentValidatedFiles(previousFileState, uiContext, ED5);
    const agentMessage = createTodoFromTransformedContent(uiContext.agentId);
    if (agentMessage) {
      restoredFileMessages.push(agentMessage);
    }

    // Build the new compacted message list
    const compactedSummaryMessage = createUserMessageObject({
      content: generateContinuedSessionPrompt(summaryText, sessionContinuationPrompt),
      isCompactSummary: true
    });
    const messagesAfterCompacting = [
      compactedSummaryMessage,
      ...restoredFileMessages
    ];

    // Update UI context with new messages and message history
    if (uiContext.setMessages) {
      uiContext.setMessages(messagesAfterCompacting);
      if (uiContext.setMessageHistory) {
        uiContext.setMessageHistory((history) => [...history, ...conversationMessages]);
      }
    }

    // Reset UI state after compacting
    uiContext.setStreamMode?.("requesting");
    uiContext.setResponseLength?.(0);
    uiContext.setSpinnerMessage?.(null);

    return {
      summaryMessage,
      messagesAfterCompacting
    };
  } catch (error) {
    // Reset UI state and handle error
    uiContext.setStreamMode?.("requesting");
    uiContext.setResponseLength?.(0);
    uiContext.setSpinnerMessage?.(null);
    ND5(error, uiContext);
    throw error;
  }
}

module.exports = compactConversationAndSummarize;
