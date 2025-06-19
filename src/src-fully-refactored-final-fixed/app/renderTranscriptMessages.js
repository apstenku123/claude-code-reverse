/**
 * Renders the transcript messages and related UI elements for the conversation screen.
 * Handles message history, tool uses, tips, subscription banners, truncation indicators, and more.
 *
 * @param {Object} params - The parameters for rendering transcript messages.
 * @param {Array} params.messages - The array of all message objects in the current conversation.
 * @param {Array} params.normalizedMessageHistory - The normalized message history from previous conversations.
 * @param {Array} params.tools - The array of available tool definitions.
 * @param {boolean} params.verbose - Whether to show verbose output for tools.
 * @param {React.Element} params.toolJSX - JSX for rendering tool UI.
 * @param {Array} params.toolUseConfirmQueue - Queue of tool use confirmations.
 * @param {Set} params.inProgressToolUseIDs - Set of tool use IDs currently in progress.
 * @param {boolean} params.isMessageSelectorVisible - Whether the message selector UI is visible.
 * @param {string|null} params.tipOfTheDay - Optional tip of the day string.
 * @param {string} params.conversationId - The current conversation'createInteractionAccessor unique updateSnapshotAndNotify.
 * @param {string} params.screen - The current screen type (e.g., 'transcript').
 * @param {string} params.screenToggleId - Unique updateSnapshotAndNotify for toggling the screen.
 * @param {Array} params.streamingToolUses - Array of tool use objects that are currently streaming.
 * @param {boolean} [params.showAllInTranscript=false] - Whether to show all messages in the transcript (overrides truncation).
 * @returns {React.Element} The rendered transcript message list and related UI elements.
 */
function renderTranscriptMessages({
  messages,
  normalizedMessageHistory,
  tools,
  verbose,
  toolJSX,
  toolUseConfirmQueue,
  inProgressToolUseIDs,
  isMessageSelectorVisible,
  tipOfTheDay,
  conversationId,
  screen,
  screenToggleId,
  streamingToolUses,
  showAllInTranscript = false
}) {
  // Main loop model accessor (custom hook)
  const mainLoopModel = useMainLoopModelAccessor();

  // Get layout columns (custom hook)
  const { columns: layoutColumns } = Z4();

  // Subscription state (custom hooks)
  const isMaxSubscription = useSubscriptionNoticeEligibility();
  const isSubscriptionUpsell = useShouldShowSubscriptionUpsell();

  // Install messages state
  const [installMessages, setInstallMessages] = G9.useState([]);
  G9.useEffect(() => {
    Uz1().then(setInstallMessages);
  }, []);

  // Memoized filtered messages (excluding progress, etc.)
  const filteredMessages = aO.useMemo(() => s3(messages).filter(isValidMessageEntry), [messages]);
  const unresolvedToolUseIDs = aO.useMemo(() => MO(filteredMessages), [filteredMessages]);
  const erroredToolUseIDs = aO.useMemo(() => QK1(filteredMessages), [filteredMessages]);

  // Memoized streaming tool uses that are not in progress and not already in filteredMessages
  const streamingToolUsesToShow = aO.useMemo(() => streamingToolUses.filter(toolUse => {
    if (inProgressToolUseIDs.has(toolUse.contentBlock.id)) return false;
    // Exclude if already present as a tool_use message in filteredMessages
    if (filteredMessages.some(msg =>
      msg.type === "assistant" &&
      msg.message.content[0].type === "tool_use" &&
      msg.message.content[0].id === toolUse.contentBlock.id
    )) return false;
    return true;
  }), [streamingToolUses, inProgressToolUseIDs, filteredMessages]);

  // Memoized content blocks for streaming tool uses
  const streamingToolUseContentBlocks = aO.useMemo(() =>
    streamingToolUsesToShow.flatMap(toolUse => s3([streamAsyncIterableToWritable$({ content: [toolUse.contentBlock] })])),
    [streamingToolUsesToShow]
  );

  /**
   * Builds the list of message items (static and transient) to render.
   * @param {boolean} isVerbose - Whether to show verbose output.
   * @returns {Array} List of message item objects with type and jsx.
   */
  const buildMessageItems = aO.useCallback((isVerbose) => {
    const isTranscriptScreen = screen === "transcript";
    const shouldTruncate = isTranscriptScreen && !showAllInTranscript;
    const truncatedMessages = shouldTruncate ? filteredMessages.slice(-wA1) : filteredMessages;
    const isTruncated = shouldTruncate && filteredMessages.length > wA1;

    // Compose static UI elements (logo, tip, subscription banners, install messages, truncation indicators, etc.)
    const staticItems = [
      {
        type: "static",
        jsx: G9.createElement(g, {
          flexDirection: "column",
          gap: 1,
          key: `logo-${conversationId}-${screenToggleId}`
        },
          G9.createElement(renderWelcomePanel, { model: mainLoopModel }),
          HW1() ? G9.createElement(ProjectOnboardingTips, null) : G9.createElement(AuthStatusPanel, null)
        )
      },
      // Tip of the day (if not demo)
      ...(!isTruthyString(process.env.IS_DEMO) && tipOfTheDay ? [
        {
          type: "static",
          jsx: G9.createElement(g, {
            key: `tip-of-the-day-${conversationId}-${screenToggleId}`
          }, G9.createElement(TipMessageRenderer, { tip: tipOfTheDay }))
        }
      ] : []),
      // Max subscription banner
      ...(isMaxSubscription ? [
        {
          type: "static",
          jsx: G9.createElement(g, {
            key: `max-subscription-${conversationId}-${screenToggleId}`
          }, G9.createElement(SubscriptionNoticeBanner, null))
        }
      ] : []),
      // Subscription upsell banner (if not max subscription)
      ...(isSubscriptionUpsell && !isMaxSubscription ? [
        {
          type: "static",
          jsx: G9.createElement(g, {
            key: `subscription-upsell-${conversationId}-${screenToggleId}`
          }, G9.createElement(renderProcessedInteractionEntry, null))
        }
      ] : []),
      // Install messages (if any)
      ...(installMessages.length > 0 ? [
        {
          type: "static",
          jsx: G9.createElement(g, {
            key: `install-messages-${conversationId}-${screenToggleId}`,
            flexDirection: "column",
            paddingLeft: 1
          }, installMessages.map((installMsg, idx) =>
            G9.createElement(g, {
              key: idx,
              flexDirection: "row",
              marginTop: 1
            },
              G9.createElement(_, { color: getThemeStylesheet().warning }, y0.bullet),
              G9.createElement(_, { color: getThemeStylesheet().warning }, " ", installMsg)
            )
          ))
        }
      ] : []),
      // Truncation indicator (show/hide previous messages)
      ...(isTruncated ? [
        {
          type: "static",
          jsx: G9.createElement(nu, {
            key: `truncation-indicator-${conversationId}-${screenToggleId}`,
            dividerChar: "─",
            title: `Ctrl+createDebouncedFunction to show ${FA.bold(filteredMessages.length - wA1)} previous messages`,
            titleColor: "gray",
            dividerColor: "gray",
            width: layoutColumns
          })
        }
      ] : []),
      // Hide indicator (when showing all in transcript)
      ...(isTranscriptScreen && showAllInTranscript && filteredMessages.length > wA1 ? [
        {
          type: "static",
          jsx: G9.createElement(nu, {
            key: `hide-indicator-${conversationId}-${screenToggleId}`,
            dividerChar: "─",
            title: `Ctrl+createDebouncedFunction to hide ${FA.bold(filteredMessages.length - wA1)} previous messages`,
            titleColor: "gray",
            dividerColor: "gray",
            width: layoutColumns
          })
        }
      ] : []),
      // Previous conversation history (if any)
      ...(normalizedMessageHistory.length > 0 ? [
        {
          type: "static",
          jsx: G9.createElement(g, {
            flexDirection: "column",
            gap: 1,
            key: `history-${conversationId}-${screenToggleId}`
          },
            // Render previous conversation messages (excluding progress and meta user messages)
            mergeAndOrderMessages(
              normalizedMessageHistory.filter(msg => msg.type !== "progress")
                .filter(msg => msg.type !== "user" || !msg.isMeta),
              []
            ).map(historyMsg =>
              G9.createElement(g, {
                key: `history-${historyMsg.uuid}-${screenToggleId}`,
                width: layoutColumns - 5
              },
                G9.createElement(renderMessageByType, {
                  message: historyMsg,
                  messages: normalizedMessageHistory,
                  addMargin: true,
                  tools,
                  verbose: isVerbose,
                  erroredToolUseIDs: new Set(),
                  inProgressToolUseIDs: new Set(),
                  progressMessagesForMessage: [],
                  shouldAnimate: false,
                  shouldShowDot: true,
                  unresolvedToolUseIDs: new Set()
                })
              )
            ),
            G9.createElement(nu, {
              dividerChar: "=",
              title: "Previous Conversation Compacted"
            })
          )
        }
      ] : [])
    ];

    // Compose main transcript messages (merge with streaming tool uses)
    const transcriptItems = mergeAndOrderMessages(
      truncatedMessages.filter(msg => msg.type !== "progress")
        .filter(msg => msg.type !== "user" || !msg.isMeta),
      streamingToolUseContentBlocks
    ).map(message => {
      const relevantInteractionId = extractRelevantInteractionId(message);
      const progressMessages = filterProgressEventsByParentToolUseId(message, filteredMessages);
      // Render compact summary or regular message
      const messageJSX = (message.type === "user" && message.isCompactSummary)
        ? G9.createElement(CompactSummaryPanel, { message, screen })
        : G9.createElement(renderMessageByType, {
            message,
            messages: filteredMessages,
            addMargin: true,
            tools,
            verbose: isVerbose,
            erroredToolUseIDs: erroredToolUseIDs,
            inProgressToolUseIDs,
            progressMessagesForMessage: progressMessages,
            shouldAnimate: !toolJSX && !toolUseConfirmQueue.length && !isMessageSelectorVisible && (!relevantInteractionId || inProgressToolUseIDs.has(relevantInteractionId)),
            shouldShowDot: true,
            unresolvedToolUseIDs
          });
      // Determine if message is static or transient
      const isStatic = shouldAllowInteractionEntry(
        message,
        messages,
        new Set(streamingToolUses.map(toolUse => toolUse.contentBlock.id)),
        unresolvedToolUseIDs,
        screen
      );
      return {
        type: isStatic ? "static" : "transient",
        jsx: G9.createElement(g, {
          key: `${message.uuid}-${progressMessages.length}-${screenToggleId}`,
          width: layoutColumns - 5
        }, messageJSX)
      };
    }).filter(Boolean);

    // Optionally add extra static UI at the end
    const extraStaticItems = Lw2() ? [{ type: "static", jsx: G9.createElement(renderDataSharingMessageComponent, null) }] : [];

    return [
      ...staticItems,
      ...transcriptItems,
      ...extraStaticItems
    ];
  }, [
    screen,
    showAllInTranscript,
    filteredMessages,
    conversationId,
    screenToggleId,
    mainLoopModel,
    tipOfTheDay,
    isMaxSubscription,
    isSubscriptionUpsell,
    installMessages,
    layoutColumns,
    normalizedMessageHistory,
    streamingToolUseContentBlocks,
    tools,
    erroredToolUseIDs,
    inProgressToolUseIDs,
    toolJSX,
    toolUseConfirmQueue.length,
    isMessageSelectorVisible,
    unresolvedToolUseIDs,
    messages,
    streamingToolUses
  ]);

  // Render static and transient items separately
  return G9.createElement(
    G9.Fragment,
    null,
    G9.createElement(
      VirtualizedColumnList,
      {
        key: `static-messages-${conversationId}-${screenToggleId}`,
        items: buildMessageItems(verbose).filter(item => item.type === "static")
      },
      item => item.jsx
    ),
    buildMessageItems(verbose).filter(item => item.type === "transient").map(item => item.jsx)
  );
}

module.exports = renderTranscriptMessages;