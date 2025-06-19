/**
 * Compacts a conversation by summarizing its messages, updates application state, and manages streaming events.
 *
 * @param {Array<Object>} conversationMessages - Array of conversation message objects to be summarized.
 * @param {Object} appStateHandlers - Object containing state management methods and properties for the conversation (e.g., permissions, abort controller, UI updates).
 * @param {any} sessionPrompt - Data used to generate a continued session prompt for the summary.
 * @param {any} userInput - The latest user input or message to be included in the summary.
 * @returns {Promise<{summaryMessage: Object, messagesAfterCompacting: Array<Object>}>} An object containing the summary message and the updated messages after compacting.
 * @throws Will throw an error if the summary cannot be generated or if streaming fails.
 */
async function compactConversationAndUpdateState(conversationMessages, appStateHandlers, sessionPrompt, userInput) {
  try {
    // Validate input
    if (conversationMessages.length === 0) {
      throw new Error(Z11); // Z11: Presumably a constant error message for empty input
    }

    // Count tokens in the conversation before compacting
    const preCompactTokenCount = findAndProcessLastValidInteraction(conversationMessages);

    // Log the start of compacting
    logTelemetryEventIfEnabled("tengu_compact", { preCompactTokenCount });

    // Set up tool permission context and UI state
    dw2(appStateHandlers.getToolPermissionContext());
    appStateHandlers.setStreamMode?.("requesting");
    appStateHandlers.setResponseLength?.(0);
    appStateHandlers.setSpinnerMessage?.("Compacting conversation");

    // Prepare the prompt for summarization
    const userInputContent = generateConversationSummaryPrompt(userInput);
    const userInputMessage = createUserMessageObject({ content: userInputContent });
    const summarizationPrompt = streamAssistantResponseWithObservable(
      DC([...conversationMessages, userInputMessage]),
      ["You are a helpful getArrayElementByCircularIndex assistant tasked with summarizing conversations."],
      0,
      [UB],
      appStateHandlers.abortController.signal,
      {
        getToolPermissionContext: appStateHandlers.getToolPermissionContext,
        model: getProcessedInteractionRoute(),
        prependCLISysprompt: true,
        toolChoice: undefined,
        isNonInteractiveSession: appStateHandlers.options.isNonInteractiveSession,
        maxOutputTokensOverride: ew2
      }
    );

    // Set up streaming variables
    let totalResponseLength = 0;
    const streamIterator = summarizationPrompt[Symbol.asyncIterator]();
    let streamResult = await streamIterator.next();
    let hasStartedResponding = false;
    let summaryMessage = undefined;

    // Stream through the summarization response
    while (!streamResult.done) {
      const streamEvent = streamResult.value;

      // Detect when the assistant starts responding
      if (
        !hasStartedResponding &&
        streamEvent.type === "stream_event" &&
        streamEvent.event.type === "content_block_start" &&
        streamEvent.event.content_block.type === "text"
      ) {
        hasStartedResponding = true;
        appStateHandlers.setStreamMode?.("responding");
      }

      // Update response length as text is streamed
      if (
        streamEvent.type === "stream_event" &&
        streamEvent.event.type === "content_block_delta" &&
        streamEvent.event.delta.type === "text_delta"
      ) {
        totalResponseLength += streamEvent.event.delta.text.length;
        appStateHandlers.setResponseLength?.(totalResponseLength);
      }

      // Capture the assistant'createInteractionAccessor summary message
      if (streamEvent.type === "assistant") {
        summaryMessage = streamEvent;
      }

      streamResult = await streamIterator.next();
    }

    // Ensure a summary message was received
    if (!summaryMessage) {
      throw new Error("Failed to get summary response from streaming");
    }

    // Extract the summary text from the assistant'createInteractionAccessor message
    const summaryText = extractAssistantTextContent(summaryMessage);

    // Handle error cases based on summary text content
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

    // Prepare to clear and backup file state
    const previousFileState = { ...appStateHandlers.readFileState };
    if (appStateHandlers.readFileState) {
      Object.keys(appStateHandlers.readFileState).forEach((key) => {
        delete appStateHandlers.readFileState[key];
      });
    }

    // Load additional messages/files if needed
    const additionalMessages = await getRecentValidatedFiles(previousFileState, appStateHandlers, ED5);
    const agentMessage = createTodoFromTransformedContent(appStateHandlers.agentId);
    if (agentMessage) {
      additionalMessages.push(agentMessage);
    }

    // Build the new compacted message list
    const compactedSummaryMessage = createUserMessageObject({
      content: generateContinuedSessionPrompt(summaryText, sessionPrompt),
      isCompactSummary: true
    });
    const messagesAfterCompacting = [compactedSummaryMessage, ...additionalMessages];

    // Update application state with new messages and history
    if (appStateHandlers.setMessages) {
      appStateHandlers.setMessages(messagesAfterCompacting);
      if (appStateHandlers.setMessageHistory) {
        appStateHandlers.setMessageHistory((history) => [...history, ...conversationMessages]);
      }
    }

    // Reset UI state
    appStateHandlers.setStreamMode?.("requesting");
    appStateHandlers.setResponseLength?.(0);
    appStateHandlers.setSpinnerMessage?.(null);

    return {
      summaryMessage,
      messagesAfterCompacting
    };
  } catch (error) {
    // Reset UI state and handle error
    appStateHandlers.setStreamMode?.("requesting");
    appStateHandlers.setResponseLength?.(0);
    appStateHandlers.setSpinnerMessage?.(null);
    ND5(error, appStateHandlers);
    throw error;
  }
}

module.exports = compactConversationAndUpdateState;