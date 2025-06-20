/**
 * Renders a message selector UI component allowing users to jump to a previous message in a conversation.
 * Handles keyboard navigation, selection, and cancellation, and reports analytics events.
 *
 * @param {Object} props - The properties for the message selector.
 * @param {Array<string>} props.erroredToolUseIDs - IDs of tool uses that encountered errors.
 * @param {Array<Object>} props.messages - List of message objects in the conversation.
 * @param {Function} props.onSelect - Callback when a message is selected.
 * @param {Function} props.onEscape - Callback when the selector is cancelled.
 * @param {Array<Object>} props.tools - List of available tools.
 * @param {Array<string>} props.unresolvedToolUseIDs - IDs of unresolved tool uses.
 * @returns {React.ReactElement} The rendered message selector component.
 */
function MessageSelector({
  erroredToolUseIDs,
  messages,
  onSelect,
  onEscape,
  tools,
  unresolvedToolUseIDs
}) {
  // Memoized current prompt UUID
  const currentPromptUUID = yO.useMemo(fW5, []);

  // Analytics: Track when the selector is opened
  yO.useEffect(() => {
    logTelemetryEventIfEnabled("tengu_message_selector_opened", {});
  }, []);

  /**
   * Handles selection of a message.
   * Reports analytics and calls the onSelect callback.
   * @param {Object} message - The selected message object.
   */
  function handleSelectMessage(message) {
    const indexFromEnd = messages.length - 1 - messages.indexOf(message);
    logTelemetryEventIfEnabled("tengu_message_selector_selected", {
      index_from_end: indexFromEnd,
      message_type: message.type,
      is_current_prompt: message.uuid === currentPromptUUID
    });
    onSelect(message);
  }

  /**
   * Handles cancellation (escape/tab).
   * Reports analytics and calls the onEscape callback.
   */
  function handleCancel() {
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

  // UI theme/styles
  const theme = useCtrlKeyActionHandler();

  // Keyboard navigation handler
  D0((_, keyEvent) => {
    if (keyEvent.tab || keyEvent.escape) {
      handleCancel();
      return;
    }
    if (keyEvent.return) {
      handleSelectMessage(selectableMessages[selectedIndex]);
      return;
    }
    // Up arrow: move selection up, or to top if ctrl/shift/meta held
    if (keyEvent.upArrow) {
      if (keyEvent.ctrl || keyEvent.shift || keyEvent.meta) {
        setSelectedIndex(0);
      } else {
        setSelectedIndex(prev => Math.max(0, prev - 1));
      }
    }
    // Down arrow: move selection down, or to bottom if ctrl/shift/meta held
    if (keyEvent.downArrow) {
      if (keyEvent.ctrl || keyEvent.shift || keyEvent.meta) {
        setSelectedIndex(selectableMessages.length - 1);
      } else {
        setSelectedIndex(prev => Math.min(selectableMessages.length - 1, prev + 1));
      }
    }
  });

  // Determine the window of messages to display (for scrolling/virtualization)
  const MAX_VISIBLE_MESSAGES = BH1;
  const visibleStartIndex = Math.max(
    0,
    Math.min(
      selectedIndex - Math.floor(MAX_VISIBLE_MESSAGES / 2),
      selectableMessages.length - MAX_VISIBLE_MESSAGES
    )
  );

  // Memoized filtered messages for rendering
  const filteredMessages = yO.useMemo(() => s3(messages).filter(isValidMessageEntry), [messages]);

  // Render
  return S4.createElement(
    S4.Fragment,
    null,
    S4.createElement(
      g,
      {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: getThemeStylesheet().secondaryBorder,
        height: 4 + Math.min(MAX_VISIBLE_MESSAGES, selectableMessages.length) * 2,
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
        .slice(visibleStartIndex, visibleStartIndex + MAX_VISIBLE_MESSAGES)
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
            // Message preview or status
            S4.createElement(
              g,
              {
                height: 1,
                overflow: "hidden",
                width: 100
              },
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
                    tools: tools,
                    verbose: false,
                    erroredToolUseIDs: erroredToolUseIDs,
                    inProgressToolUseIDs: new Set(),
                    unresolvedToolUseIDs: unresolvedToolUseIDs,
                    shouldAnimate: false,
                    shouldShowDot: false,
                    progressMessagesForMessage: []
                  })
            )
          );
        })
    ),
    // Footer/help text
    S4.createElement(
      g,
      { marginLeft: 3 },
      S4.createElement(
        _,
        { dimColor: true },
        theme.pending
          ? S4.createElement(S4.Fragment, null, "Press ", theme.keyName, " again to exit")
          : S4.createElement(S4.Fragment, null, "↑/↓ to select · Enter to confirm · Tab/Esc to cancel")
      )
    )
  );
}

module.exports = MessageSelector;