/**
 * Factory function to create and manage the main chat application state and UI.
 * Handles message state, tool integrations, notifications, rate limits, and user input.
 *
 * @param {Object} options - Configuration and initial state for the chat app.
 * @param {Array} options.commands - List of available commands.
 * @param {boolean} options.debug - Debug mode flag.
 * @param {string} options.initialPrompt - Initial prompt to display.
 * @param {boolean} options.shouldShowPromptInput - Whether to show the prompt input.
 * @param {Array} options.initialTools - List of initial tool objects.
 * @param {Array} options.initialMessages - Initial chat messages.
 * @param {Array} options.initialTodos - Initial todo items.
 * @param {string} options.tipOfTheDay - Tip of the day string.
 * @param {Array} options.mcpClients - List of MCP client objects.
 * @param {Object} options.dynamicMcpConfig - Dynamic MCP configuration object.
 * @returns {React.ReactElement} The main chat application React element.
 */
function createChatAppFactory({
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

  // Memoize enabled tools based on permissions and feature flag
  const enabledTools = S9.useMemo(() => Hk(toolPermissionContext, todoFeatureEnabled), [toolPermissionContext, todoFeatureEnabled]);

  // Dynamic MCP config state
  const [currentDynamicMcpConfig, setDynamicMcpConfig] = S9.useState(dynamicMcpConfig);
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

  // Watch for dynamic MCP config changes
  useMcpDataSync(addNotification, currentDynamicMcpConfig);

  // MCP client and tool state
  const normalizedMcpClients = qS2(mcpClients, mcp.clients);
  const normalizedTools = LS2([...enabledTools, ...initialTools], mcp.tools);
  const normalizedCommands = OS2(commands, mcp.commands);
  const [selectedIde, setSelectedIde] = S9.useState(null);

  // Side effects for MCP clients
  z$2(mcp.clients);
  useIdeSelectionNotificationHandler(mcp.clients, setSelectedIde);

  // Chat and tool use state
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
  const [mode, setMode] = S9.useState("prompt");

  // Queued commands state
  const {
    queuedCommands,
    queuedCommandsRef,
    setQueuedCommands
  } = useQueuedCommands();

  // Pasted contents state
  const [pastedContents, setPastedContents] = S9.useState({});

  // Submit count and response length state
  const [submitCount, setSubmitCount] = S9.useState(0);
  const [currentResponseLength, setCurrentResponseLength] = S9.useState(0);
  const [overrideMessage, setOverrideMessage] = S9.useState(null);

  // Message selector and cost warning state
  const [isMessageSelectorVisible, setIsMessageSelectorVisible] = S9.useState(false);
  const [showCostWarning, setShowCostWarning] = S9.useState(false);

  // Conversation updateSnapshotAndNotify state
  const [conversationId, setConversationId] = S9.useState(cAA());
  const [hasAcknowledgedCostThreshold, setHasAcknowledgedCostThreshold] = S9.useState(getCachedOrFreshConfig().hasAcknowledgedCostThreshold);
  const [inProgressToolUseIDs, setInProgressToolUseIDs] = S9.useState(new Set());
  const [vimMode, setVimMode] = S9.useState("INSERT");

  // Haiku state
  const {
    haikuWords,
    generateHaikuWord
  } = useHaikuSpinnerWords(isLoading);

  // IDE installation status
  const [ideInstallationStatus, setIdeInstallationStatus] = S9.useState(null);
  const [showIdeInstallPrompt, setShowIdeInstallPrompt] = S9.useState(false);

  // Effect: Handle IDE auto-install and activity
  S9.useEffect(() => {
    function handleIdeInstall(ideInfo) {
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
    or0(handleIdeInstall, () => setShowIdeInstallPrompt(true), ideStatus => {
      setIdeInstallationStatus(ideStatus);
    });
  }, []);

  // Effect: Handle rate limit changes and notifications
  S9.useEffect(() => {
    if (rateLimitResetsAt !== rateLimitState.resetsAt) setMainState(prev => ({
      ...prev,
      rateLimitResetsAt: rateLimitState.resetsAt
    }));
    handleRateLimitFallback(maxRateLimitFallbackActive, rateLimitResetsAt, rateLimitState, fallbackActive => setMainState(prev => ({
      ...prev,
      maxRateLimitFallbackActive: fallbackActive
    })));
    if (maxRateLimitFallbackActive && mainLoopModel === null) addNotification({
      text: `Claude Opus 4 limit reached, now using ${getOpusOrSonnetLabel(JX())}`
    });
  }, [addNotification, maxRateLimitFallbackActive, mainLoopModel, rateLimitResetsAt, rateLimitState, setMainState]);

  // Callback: Set message history and update conversation updateSnapshotAndNotify
  const handleSetMessageHistory = S9.useCallback(newHistory => {
    setMessageHistory(newHistory);
    clearConsoleScreen();
    setConversationId(cAA());
  }, []);

  // Input change handler for prompt/haiku
  const handleInputChange = inputValue => {
    setInput(inputValue);
    if (mode !== "prompt") return;
    if (!inputValue) return;
    if (haikuWords.length > 0 && (!inputValue.endsWith(" ") || input.endsWith(" "))) return;
    if (!inputValue.includes(" ")) return;
    if (inputValue.length >= 3 && !inputValue.startsWith("!") && !inputValue.startsWith("#") && !inputValue.startsWith("/")) {
      generateHaikuWord(inputValue);
    }
  };

  // Memoize normalized todo storage key
  const normalizedTodoKey = S9.useMemo(() => getAgentConfigFilePath(g9()), []);
  const todoFileStateRef = S9.useRef({
    [normalizedTodoKey]: {
      content: JSON.stringify(initialTodos || []),
      timestamp: 0
    }
  });

  // API key status
  const {
    status: apiKeyStatus,
    reverify: reverifyApiKey
  } = useVerificationStatus();

  // Helper: Abort current tool use or message
  function abortCurrentInteraction() {
    if (!isLoading) return;
    setIsLoading(false);
    setCurrentResponseLength(0);
    setToolUseConfirmQueue([]);
    setOverrideMessage(null);
    if (toolUseConfirmQueue[0]) {
      toolUseConfirmQueue[0].onAbort();
      setToolUseConfirmQueue([]);
    } else if (abortController) {
      abortController.abort();
    }
  }

  // Callback: Submit all queued commands as input
  const handleSubmitQueuedCommands = S9.useCallback(() => {
    if (queuedCommands.length === 0) return;
    setInput([
      ...queuedCommands.map(cmd => cmd.value),
      input
    ].filter(Boolean).join("\n"));
    setMode("prompt");
    setQueuedCommands(() => []);
  }, [queuedCommands, setInput, setMode, setQueuedCommands, input]);

  // Stream event handler
  handleEscapeEvent(setToolUseConfirmQueue, abortCurrentInteraction, isLoading, isMessageSelectorVisible, queuedCommands, abortController?.signal, handleSubmitQueuedCommands, vimMode);

  // Effect: Show cost warning if threshold reached
  S9.useEffect(() => {
    if (SJ() >= 5 && !showCostWarning && !hasAcknowledgedCostThreshold) {
      logTelemetryEventIfEnabled("tengu_cost_threshold_reached", {});
      if (hasInsufficientOrElevatedOAuthRoles() && !process.env.DISABLE_COST_WARNINGS) setShowCostWarning(true);
    }
  }, [messages, showCostWarning, hasAcknowledgedCostThreshold]);

  // Memoized normalized message lists
  const normalizedMessages = S9.useMemo(() => s3(messages).filter(isValidMessageEntry), [messages]);
  const normalizedHistory = S9.useMemo(() => s3(messageHistory).filter(isValidMessageEntry), [messageHistory]);
  const unresolvedToolUseIDs = S9.useMemo(() => MO(normalizedMessages), [normalizedMessages]);
  const erroredToolUseIDs = S9.useMemo(() => QK1(normalizedMessages), [normalizedMessages]);

  // Tool permission context setter
  const handleSetToolPermissionContext = S9.useCallback(newContext => {
    setMainState(prev => ({
      ...prev,
      toolPermissionContext: newContext
    }));
  }, [setMainState]);

  // Tool use context factory
  const getToolUseContext = S9.useCallback((currentMessages, toolMessages, controller) => {
    return {
      abortController: controller,
      options: {
        commands: normalizedCommands,
        tools: normalizedTools,
        debug,
        verbose,
        mainLoopModel: normalizedMainLoopModel,
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
        setQueuedCommands(prev => prev.filter(cmd => !ids.includes(cmd)));
      },
      messages: currentMessages,
      setMessages,
      setMessageHistory: handleSetMessageHistory,
      onChangeAPIKey: reverifyApiKey,
      readFileState: todoFileStateRef.current,
      setToolJSX,
      addNotification,
      setToolPermissionContext: handleSetToolPermissionContext,
      onChangeDynamicMcpConfig: handleDynamicMcpConfigChange,
      nestedMemoryAttachmentTriggers: new Set(),
      setResponseLength: setCurrentResponseLength,
      setStreamMode: setSpinnerMessage,
      setSpinnerMessage: setOverrideMessage,
      setInProgressToolUseIDs,
      agentId: g9()
    };
  }, [normalizedCommands, debug, normalizedTools, mcp.resources, verbose, normalizedMainLoopModel, normalizedMcpClients, ideInstallationStatus, currentDynamicMcpConfig, handleSetMessageHistory, reverifyApiKey, addNotification, handleSetToolPermissionContext, handleDynamicMcpConfigChange, queuedCommandsRef, setQueuedCommands, setCurrentResponseLength, setSpinnerMessage, setOverrideMessage]);

  // Initial prompt effect
  S9.useEffect(() => {
    async function runInitialPrompt() {
      reverifyApiKey();
      const fileStates = uD();
      for (const file of fileStates) {
        todoFileStateRef.current[file.path] = {
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
        getToolUseContext(messages, messages, controller),
        null,
        selectedIde,
        undefined
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
          setOverrideMessage(null);
          return;
        }
        const [tools, uw, handleMissingDoctypeError] = await Promise.all([
          Zj(normalizedTools, normalizedMainLoopModel, Object.values(mcp.resources).flat()),
          UW(),
          WE(false)
        ]);
        for await (const event of processStreamWithCompactionAndToolUse([...messages, ...promptMessages], tools, uw, handleMissingDoctypeError, NS2(setToolUseConfirmQueue), getToolUseContext([...messages, ...promptMessages], promptMessages, controller))) {
          handleStreamEvent(event, newMsg => {
            setMessages(prev => [...prev, newMsg]);
          },
          newText => setCurrentResponseLength(prev => prev + newText.length),
          setSpinnerMessage,
          setToolUseConfirmQueue);
        }
      } else {
        addDisplayStateToHistory(initialPrompt);
      }
      setHasAcknowledgedCostThreshold(getCachedOrFreshConfig().hasAcknowledgedCostThreshold || false);
      setIsLoading(false);
      setCurrentResponseLength(0);
      setToolUseConfirmQueue([]);
      setOverrideMessage(null);
    }
    runInitialPrompt();
    return () => {
      qK.shutdown();
    };
  }, []);

  // Query handler for user input
  async function handleQuery(newMessages, controller, shouldStream) {
    setMessages(prev => [...prev, ...newMessages]);
    setCurrentResponseLength(0);
    setToolUseConfirmQueue([]);
    if (shouldStream) {
      qK.handleQueryStart(normalizedMcpClients);
      const browserWindow = findConnectedIdeEntry(normalizedMcpClients);
      if (browserWindow) rr0(browserWindow);
    }
    completeProjectOnboardingIfNeeded();
    const lastMessage = newMessages[newMessages.length - 1];
    if (lastMessage?.type === "user" && typeof lastMessage.message.content === "string") {
      analyzeAndSetConversationTitleIfNewTopic(lastMessage.message.content);
    }
    if (!shouldStream) {
      setAbortController(null);
      setIsLoading(false);
      setOverrideMessage(null);
      return;
    }
    const toolUseContext = getToolUseContext([...messages, ...newMessages], newMessages, controller);
    const [tools, uw, handleMissingDoctypeError] = await Promise.all([
      Zj(normalizedTools, normalizedMainLoopModel),
      UW(),
      WE(false)
    ]);
    for await (const event of processStreamWithCompactionAndToolUse([...messages, ...newMessages], tools, uw, handleMissingDoctypeError, NS2(setToolUseConfirmQueue), toolUseContext, undefined)) {
      handleStreamEvent(event, newMsg => {
        setMessages(prev => [...prev, newMsg]);
      },
      newText => setCurrentResponseLength(prev => prev + newText.length),
      setSpinnerMessage,
      setToolUseConfirmQueue);
    }
    setIsLoading(false);
    setToolUseConfirmQueue([]);
    setCurrentResponseLength(0);
    setOverrideMessage(null);
  }

  // Miscellaneous effects
  ez2();
  hN2(messages, messages.length === initialMessages?.length);
  zS2();

  // Effect: Track prompt queue usage
  S9.useEffect(() => {
    if (queuedCommands.length < 1) return;
    const appState = getCachedOrFreshConfig();
    updateProjectsAccessor({
      ...appState,
      promptQueueUseCount: (appState.promptQueueUseCount ?? 0) + 1
    });
  }, [queuedCommands.length]);

  // Cost warning state
  const showCostWarningBanner = !isLoading && showCostWarning;

  // Effect: Update last user interaction time
  S9.useEffect(() => {
    fp();
  }, [input, submitCount]);

  // Effect: Idle notification
  S9.useEffect(() => {
    if (isLoading) return;
    if (submitCount === 0) return;
    const idleTimeout = setTimeout(() => {
      const idleMs = Date.now() - q01();
      if (!isLoading && toolUseConfirmQueue.length === 0 && !toolJSX && !showCostWarningBanner && !isMessageSelectorVisible && idleMs >= getCachedOrFreshConfig().messageIdleNotifThresholdMs) {
        notifyUserBasedOnConfig({ message: "Claude is waiting for your input" });
      }
    }, getIdleNotificationThreshold());
    return () => clearTimeout(idleTimeout);
  }, [isLoading, toolUseConfirmQueue.length, toolJSX, showCostWarningBanner, isMessageSelectorVisible, messages, submitCount]);

  // UI: Transcript screen
  if (currentScreen === "transcript") {
    return r4.createElement(r4.Fragment, null,
      r4.createElement(renderTranscriptMessages, {
        messages,
        normalizedMessageHistory: normalizedHistory,
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

  // UI: Main chat screen
  return r4.createElement(r4.Fragment, null,
    r4.createElement(renderTranscriptMessages, {
      messages,
      normalizedMessageHistory: normalizedHistory,
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
    r4.createElement(g, { flexDirection: "column", width: "100%" },
      // Show haiku animation if loading
      !toolJSX && toolUseConfirmQueue.length === 0 && isLoading && r4.createElement(HaikuStatusBar, {
        mode: spinnerMessage,
        haikuWords,
        currentResponseLength,
        overrideMessage
      }),
      // Show tool JSX if present
      toolJSX ? toolJSX.jsx : null,
      // Show tool use confirmation UI
      !toolJSX && toolUseConfirmQueue[0] !== undefined && !isMessageSelectorVisible && r4.createElement(renderToolPermissionComponent, {
        onDone: () => setToolUseConfirmQueue(([first, ...rest]) => rest),
        onReject: handleSubmitQueuedCommands,
        setToolPermissionContext: handleSetToolPermissionContext,
        toolUseConfirm: toolUseConfirmQueue[0],
        toolUseContext: getToolUseContext(messages, messages, abortController ?? new AbortController()),
        verbose
      }),
      // Show cost warning banner
      !toolJSX && toolUseConfirmQueue.length === 0 && !isMessageSelectorVisible && showCostWarningBanner && r4.createElement(SessionSpendingNotification, {
        onDone: () => {
          setShowCostWarning(false);
          setHasAcknowledgedCostThreshold(true);
          const appState = getCachedOrFreshConfig();
          updateProjectsAccessor({
            ...appState,
            hasAcknowledgedCostThreshold: true
          });
          logTelemetryEventIfEnabled("tengu_cost_threshold_acknowledged", {});
        }
      }),
      // Show auto-updater result
      false && r4.createElement(useMainLoopUtility, {
        onDone: async () => {
          await performCleanupAndExit(0);
        }
      }),
      // Show IDE install prompt
      showIdeInstallPrompt && r4.createElement(renderClaudeCodeInstallSuccessScreen, {
        onDone: () => setShowIdeInstallPrompt(false),
        installedVersion: ideInstallationStatus?.installedVersion ?? null
      }),
      // Show prompt input
      toolUseConfirmQueue.length === 0 && !toolJSX?.shouldHidePromptInput && shouldShowPromptInput && !isMessageSelectorVisible && !showCostWarningBanner && !false && !showIdeInstallPrompt && !false && r4.createElement(r4.Fragment, null,
        r4.createElement(KS2, {
          debug,
          ideSelection: selectedIde,
          getToolUseContext,
          toolPermissionContext,
          setToolPermissionContext: handleSetToolPermissionContext,
          apiKeyStatus,
          commands: normalizedCommands,
          isLoading,
          onExit: async () => {
            false && true;
            if (!(await validateAndProcessInteractions(messages))) {
              await performCleanupAndExit(0);
              return;
            }
            false && true;
          },
          onQuery: handleQuery,
          verbose,
          messages,
          setToolJSX,
          onAutoUpdaterResult: setAutoUpdaterResult,
          autoUpdaterResult,
          input,
          onInputChange: handleInputChange,
          mode,
          onModeChange: setMode,
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
      // Message selector UI
      isMessageSelectorVisible && r4.createElement(MessageSelector, {
        erroredToolUseIDs,
        unresolvedToolUseIDs,
        messages,
        onSelect: async selectedMessage => {
          setIsMessageSelectorVisible(false);
          if (!messages.includes(selectedMessage)) return;
          abortCurrentInteraction();
          setImmediate(async () => {
            await clearConsoleScreen();
            const msgIndex = messages.indexOf(selectedMessage);
            const historySlice = messages.slice(0, msgIndex);
            setMessages([...historySlice]);
            setConversationId(cAA());
            if (typeof selectedMessage.message.content === "string") {
              const bashInput = fG(selectedMessage.message.content, "bash-input");
              if (bashInput) {
                setInput(bashInput);
                setMode("bash");
              } else {
                setInput(selectedMessage.message.content);
                setMode("prompt");
              }
            } else if (Array.isArray(selectedMessage.message.content) && selectedMessage.message.content.length >= 2 && selectedMessage.message.content.some(x => x.type === "image") && selectedMessage.message.content.some(x => x.type === "text")) {
              const textContent = selectedMessage.message.content.find(x => x.type === "text");
              if (textContent && textContent.type === "text") {
                setInput(textContent.text);
                setMode("prompt");
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
      // Fallback UI
      !showIdeInstallPrompt && r4.createElement(RG, null)
    )
  );
}

module.exports = createChatAppFactory;