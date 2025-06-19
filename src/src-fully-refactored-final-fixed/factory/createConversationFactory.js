/**
 * Factory function for managing and rendering the main conversation UI, including tool usage, message history, notifications, and dynamic configuration.
 *
 * @param {Object} params - Configuration and initial state for the conversation factory.
 * @param {Array} params.commands - List of available commands.
 * @param {boolean} params.debug - Debug mode flag.
 * @param {string} params.initialPrompt - Initial prompt to seed the conversation.
 * @param {boolean} params.shouldShowPromptInput - Whether to show the prompt input field.
 * @param {Array} params.initialTools - Initial set of tools available.
 * @param {Array} params.initialMessages - Initial message history.
 * @param {Array} params.initialTodos - Initial todo list.
 * @param {string} params.tipOfTheDay - Tip of the day string.
 * @param {Array} params.mcpClients - List of MCP clients.
 * @param {Object} params.dynamicMcpConfig - Dynamic MCP configuration object.
 * @returns {React.ReactElement} The rendered conversation UI.
 */
function createConversationFactory({
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

  const mainLoopModelAccessor = useMainLoopModelAccessor();
  const rateLimitInfo = useReactiveData();
  const availableTools = S9.useMemo(() => Hk(toolPermissionContext, todoFeatureEnabled), [toolPermissionContext, todoFeatureEnabled]);
  const [currentDynamicMcpConfig, setDynamicMcpConfig] = S9.useState(dynamicMcpConfig);
  const handleDynamicMcpConfigChange = S9.useCallback((newConfig) => {
    setDynamicMcpConfig(newConfig);
  }, [setDynamicMcpConfig]);

  // UI state
  const [currentScreen, setCurrentScreen] = S9.useState("prompt");
  const [screenToggleId, setScreenToggleId] = S9.useState(1);
  const [showAllInTranscript, setShowAllInTranscript] = S9.useState(false);

  // Notifications
  const { notification, addNotification } = useNotificationManager();
  useMcpDataSync(addNotification, currentDynamicMcpConfig);

  // MCP and tool state
  const normalizedMcpClients = qS2(mcpClients, mcp.clients);
  const normalizedTools = LS2([...availableTools, ...initialTools], mcp.tools);
  const normalizedCommands = OS2(commands, mcp.commands);
  const [selectedIde, setSelectedIde] = S9.useState(null);
  z$2(mcp.clients);
  useIdeSelectionNotificationHandler(mcp.clients, setSelectedIde);

  // Conversation state
  const [streamMode, setStreamMode] = S9.useState("responding");
  const [toolUseConfirmQueue, setToolUseConfirmQueue] = S9.useState([]);
  const [abortController, setAbortController] = S9.useState(null);
  const [isLoading, setIsLoading] = S9.useState(false);
  const [autoUpdaterResult, setAutoUpdaterResult] = S9.useState(null);
  const [toolJSX, setToolJSX] = S9.useState(null);
  const [messages, setMessages] = S9.useState(initialMessages ?? []);
  const [messageHistory, setMessageHistory] = S9.useState([]);
  const [input, setInput] = S9.useState("");
  const [inputMode, setInputMode] = S9.useState("prompt");

  // Queued commands
  const {
    queuedCommands,
    queuedCommandsRef,
    setQueuedCommands
  } = useQueuedCommands();

  // Misc state
  const [pastedContents, setPastedContents] = S9.useState({});
  const [submitCount, setSubmitCount] = S9.useState(0);
  const [currentResponseLength, setCurrentResponseLength] = S9.useState(0);
  const [spinnerMessage, setSpinnerMessage] = S9.useState(null);
  const [isMessageSelectorVisible, setIsMessageSelectorVisible] = S9.useState(false);
  const [showCostThresholdWarning, setShowCostThresholdWarning] = S9.useState(false);
  const [conversationId, setConversationId] = S9.useState(cAA());
  const [hasAcknowledgedCostThreshold, setHasAcknowledgedCostThreshold] = S9.useState(getCachedOrFreshConfig().hasAcknowledgedCostThreshold);
  const [inProgressToolUseIDs, setInProgressToolUseIDs] = S9.useState(new Set());
  const [vimMode, setVimMode] = S9.useState("INSERT");

  // Haiku state
  const { haikuWords, generateHaikuWord } = useHaikuSpinnerWords(isLoading);
  const [ideInstallationStatus, setIdeInstallationStatus] = S9.useState(null);
  const [showIdeInstallModal, setShowIdeInstallModal] = S9.useState(false);

  // IDE connection effect
  S9.useEffect(() => {
    function handleIdeConnect(ideInfo) {
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
    or0(handleIdeConnect, () => setShowIdeInstallModal(true), ideStatus => {
      setIdeInstallationStatus(ideStatus);
    });
  }, []);

  // Rate limit and fallback effect
  S9.useEffect(() => {
    if (rateLimitResetsAt !== rateLimitInfo.resetsAt) {
      setMainState(prev => ({ ...prev, rateLimitResetsAt: rateLimitInfo.resetsAt }));
    }
    handleRateLimitFallback(maxRateLimitFallbackActive, rateLimitResetsAt, rateLimitInfo, fallbackActive => setMainState(prev => ({ ...prev, maxRateLimitFallbackActive: fallbackActive })));
    if (maxRateLimitFallbackActive && mainLoopModel === null) {
      addNotification({
        text: `Claude Opus 4 limit reached, now using ${getOpusOrSonnetLabel(JX())}`
      });
    }
  }, [addNotification, maxRateLimitFallbackActive, mainLoopModel, rateLimitResetsAt, rateLimitInfo, setMainState]);

  // Set message history and reset conversationId
  const handleSetMessageHistory = S9.useCallback(newHistory => {
    setMessageHistory(newHistory);
    clearConsoleScreen();
    setConversationId(cAA());
  }, []);

  // Handle input change for prompt
  const handleInputChange = inputValue => {
    setInput(inputValue);
    if (inputMode !== "prompt") return;
    if (!inputValue) return;
    if (haikuWords.length > 0 && (!inputValue.endsWith(" ") || input.endsWith(" "))) return;
    if (!inputValue.includes(" ")) return;
    if (
      inputValue.length >= 3 &&
      !inputValue.startsWith("!") &&
      !inputValue.startsWith("#") &&
      !inputValue.startsWith("/")
    ) {
      generateHaikuWord(inputValue);
    }
  };

  // File state ref
  const fileStateKey = S9.useMemo(() => getAgentConfigFilePath(g9()), []);
  const fileStateRef = S9.useRef({
    [fileStateKey]: {
      content: JSON.stringify(initialTodos || []),
      timestamp: 0
    }
  });

  // API key status
  const { status: apiKeyStatus, reverify: reverifyApiKey } = useVerificationStatus();

  /**
   * Abort current tool use or stream
   */
  function abortCurrentToolOrStream() {
    if (!isLoading) return;
    setIsLoading(false);
    setCurrentResponseLength(0);
    setToolUseConfirmQueue([]);
    setSpinnerMessage(null);
    if (toolUseConfirmQueue[0]) {
      toolUseConfirmQueue[0].onAbort();
      setToolUseConfirmQueue([]);
    } else if (abortController) {
      abortController.abort();
    }
  }

  // Handle queued commands submission
  const handleQueuedCommandsSubmit = S9.useCallback(() => {
    if (queuedCommands.length === 0) return;
    setInput([
      ...queuedCommands.map(cmd => cmd.value),
      input
    ].filter(Boolean).join("\n"));
    setInputMode("prompt");
    setQueuedCommands(() => []);
  }, [queuedCommands, setInput, setInputMode, setQueuedCommands, input]);

  // Stream event handler
  handleEscapeEvent(setToolUseConfirmQueue, abortCurrentToolOrStream, isLoading, isMessageSelectorVisible, queuedCommands, abortController?.signal, handleQueuedCommandsSubmit, vimMode);

  // Cost threshold warning effect
  S9.useEffect(() => {
    if (SJ() >= 5 && !showCostThresholdWarning && !hasAcknowledgedCostThreshold) {
      logTelemetryEventIfEnabled("tengu_cost_threshold_reached", {});
      if (hasInsufficientOrElevatedOAuthRoles() && !process.env.DISABLE_COST_WARNINGS) setShowCostThresholdWarning(true);
    }
  }, [messages, showCostThresholdWarning, hasAcknowledgedCostThreshold]);

  // Normalized message selectors
  const normalizedMessages = NS2(setToolUseConfirmQueue);

  // Tool permission context setter
  const handleToolPermissionContextChange = S9.useCallback(newContext => {
    setMainState(prev => ({ ...prev, toolPermissionContext: newContext }));
  }, [setMainState]);

  // Tool use context factory
  const createToolUseContext = S9.useCallback((currentMessages, toolMessages, controller) => {
    return {
      abortController: controller,
      options: {
        commands: normalizedCommands,
        tools: normalizedTools,
        debug,
        verbose,
        mainLoopModel: mainLoopModelAccessor,
        maxThinkingTokens: Kk(toolMessages),
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
        setQueuedCommands(cmds => cmds.filter(cmd => !ids.includes(cmd)));
      },
      messages: currentMessages,
      setMessages,
      setMessageHistory: handleSetMessageHistory,
      onChangeAPIKey: reverifyApiKey,
      readFileState: fileStateRef.current,
      setToolJSX,
      addNotification,
      setToolPermissionContext: handleToolPermissionContextChange,
      onChangeDynamicMcpConfig: handleDynamicMcpConfigChange,
      nestedMemoryAttachmentTriggers: new Set(),
      setResponseLength: setCurrentResponseLength,
      setStreamMode,
      setSpinnerMessage,
      setInProgressToolUseIDs,
      agentId: g9()
    };
  }, [normalizedCommands, debug, normalizedTools, mcp.resources, verbose, mainLoopModelAccessor, normalizedMcpClients, ideInstallationStatus, currentDynamicMcpConfig, handleSetMessageHistory, reverifyApiKey, addNotification, handleToolPermissionContextChange, handleDynamicMcpConfigChange, queuedCommandsRef, setQueuedCommands, setCurrentResponseLength, setStreamMode, setSpinnerMessage]);

  /**
   * Handles the initial prompt if provided, and streams the response.
   */
  async function handleInitialPrompt() {
    reverifyApiKey();
    const files = uD();
    for (const file of files) {
      fileStateRef.current[file.path] = {
        content: file.content,
        timestamp: Date.now()
      };
    }
    if (!initialPrompt) return;
    setIsLoading(true);
    setCurrentResponseLength(0);
    setToolUseConfirmQueue([]);
    const controller = new AbortController();
    setAbortController(controller);
    const { messages: promptMessages, shouldQuery } = await handleUserInput(
      initialPrompt,
      "prompt",
      setToolJSX,
      createToolUseContext(messages, messages, controller),
      null,
      selectedIde,
      void 0
    );
    if (promptMessages.length) {
      for (const msg of promptMessages) {
        if (msg.type === "user") addDisplayStateToHistory(initialPrompt);
      }
      setMessages(prev => [...prev, ...promptMessages]);
      if (!shouldQuery) {
        setAbortController(null);
        setIsLoading(false);
        setCurrentResponseLength(0);
        setToolUseConfirmQueue([]);
        setSpinnerMessage(null);
        return;
      }
      const [tools, uw, handleMissingDoctypeError] = await Promise.all([
        Zj(normalizedTools, mainLoopModelAccessor, Object.values(mcp.resources).flat()),
        UW(),
        WE(false)
      ]);
      for await (const streamEvent of processStreamWithCompactionAndToolUse(
        [...messages, ...promptMessages],
        tools,
        uw,
        handleMissingDoctypeError,
        normalizedMessages,
        createToolUseContext([...messages, ...promptMessages], promptMessages, controller)
      )) {
        handleStreamEvent(streamEvent, newMsg => {
          setMessages(prev => [...prev, newMsg]);
        },
        newMsg => setCurrentResponseLength(prev => prev + newMsg.length),
        setStreamMode,
        setToolUseConfirmQueue);
      }
    } else {
      addDisplayStateToHistory(initialPrompt);
    }
    setHasAcknowledgedCostThreshold(getCachedOrFreshConfig().hasAcknowledgedCostThreshold || false);
    setIsLoading(false);
    setCurrentResponseLength(0);
    setToolUseConfirmQueue([]);
    setSpinnerMessage(null);
  }

  /**
   * Handles a new query (user or tool input), streams the response.
   * @param {Array} newMessages - New messages to add and process.
   * @param {AbortController} controller - Abort controller for the stream.
   * @param {boolean} shouldStream - Whether to stream the response.
   */
  async function handleQuery(newMessages, controller, shouldStream) {
    setMessages(prev => [...prev, ...newMessages]);
    setCurrentResponseLength(0);
    setToolUseConfirmQueue([]);
    if (shouldStream) {
      qK.handleQueryStart(normalizedMcpClients);
      const client = findConnectedIdeEntry(normalizedMcpClients);
      if (client) rr0(client);
    }
    completeProjectOnboardingIfNeeded();
    const lastMessage = newMessages[newMessages.length - 1];
    if (lastMessage?.type === "user" && typeof lastMessage.message.content === "string") {
      analyzeAndSetConversationTitleIfNewTopic(lastMessage.message.content);
    }
    if (!shouldStream) {
      setAbortController(null);
      setIsLoading(false);
      setSpinnerMessage(null);
      return;
    }
    const toolUseContext = createToolUseContext([...messages, ...newMessages], newMessages, controller);
    const [tools, uw, handleMissingDoctypeError] = await Promise.all([
      Zj(normalizedTools, mainLoopModelAccessor),
      UW(),
      WE(false)
    ]);
    for await (const streamEvent of processStreamWithCompactionAndToolUse(
      [...messages, ...newMessages],
      tools,
      uw,
      handleMissingDoctypeError,
      normalizedMessages,
      toolUseContext,
      void 0
    )) {
      handleStreamEvent(streamEvent, msg => {
        setMessages(prev => [...prev, msg]);
      },
      msg => setCurrentResponseLength(prev => prev + msg.length),
      setStreamMode,
      setToolUseConfirmQueue);
    }
    setIsLoading(false);
    setToolUseConfirmQueue([]);
    setCurrentResponseLength(0);
    setSpinnerMessage(null);
  }

  // Misc effects
  ez2();
  hN2(messages, messages.length === initialMessages?.length);
  zS2();

  // Track prompt queue usage
  S9.useEffect(() => {
    if (queuedCommands.length < 1) return;
    const appState = getCachedOrFreshConfig();
    updateProjectsAccessor({
      ...appState,
      promptQueueUseCount: (appState.promptQueueUseCount ?? 0) + 1
    });
  }, [queuedCommands.length]);

  // Show cost threshold warning
  const showCostWarning = !isLoading && showCostThresholdWarning;

  // Idle notification effect
  S9.useEffect(() => {
    fp();
  }, [input, submitCount]);
  S9.useEffect(() => {
    if (isLoading) return;
    if (submitCount === 0) return;
    const timeout = setTimeout(() => {
      const idleMs = Date.now() - q01();
      if (!isLoading && toolUseConfirmQueue.length === 0 && !toolJSX && !showCostWarning && !isMessageSelectorVisible && idleMs >= getCachedOrFreshConfig().messageIdleNotifThresholdMs) {
        notifyUserBasedOnConfig({ message: "Claude is waiting for your input" });
      }
    }, getIdleNotificationThreshold());
    return () => clearTimeout(timeout);
  }, [isLoading, toolUseConfirmQueue.length, toolJSX, showCostWarning, isMessageSelectorVisible, messages, submitCount]);

  // Initial prompt effect
  S9.useEffect(() => {
    handleInitialPrompt();
    return () => {
      qK.shutdown();
    };
  }, []);

  // Message normalization and selectors
  const normalizedUserMessages = S9.useMemo(() => s3(messages).filter(isValidMessageEntry), [messages]);
  const normalizedHistoryMessages = S9.useMemo(() => s3(messageHistory).filter(isValidMessageEntry), [messageHistory]);
  const unresolvedToolUseIDs = S9.useMemo(() => MO(normalizedUserMessages), [normalizedUserMessages]);
  const erroredToolUseIDs = S9.useMemo(() => QK1(normalizedUserMessages), [normalizedUserMessages]);

  // Tool use confirm queue state
  registerTranscriptKeyboardShortcuts(currentScreen, setCurrentScreen, setScreenToggleId, setShowAllInTranscript, clearConsoleScreen);
  const [showAutoUpdaterModal, setShowAutoUpdaterModal] = S9.useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = S9.useState(false);

  // Render transcript screen
  if (currentScreen === "transcript") {
    return r4.createElement(r4.Fragment, null,
      r4.createElement(renderTranscriptMessages, {
        messages,
        normalizedMessageHistory: normalizedHistoryMessages,
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
        streamingToolUses: toolUseConfirmQueue,
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

  // Main UI render
  return r4.createElement(r4.Fragment, null,
    r4.createElement(renderTranscriptMessages, {
      messages,
      normalizedMessageHistory: normalizedHistoryMessages,
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
      streamingToolUses: toolUseConfirmQueue,
      showAllInTranscript
    }),
    r4.createElement(g, { flexDirection: "column", width: "100%" },
      !toolJSX && toolUseConfirmQueue.length === 0 && isLoading && r4.createElement(HaikuStatusBar, {
        mode: streamMode,
        haikuWords,
        currentResponseLength,
        overrideMessage: spinnerMessage
      }),
      toolJSX ? toolJSX.jsx : null,
      !toolJSX && toolUseConfirmQueue[0] !== undefined && !isMessageSelectorVisible && r4.createElement(renderToolPermissionComponent, {
        onDone: () => setToolUseConfirmQueue(([first, ...rest]) => rest),
        onReject: handleQueuedCommandsSubmit,
        setToolPermissionContext: handleToolPermissionContextChange,
        toolUseConfirm: toolUseConfirmQueue[0],
        toolUseContext: createToolUseContext(messages, messages, abortController ?? new AbortController()),
        verbose
      }),
      !toolJSX && toolUseConfirmQueue.length === 0 && !isMessageSelectorVisible && showCostWarning && r4.createElement(SessionSpendingNotification, {
        onDone: () => {
          setShowCostThresholdWarning(false);
          setHasAcknowledgedCostThreshold(true);
          const appState = getCachedOrFreshConfig();
          updateProjectsAccessor({ ...appState, hasAcknowledgedCostThreshold: true });
          logTelemetryEventIfEnabled("tengu_cost_threshold_acknowledged", {});
        }
      }),
      showAutoUpdaterModal && r4.createElement(useMainLoopUtility, {
        onDone: async () => {
          await performCleanupAndExit(0);
        }
      }),
      showIdeInstallModal && r4.createElement(renderClaudeCodeInstallSuccessScreen, {
        onDone: () => setShowIdeInstallModal(false),
        installedVersion: ideInstallationStatus?.installedVersion ?? null
      }),
      toolUseConfirmQueue.length === 0 && !toolJSX?.shouldHidePromptInput && shouldShowPromptInput && !isMessageSelectorVisible && !showCostWarning && !showAutoUpdaterModal && !showIdeInstallModal && !showApiKeyModal && r4.createElement(r4.Fragment, null,
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
            setShowApiKeyModal(true);
            if (!(await validateAndProcessInteractions(messages))) {
              await performCleanupAndExit(0);
              return;
            }
            setShowAutoUpdaterModal(true);
          },
          onQuery: handleQuery,
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
          onSubmitCountChange: count => {
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
        onSelect: async selectedMsg => {
          setIsMessageSelectorVisible(false);
          if (!messages.includes(selectedMsg)) return;
          abortCurrentToolOrStream();
          setImmediate(async () => {
            await clearConsoleScreen();
            const msgIdx = messages.indexOf(selectedMsg);
            const priorMessages = messages.slice(0, msgIdx);
            setMessages([...priorMessages]);
            setConversationId(cAA());
            if (typeof selectedMsg.message.content === "string") {
              const bashInput = fG(selectedMsg.message.content, "bash-input");
              if (bashInput) {
                setInput(bashInput);
                setInputMode("bash");
              } else {
                setInput(selectedMsg.message.content);
                setInputMode("prompt");
              }
            } else if (
              Array.isArray(selectedMsg.message.content) &&
              selectedMsg.message.content.length >= 2 &&
              selectedMsg.message.content.some(x => x.type === "image") &&
              selectedMsg.message.content.some(x => x.type === "text")
            ) {
              const textPart = selectedMsg.message.content.find(x => x.type === "text");
              if (textPart && textPart.type === "text") {
                setInput(textPart.text);
                setInputMode("prompt");
              }
              const imageParts = selectedMsg.message.content.filter(x => x.type === "image");
              if (imageParts.length > 0) {
                const pasted = {};
                imageParts.forEach((img, idx) => {
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
      !showIdeInstallModal && r4.createElement(RG, null)
    )
  );
}

module.exports = createConversationFactory;