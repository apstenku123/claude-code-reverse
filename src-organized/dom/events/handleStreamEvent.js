/**
 * Handles incoming stream events and updates UI state, tool input, or delegates to a fallback handler.
 *
 * @param {Object} streamEvent - The event object received from the stream.
 * @param {Function} fallbackHandler - Function to call for non-stream events.
 * @param {Function} updateContent - Function to update content (e.g., text, thinking, signature) in the UI.
 * @param {Function} updateUiState - Function to update the UI state (e.g., 'responding', 'thinking', etc.).
 * @param {Function} updateToolInputs - Function to update the tool input state, typically with a callback.
 * @returns {void}
 */
function handleStreamEvent(
  streamEvent,
  fallbackHandler,
  updateContent,
  updateUiState,
  updateToolInputs
) {
  // If not a stream event or stream request start, delegate to fallback handler
  if (
    streamEvent.type !== "stream_event" &&
    streamEvent.type !== "stream_request_start"
  ) {
    fallbackHandler(streamEvent);
    return;
  }

  // Handle stream request start
  if (streamEvent.type === "stream_request_start") {
    updateUiState("requesting");
    return;
  }

  // Handle message stop event
  if (streamEvent.event.type === "message_stop") {
    updateUiState("tool-use");
    updateToolInputs(() => []);
    return;
  }

  // Handle content block start events
  switch (streamEvent.event.type) {
    case "content_block_start": {
      const { content_block: contentBlock, index: contentBlockIndex } = streamEvent.event;
      switch (contentBlock.type) {
        case "thinking":
        case "redacted_thinking":
          updateUiState("thinking");
          return;
        case "text":
          updateUiState("responding");
          return;
        case "tool_use": {
          // Start tool input and add new tool input entry
          updateUiState("tool-input");
          updateToolInputs(previousInputs => [
            ...previousInputs,
            {
              index: contentBlockIndex,
              contentBlock,
              unparsedToolInput: ""
            }
          ]);
          return;
        }
        case "server_tool_use":
        case "web_search_tool_result":
          updateUiState("tool-input");
          return;
        default:
          break;
      }
      break;
    }
    case "content_block_delta": {
      const { delta, index: deltaIndex } = streamEvent.event;
      switch (delta.type) {
        case "text_delta":
          updateContent(delta.text);
          return;
        case "input_json_delta": {
          // Update tool input JSON for the matching tool input entry
          const partialJson = delta.partial_json;
          updateContent(partialJson);
          updateToolInputs(previousInputs => {
            // Find the tool input entry by index
            const matchingInput = previousInputs.find(
              input => input.index === deltaIndex
            );
            if (!matchingInput) return previousInputs;
            // Update the matching entry'createInteractionAccessor unparsedToolInput
            return [
              ...previousInputs.filter(input => input !== matchingInput),
              {
                ...matchingInput,
                unparsedToolInput:
                  matchingInput.unparsedToolInput + partialJson
              }
            ];
          });
          return;
        }
        case "thinking_delta":
          updateContent(delta.thinking);
          return;
        case "signature_delta":
          updateContent(delta.signature);
          return;
        default:
          return;
      }
    }
    default:
      // Fallback: set UI state to responding
      updateUiState("responding");
      return;
  }
}

module.exports = handleStreamEvent;
