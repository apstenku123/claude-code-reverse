/**
 * Factory function for managing the main conversation state and UI logic.
 * Handles message history, tool usage, notifications, rate limits, and prompt input for a chat-based application.
 *
 * @param {Object} params - The configuration and initial state for the conversation.
 * @param {Array} params.commands - List of available commands.
 * @param {boolean} params.debug - Whether debug mode is enabled.
 * @param {string} params.initialPrompt - The initial prompt to display.
 * @param {boolean} params.shouldShowPromptInput - Whether to show the prompt input field.
 * @param {Array} params.initialTools - List of initial tools available.
 * @param {Array} params.initialMessages - Initial message history.
 * @param {Array} params.initialTodos - Initial todos for the session.
 * @param {string} params.tipOfTheDay - Tip of the day to display.
 * @param {Array} params.mcpClients - List of MCP clients.
 * @param {Object} params.dynamicMcpConfig - Dynamic MCP configuration.
 * @returns {React.Element} The main conversation React component.
 */
function createMainConversationFactory({
  commands,
  debug,
  initialPrompt,
  shouldShowPromptInput,
  initialTools,
  initialMessages,
  initialTodos,
  tipOfTheDay,
  mcpClients,
  dynamicMcpConfig
}) {
  // State and context hooks
  const [mainState, setMainState] = useAppState();
  const {
    todoFeatureEnabled,
    toolPermissionContext,
    verbose,
    mainLoopModel,
    maxRateLimitFallbackActive,
    mcp,
    rateLimitResetsAt
  } = mainState;

  const normalizedMainLoopModel = useMainLoopModelAccessor();
  const rateLimitState = useReactiveData();

  // Memoized enabled tools
  const enabledTools = S9.useMemo(() => getEnabledTools(toolPermissionContext, todoFeatureEnabled), [toolPermissionContext, todoFeatureEnabled]);
  const [currentDynamicMcpConfig, setDynamicMcpConfig] = S9.useState(dynamicMcpConfig);

  // Callback to update dynamic MCP config
  const handleDynamicMcpConfigChange = S9.useCallback((newConfig) => {
    setDynamicMcpConfig(newConfig);
  }, [setDynamicMcpConfig]);

  // UI state
  const [currentScreen, setCurrentScreen] = S9.useState("prompt");
  const [screenToggleId, setScreenToggleId] = S9.useState(1);
  const [showAllInTranscript, setShowAllInTranscript] = S9.useState(false);

  // Notification state
  const {
    notification,
    addNotification
  } = useNotificationManager();
  useMcpDataSync(addNotification, currentDynamicMcpConfig);

  // MCP clients/tools/commands
  const normalizedMcpClients = qS2(mcpClients, mcp.clients);
  const normalizedTools = LS2([...enabledTools, ...initialTools], mcp.tools);
  const normalizedCommands = OS2(commands, mcp.commands);
  const [selectedIde, setSelectedIde] = S9.useState(null);
  z$2(mcp.clients);
  useIdeSelectionNotificationHandler(mcp.clients, setSelectedIde);

  // Conversation state
  const [spinnerMessage, setSpinnerMessage] = S9.useState("responding");
  const [toolUseConfirmQueue, setToolUseConfirmQueue] = S9.useState([]);
  const [abortController, setAbortController] = S9.useState(null);
  const [isLoading, setIsLoading] = S9.useState(false);
  const [autoUpdaterResult, setAutoUpdaterResult] = S9.useState(null);
  const [toolJSX, setToolJSX] = S9.useState(null);
  const [streamingToolUses, setStreamingToolUses] = S9.useState([]);
  const [messages, setMessages] = S9.useState(initialMessages ?? []);
  const [messageHistory, setMessageHistory] = S9.useState([]);
  const [input, setInput] = S9.useState("");
  const [inputMode, setInputMode] = S9.useState("prompt");

  // Queued commands state
  const {
    queuedCommands,
    queuedCommandsRef,
    setQueuedCommands
  } = useQueuedCommands();

  // Misc state
  const [pastedContents, setPastedContents] = S9.useState({});
  const [submitCount, setSubmitCount] = S9.useState(0);
  const [currentResponseLength, setCurrentResponseLength] = S9.useState(0);
  const [overrideMessage, setOverrideMessage] = S9.useState(null);
  const [isMessageSelectorVisible, setIsMessageSelectorVisible] = S9.useState(false);
  const [showCostThresholdWarning, setShowCostThresholdWarning] = S9.useState(false);
  const [conversationId, setConversationId] = S9.useState(cAA());
  const [hasAcknowledgedCostThreshold, setHasAcknowledgedCostThreshold] = S9.useState(getCachedOrFreshConfig().hasAcknowledgedCostThreshold);
  const [inProgressToolUseIDs, setInProgressToolUseIDs] = S9.useState(new Set());
  const [vimMode, setVimMode] = S9.useState("INSERT");

  // Haiku state
  const {
    haikuWords,
    generateHaikuWord
  } = useHaikuSpinnerWords(isLoading);
  const [ideInstallationStatus, setIdeInstallationStatus] = S9.useState(null);
  const [showAutoInstall, setShowAutoInstall] = S9.useState(false);

  // IDE auto-install effect
  S9.useEffect(() => {
    function handleIdeAutoInstall(ideInfo) {
      if (!qw() || !ideInfo) return;
      setDynamicMcpConfig(prevConfig => {
        if (prevConfig?.ide) return prevConfig;
        return {
          ...prevConfig,
          ide: {
            type: ideInfo.url.startsWith("ws:") ? "ws-ide" : "sse-ide",
            url: ideInfo.url,
            ideName: ideInfo.name,
            authToken: ideInfo.authToken
          }
        };
      });
    }
    or0(handleIdeAutoInstall, () => setShowAutoInstall(true), (status) => {
      setIdeInstallationStatus(status);
    });
  }, []);

  // Rate limit effect
  S9.useEffect(() => {
    if (rateLimitResetsAt !== rateLimitState.resetsAt) setMainState(prev => ({
      ...prev,
      rateLimitResetsAt: rateLimitState.resetsAt
    }));
    handleRateLimitFallback(maxRateLimitFallbackActive, rateLimitResetsAt, rateLimitState, (active) => setMainState(prev => ({
      ...prev,
      maxRateLimitFallbackActive: active
    })));
    if (maxRateLimitFallbackActive && mainLoopModel === null) {
      addNotification({
        text: `Claude Opus 4 limit reached, now using ${getOpusOrSonnetLabel(JX())}`
      });
    }
  }, [addNotification, maxRateLimitFallbackActive, mainLoopModel, rateLimitResetsAt, rateLimitState, setMainState]);

  // Callback to update message history
  const handleSetMessageHistory = S9.useCallback((history) => {
    setMessageHistory(history);
    clearConsoleScreen();
    setConversationId(cAA());
  }, []);

  // Input change handler
  const handleInputChange = (value) => {
    setInput(value);
    if (inputMode !== "prompt") return;
    if (!value) return;
    // Only generate haiku word if input ends with space and is not a command
    if (haikuWords.length > 0 && (!value.endsWith(" ") || input.endsWith(" "))) return;
    if (!value.includes(" ")) return;
    if (value.length >= 3 && !value.startsWith("!") && !value.startsWith("#") && !value.startsWith("/")) {
      generateHaikuWord(value);
    }
  };

  // Memoized local storage key
  const localStorageKey = S9.useMemo(() => getAgentConfigFilePath(g9()), []);
  const readFileStateRef = S9.useRef({
    [localStorageKey]: {
      content: JSON.stringify(initialTodos || []),
      timestamp: 0
    }
  });

  // API key status
  const {
    status: apiKeyStatus,
    reverify: reverifyApiKey
  } = useVerificationStatus();

  // Abort all in-progress tool uses
  function abortAllToolUses() {
    if (!isLoading) return;
    setIsLoading(false);
    setCurrentResponseLength(0);
    setStreamingToolUses([]);
    setOverrideMessage(null);
    if (toolUseConfirmQueue[0]) {
      toolUseConfirmQueue[0].onAbort();
      setToolUseConfirmQueue([]);
    } else if (abortController) {
      abortController.abort();
    }
  }

  // Callback to process queued commands
  const handleQueuedCommands = S9.useCallback(() => {
    if (queuedCommands.length === 0) return;
    setInput([
      ...queuedCommands.map(cmd => cmd.value),
      input
    ].filter(Boolean).join("\n"));
    setInputMode("prompt");
    setQueuedCommands(() => []);
  }, [queuedCommands, setInput, setInputMode, setQueuedCommands, input]);

  // Tool use effect
  handleEscapeEvent(setToolUseConfirmQueue, abortAllToolUses, isLoading, isMessageSelectorVisible, queuedCommands, abortController?.signal, handleQueuedCommands, vimMode);

  // Cost threshold warning effect
  S9.useEffect(() => {
    if (SJ() >= 5 && !showCostThresholdWarning && !hasAcknowledgedCostThreshold) {
      logTelemetryEventIfEnabled("tengu_cost_threshold_reached", {});
      if (hasInsufficientOrElevatedOAuthRoles() && !process.env.DISABLE_COST_WARNINGS) setShowCostThresholdWarning(true);
    }
  }, [messages, showCostThresholdWarning, hasAcknowledgedCostThreshold]);

  // Memoized normalized message events
  const normalizedMessages = NS2(setToolUseConfirmQueue);

  // Callback to update tool permission context
  const handleToolPermissionContextChange = S9.useCallback((context) => {
    setMainState(prev => ({
      ...prev,
      toolPermissionContext: context
    }));
  }, [setMainState]);

  // Tool use context factory
  const createToolUseContext = S9.useCallback((msgList, toolUseList, abortCtrl) => {
    return {
      abortController: abortCtrl,
      options: {
        commands: normalizedCommands,
        tools: normalizedTools,
        debug,
        verbose,
        mainLoopModel: normalizedMainLoopModel,
        maxThinkingTokens: getMaxUserTokenCount(toolUseList),
        mcpClients: normalizedMcpClients,
        mcpResources: mcp.resources,
        ideInstallationStatus,
        isNonInteractiveSession: false,
        dynamicMcpConfig: currentDynamicMcpConfig
      },
      getToolPermissionContext() {
        return dAA;
      },
      getQueuedCommands() {
        return queuedCommandsRef.current;
      },
      removeQueuedCommands(ids) {
        setQueuedCommands(queue => queue.filter(cmd => !ids.includes(cmd)));
      },
      messages: msgList,
      setMessages,
      setMessageHistory: handleSetMessageHistory,
      onChangeAPIKey: reverifyApiKey,
      readFileState: readFileStateRef.current,
      setToolJSX,
      addNotification,
      setToolPermissionContext: handleToolPermissionContextChange,
      onChangeDynamicMcpConfig: handleDynamicMcpConfigChange,
      nestedMemoryAttachmentTriggers: new Set(),
      setResponseLength: setCurrentResponseLength,
      setStreamMode: setSpinnerMessage,
      setSpinnerMessage: setOverrideMessage,
      setInProgressToolUseIDs,
      agentId: g9()
    };
  }, [normalizedCommands, debug, normalizedTools, mcp.resources, verbose, normalizedMainLoopModel, normalizedMcpClients, ideInstallationStatus, currentDynamicMcpConfig, setMessages, handleSetMessageHistory, reverifyApiKey, addNotification, handleToolPermissionContextChange, handleDynamicMcpConfigChange, queuedCommandsRef, setQueuedCommands, setCurrentResponseLength, setSpinnerMessage, setOverrideMessage]);

  // Initial prompt effect
  async function handleInitialPrompt() {
    reverifyApiKey();
    const files = uD();
    for (const file of files) {
      readFileStateRef.current[file.path] = {
        content: file.content,
        timestamp: Date.now()
      };
    }
    if (!initialPrompt) return;
    setIsLoading(true);
    setCurrentResponseLength(0);
    setStreamingToolUses([]);
    const abortCtrl = new AbortController();
    setAbortController(abortCtrl);
    const {
      messages: promptMessages,
      shouldQuery
    } = await handleUserInput(initialPrompt, "prompt", setToolJSX, createToolUseContext(messages, messages, abortCtrl), null, selectedIde, void 0);
    if (promptMessages.length) {
      for (const msg of promptMessages) {
        if (msg.type === "user") addDisplayStateToHistory(initialPrompt);
      }
      setMessages(prev => [...prev, ...promptMessages]);
      if (!shouldQuery) {
        setAbortController(null);
        setIsLoading(false);
        setCurrentResponseLength(0);
        setStreamingToolUses([]);
        setOverrideMessage(null);
        return;
      }
      const [tools, uw, handleMissingDoctypeError] = await Promise.all([
        Zj(normalizedTools, normalizedMainLoopModel, Object.values(mcp.resources).flat()),
        UW(),
        WE(false)
      ]);
      for await (const toolMsg of processStreamWithCompactionAndToolUse([...messages, ...promptMessages], tools, uw, handleMissingDoctypeError, normalizedMessages, createToolUseContext([...messages, ...promptMessages], promptMessages, abortCtrl))) {
        handleStreamEvent(toolMsg, (msg) => {
          setMessages(prev => [...prev, msg]);
        }, (msg) => setCurrentResponseLength(prev => prev + msg.length), setSpinnerMessage, setStreamingToolUses);
      }
    } else {
      addDisplayStateToHistory(initialPrompt);
    }
    setHasAcknowledgedCostThreshold(getCachedOrFreshConfig().hasAcknowledgedCostThreshold || false);
    setIsLoading(false);
    setCurrentResponseLength(0);
    setStreamingToolUses([]);
    setOverrideMessage(null);
  }

  // Handler for submitting a new query
  async function handleQuerySubmit(newMessages, abortCtrl, shouldQuery) {
    setMessages(prev => [...prev, ...newMessages]);
    setCurrentResponseLength(0);
    setStreamingToolUses([]);
    if (shouldQuery) {
      qK.handleQueryStart(normalizedMcpClients);
      const diffTab = findConnectedIdeEntry(normalizedMcpClients);
      if (diffTab) rr0(diffTab);
    }
    completeProjectOnboardingIfNeeded();
    const lastMessage = newMessages[newMessages.length - 1];
    if (lastMessage?.type === "user" && typeof lastMessage.message.content === "string") {
      analyzeAndSetConversationTitleIfNewTopic(lastMessage.message.content);
    }
    if (!shouldQuery) {
      setAbortController(null);
      setIsLoading(false);
      setOverrideMessage(null);
      return;
    }
    const toolUseContext = createToolUseContext([...messages, ...newMessages], newMessages, abortCtrl);
    const [tools, uw, handleMissingDoctypeError] = await Promise.all([
      Zj(normalizedTools, normalizedMainLoopModel),
      UW(),
      WE(false)
    ]);
    for await (const toolMsg of processStreamWithCompactionAndToolUse([...messages, ...newMessages], tools, uw, handleMissingDoctypeError, normalizedMessages, toolUseContext, void 0)) {
      handleStreamEvent(toolMsg, (msg) => {
        setMessages(prev => [...prev, msg]);
      }, (msg) => setCurrentResponseLength(prev => prev + msg.length), setSpinnerMessage, setStreamingToolUses);
    }
    setIsLoading(false);
    setStreamingToolUses([]);
    setCurrentResponseLength(0);
    setOverrideMessage(null);
  }

  // Misc effects
  ez2();
  hN2(messages, messages.length === initialMessages?.length);
  zS2();

  // Prompt queue usage effect
  S9.useEffect(() => {
    if (queuedCommands.length < 1) return;
    const state = getCachedOrFreshConfig();
    updateProjectsAccessor({
      ...state,
      promptQueueUseCount: (state.promptQueueUseCount ?? 0) + 1
    });
  }, [queuedCommands.length]);

  // Show cost threshold warning if needed
  const shouldShowCostWarning = !isLoading && showCostThresholdWarning;

  // Idle notification effect
  S9.useEffect(() => {
    fp();
  }, [input, submitCount]);

  S9.useEffect(() => {
    if (isLoading) return;
    if (submitCount === 0) return;
    const timeoutId = setTimeout(() => {
      const idleTime = Date.now() - q01();
      if (!isLoading && toolUseConfirmQueue.length === 0 && !toolJSX && !shouldShowCostWarning && !isMessageSelectorVisible && idleTime >= getCachedOrFreshConfig().messageIdleNotifThresholdMs) {
        notifyUserBasedOnConfig({ message: "Claude is waiting for your input" });
      }
    }, getIdleNotificationThreshold());
    return () => clearTimeout(timeoutId);
  }, [isLoading, toolUseConfirmQueue.length, toolJSX, shouldShowCostWarning, isMessageSelectorVisible, messages, submitCount]);

  // Initial prompt effect
  S9.useEffect(() => {
    handleInitialPrompt();
    return () => {
      qK.shutdown();
    };
  }, []);

  // Memoized normalized message lists
  const normalizedMessageList = S9.useMemo(() => s3(messages).filter(isValidMessageEntry), [messages]);
  const normalizedHistoryList = S9.useMemo(() => s3(messageHistory).filter(isValidMessageEntry), [messageHistory]);
  const unresolvedToolUseIDs = S9.useMemo(() => MO(normalizedMessageList), [normalizedMessageList]);
  const erroredToolUseIDs = S9.useMemo(() => QK1(normalizedMessageList), [normalizedMessageList]);

  // Tool use confirm queue effect
  registerTranscriptKeyboardShortcuts(currentScreen, setCurrentScreen, setScreenToggleId, setShowAllInTranscript, clearConsoleScreen);

  // UI state for auto-updater and install
  const [showAutoUpdater, setShowAutoUpdater] = S9.useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = S9.useState(false);

  // Render transcript screen
  if (currentScreen === "transcript") {
    return r4.createElement(r4.Fragment, null,
      r4.createElement(renderTranscriptMessages, {
        messages,
        normalizedMessageHistory: normalizedHistoryList,
        tools: normalizedTools,
        verbose: true,
        toolJSX: null,
        toolUseConfirmQueue: [],
        inProgressToolUseIDs,
        isMessageSelectorVisible: false,
        tipOfTheDay: undefined,
        conversationId,
        screen: currentScreen,
        screenToggleId,
        streamingToolUses,
        showAllInTranscript
      }),
      r4.createElement(g, {
        alignItems: "center",
        alignSelf: "center",
        borderTopColor: getThemeStylesheet().secondaryBorder,
        borderBottom: false,
        borderLeft: false,
        borderRight: false,
        borderStyle: "single",
        marginTop: 1,
        paddingLeft: 2,
        width: "100%"
      },
        r4.createElement(_, { dimColor: true }, "Showing detailed transcript · Ctrl+isWildcardOrX to toggle")
      )
    );
  }

  // Main render
  return r4.createElement(r4.Fragment, null,
    r4.createElement(renderTranscriptMessages, {
      messages,
      normalizedMessageHistory: normalizedHistoryList,
      tools: normalizedTools,
      verbose,
      toolJSX,
      toolUseConfirmQueue,
      inProgressToolUseIDs,
      isMessageSelectorVisible,
      tipOfTheDay,
      conversationId,
      screen: currentScreen,
      screenToggleId,
      streamingToolUses,
      showAllInTranscript
    }),
    r4.createElement(g, {
      flexDirection: "column",
      width: "100%"
    },
      !toolJSX && toolUseConfirmQueue.length === 0 && isLoading && r4.createElement(HaikuStatusBar, {
        mode: spinnerMessage,
        haikuWords,
        currentResponseLength,
        overrideMessage
      }),
      toolJSX ? toolJSX.jsx : null,
      !toolJSX && toolUseConfirmQueue[0] !== undefined && !isMessageSelectorVisible && r4.createElement(renderToolPermissionComponent, {
        onDone: () => setToolUseConfirmQueue(([first, ...rest]) => rest),
        onReject: handleQueuedCommands,
        setToolPermissionContext: handleToolPermissionContextChange,
        toolUseConfirm: toolUseConfirmQueue[0],
        toolUseContext: createToolUseContext(messages, messages, abortController ?? new AbortController()),
        verbose
      }),
      !toolJSX && toolUseConfirmQueue.length === 0 && !isMessageSelectorVisible && shouldShowCostWarning && r4.createElement(SessionSpendingNotification, {
        onDone: () => {
          setShowCostThresholdWarning(false);
          setHasAcknowledgedCostThreshold(true);
          const state = getCachedOrFreshConfig();
          updateProjectsAccessor({
            ...state,
            hasAcknowledgedCostThreshold: true
          });
          logTelemetryEventIfEnabled("tengu_cost_threshold_acknowledged", {});
        }
      }),
      showAutoUpdater && r4.createElement(useMainLoopUtility, {
        onDone: async () => {
          await performCleanupAndExit(0);
        }
      }),
      showAutoInstall && r4.createElement(renderClaudeCodeInstallSuccessScreen, {
        onDone: () => setShowAutoInstall(false),
        installedVersion: ideInstallationStatus?.installedVersion ?? null
      }),
      toolUseConfirmQueue.length === 0 && !toolJSX?.shouldHidePromptInput && shouldShowPromptInput && !isMessageSelectorVisible && !shouldShowCostWarning && !showAutoUpdater && !showAutoInstall && !showInstallPrompt && r4.createElement(r4.Fragment, null,
        r4.createElement(KS2, {
          debug,
          ideSelection: selectedIde,
          getToolUseContext: createToolUseContext,
          toolPermissionContext,
          setToolPermissionContext: handleToolPermissionContextChange,
          apiKeyStatus,
          commands: normalizedCommands,
          isLoading,
          onExit: async () => {
            setShowInstallPrompt(true);
            if (!(await validateAndProcessInteractions(messages))) {
              await performCleanupAndExit(0);
              return;
            }
            setShowAutoUpdater(true);
          },
          onQuery: handleQuerySubmit,
          verbose,
          messages,
          setToolJSX,
          onAutoUpdaterResult: setAutoUpdaterResult,
          autoUpdaterResult,
          input,
          onInputChange: handleInputChange,
          mode: inputMode,
          onModeChange: setInputMode,
          queuedCommands,
          setQueuedCommands,
          submitCount,
          onSubmitCountChange: (count) => {
            setSelectedIde(null);
            setSubmitCount(count);
          },
          setIsLoading,
          setAbortController,
          onShowMessageSelector: () => setIsMessageSelectorVisible(prev => !prev),
          notification,
          addNotification,
          mcpClients: normalizedMcpClients,
          pastedContents,
          setPastedContents,
          vimMode,
          setVimMode,
          ideInstallationStatus
        })
      ),
      isMessageSelectorVisible && r4.createElement(MessageSelector, {
        erroredToolUseIDs,
        unresolvedToolUseIDs,
        messages,
        onSelect: async (selectedMessage) => {
          setIsMessageSelectorVisible(false);
          if (!messages.includes(selectedMessage)) return;
          abortAllToolUses();
          setImmediate(async () => {
            await clearConsoleScreen();
            const idx = messages.indexOf(selectedMessage);
            const prevMessages = messages.slice(0, idx);
            setMessages([...prevMessages]);
            setConversationId(cAA());
            if (typeof selectedMessage.message.content === "string") {
              const bashInput = fG(selectedMessage.message.content, "bash-input");
              if (bashInput) {
                setInput(bashInput);
                setInputMode("bash");
              } else {
                setInput(selectedMessage.message.content);
                setInputMode("prompt");
              }
            } else if (Array.isArray(selectedMessage.message.content) && selectedMessage.message.content.length >= 2 && selectedMessage.message.content.some(x => x.type === "image") && selectedMessage.message.content.some(x => x.type === "text")) {
              const textContent = selectedMessage.message.content.find(x => x.type === "text");
              if (textContent && textContent.type === "text") {
                setInput(textContent.text);
                setInputMode("prompt");
              }
              const images = selectedMessage.message.content.filter(x => x.type === "image");
              if (images.length > 0) {
                const pasted = {};
                images.forEach((img, idx) => {
                  if (img.source.type === "base64") {
                    pasted[idx + 1] = {
                      id: idx + 1,
                      type: "image",
                      content: img.source.data,
                      mediaType: img.source.media_type
                    };
                  }
                });
                setPastedContents(pasted);
              }
            }
          });
        },
        onEscape: () => setIsMessageSelectorVisible(false),
        tools: normalizedTools
      }),
      !showAutoInstall && r4.createElement(RG, null)
    )
  );
}

module.exports = createMainConversationFactory;