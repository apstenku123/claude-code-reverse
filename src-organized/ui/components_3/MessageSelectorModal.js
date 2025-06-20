/**
 * Displays a modal allowing the user to select a previous message to fork the conversation from.
 * Handles keyboard navigation, selection, and cancellation events.
 *
 * @param {Object} props - The properties for the message selector modal.
 * @param {Set<string>} props.erroredToolUseIDs - Set of tool use IDs that have errored.
 * @param {Array<Object>} props.messages - List of message objects in the conversation.
 * @param {Function} props.onSelect - Callback invoked when a message is selected.
 * @param {Function} props.onEscape - Callback invoked when the modal is cancelled.
 * @param {Array<Object>} props.tools - List of available tools.
 * @param {Set<string>} props.unresolvedToolUseIDs - Set of unresolved tool use IDs.
 * @returns {React.ReactElement} The rendered message selector modal.
 */
function MessageSelectorModal({
  erroredToolUseIDs,
  messages,
  onSelect,
  onEscape,
  tools,
  unresolvedToolUseIDs
}) {
  // Memoized current prompt UUID
  const currentPromptUUID = yO.useMemo(fW5, []);

  // Fire analytics event when modal opens
  yO.useEffect(() => {
    logTelemetryEventIfEnabled("tengu_message_selector_opened", {});
  }, []);

  /**
   * Handles selection of a message.
   * Fires analytics and invokes the onSelect callback.
   * @param {Object} selectedMessage
   */
  function handleSelectMessage(selectedMessage) {
    const indexFromEnd = messages.length - 1 - messages.indexOf(selectedMessage);
    logTelemetryEventIfEnabled("tengu_message_selector_selected", {
      index_from_end: indexFromEnd,
      message_type: selectedMessage.type,
      is_current_prompt: selectedMessage.uuid === currentPromptUUID
    });
    onSelect(selectedMessage);
  }

  /**
   * Handles modal cancellation (escape/tab).
   * Fires analytics and invokes the onEscape callback.
   */
  function handleCancelModal() {
    logTelemetryEventIfEnabled("tengu_message_selector_cancelled", {});
    onEscape();
  }

  // Memoized list of selectable messages, plus a synthetic current prompt message
  const selectableMessages = yO.useMemo(
    () => [
      ...messages.filter(isValidUserMessage),
      {
        ...createUserMessageObject({ content: "" }),
        uuid: currentPromptUUID
      }
    ],
    [messages, currentPromptUUID]
  );

  // State: currently selected message index
  const [selectedIndex, setSelectedIndex] = yO.useState(selectableMessages.length - 1);

  // Keyboard context (for showing key hints)
  const keyboardContext = useCtrlKeyActionHandler();

  // Keyboard navigation handler
  D0((_, keyEvent) => {
    if (keyEvent.tab || keyEvent.escape) {
      handleCancelModal();
      return;
    }
    if (keyEvent.return) {
      handleSelectMessage(selectableMessages[selectedIndex]);
      return;
    }
    // Up arrow: move selection up (with modifiers jumps to top)
    if (keyEvent.upArrow) {
      if (keyEvent.ctrl || keyEvent.shift || keyEvent.meta) {
        setSelectedIndex(0);
      } else {
        setSelectedIndex(prev => Math.max(0, prev - 1));
      }
    }
    // Down arrow: move selection down (with modifiers jumps to bottom)
    if (keyEvent.downArrow) {
      if (keyEvent.ctrl || keyEvent.shift || keyEvent.meta) {
        setSelectedIndex(selectableMessages.length - 1);
      } else {
        setSelectedIndex(prev => Math.min(selectableMessages.length - 1, prev + 1));
      }
    }
  });

  // Calculate the visible window of messages for scrolling
  const VISIBLE_ROWS = BH1;
  const visibleStartIndex = Math.max(
    0,
    Math.min(
      selectedIndex - Math.floor(VISIBLE_ROWS / 2),
      selectableMessages.length - VISIBLE_ROWS
    )
  );

  // Memoized filtered messages for rendering (used by renderMessageByType component)
  const filteredMessages = yO.useMemo(() => s3(messages).filter(isValidMessageEntry), [messages]);

  // Theme styles
  const theme = getThemeStylesheet();

  // Render modal
  return S4.createElement(
    S4.Fragment,
    null,
    S4.createElement(
      g,
      {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: theme.secondaryBorder,
        height: 4 + Math.min(VISIBLE_ROWS, selectableMessages.length) * 2,
        paddingX: 1,
        marginTop: 1
      },
      // Header
      S4.createElement(
        g,
        {
          flexDirection: "column",
          minHeight: 2,
          marginBottom: 1
        },
        S4.createElement(_, { bold: true }, "Jump to a previous message"),
        S4.createElement(_, { dimColor: true }, "This will fork the conversation")
      ),
      // Message list
      selectableMessages
        .slice(visibleStartIndex, visibleStartIndex + VISIBLE_ROWS)
        .map((message, idx) => {
          const isSelected = visibleStartIndex + idx === selectedIndex;
          const isCurrentPrompt = message.uuid === currentPromptUUID;
          return S4.createElement(
            g,
            {
              key: message.uuid,
              flexDirection: "row",
              height: 2,
              minHeight: 2
            },
            // Selection pointer and index
            S4.createElement(
              g,
              { width: 7 },
              isSelected
                ? S4.createElement(_, { color: "blue", bold: true }, y0.pointer, " ", visibleStartIndex + idx + 1, " ")
                : S4.createElement(_, null, "  ", visibleStartIndex + idx + 1, " ")
            ),
            // Message preview/content
            S4.createElement(
              g,
              { height: 1, overflow: "hidden", width: 100 },
              isCurrentPrompt
                ? S4.createElement(
                    g,
                    { width: "100%" },
                    S4.createElement(_, { dimColor: true, italic: true }, "(current)")
                  )
                : Array.isArray(message.message.content) &&
                  message.message.content[0]?.type === "text" &&
                  IK1(message.message.content[0].text)
                ? S4.createElement(_, { dimColor: true, italic: true }, "(empty message)")
                : S4.createElement(renderMessageByType, {
                    message: CD(s3([message])),
                    messages: filteredMessages,
                    addMargin: false,
                    tools,
                    verbose: false,
                    erroredToolUseIDs,
                    inProgressToolUseIDs: new Set(),
                    unresolvedToolUseIDs,
                    shouldAnimate: false,
                    shouldShowDot: false,
                    progressMessagesForMessage: []
                  })
            )
          );
        })
    ),
    // Footer with key hints
    S4.createElement(
      g,
      { marginLeft: 3 },
      S4.createElement(
        _,
        { dimColor: true },
        keyboardContext.pending
          ? S4.createElement(S4.Fragment, null, "Press ", keyboardContext.keyName, " again to exit")
          : S4.createElement(
              S4.Fragment,
              null,
              "↑/↓ to select · Enter to confirm · Tab/Esc to cancel"
            )
      )
    )
  );
}

module.exports = MessageSelectorModal;