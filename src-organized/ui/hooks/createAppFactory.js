/**
 * Factory function for initializing and managing the main application state and UI for the Claude chat interface.
 * Handles message history, tool usage, notifications, rate limits, and dynamic configuration.
 *
 * @param {Object} options - Configuration and initial state for the app.
 * @param {Array} options.commands - List of available commands.
 * @param {boolean} options.debug - Debug mode flag.
 * @param {string} options.initialPrompt - Initial prompt to display.
 * @param {boolean} options.shouldShowPromptInput - Whether to show the prompt input field.
 * @param {Array} options.initialTools - List of initial tools.
 * @param {Array} options.initialMessages - Initial message history.
 * @param {Array} options.initialTodos - Initial todo items.
 * @param {string} options.tipOfTheDay - Tip of the day text.
 * @param {Array} options.mcpClients - List of MCP clients.
 * @param {Object} options.dynamicMcpConfig - Dynamic MCP configuration object.
 * @returns {React.ReactElement} The root React element for the application UI.
 */
function createAppFactory({
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
  const [appState, setAppState] = useAppState();
  const {
    todoFeatureEnabled,
    toolPermissionContext,
    verbose,
    mainLoopModel,
    maxRateLimitFallbackActive,
    mcp,
    rateLimitResetsAt
  } = appState;
  const normalizedMainLoopModel = useMainLoopModelAccessor();
  const rateLimitInfo = useReactiveData();
  const enabledTools = S9.useMemo(() => Hk(toolPermissionContext, todoFeatureEnabled), [toolPermissionContext, todoFeatureEnabled]);
  const [currentDynamicMcpConfig, setDynamicMcpConfig] = S9.useState(dynamicMcpConfig);
  const handleDynamicMcpConfigChange = S9.useCallback(newConfig => {
    setDynamicMcpConfig(newConfig);
  }, [setDynamicMcpConfig]);
  const [currentScreen, setCurrentScreen] = S9.useState("prompt");
  const [screenToggleId, setScreenToggleId] = S9.useState(1);
  const [showAllInTranscript, setShowAllInTranscript] = S9.useState(false);
  const {
    notification,
    addNotification
  } = useNotificationManager();
  useMcpDataSync(addNotification, currentDynamicMcpConfig);
  const normalizedMcpClients = qS2(mcpClients, mcp.clients);
  const normalizedTools = LS2([...enabledTools, ...initialTools], mcp.tools);
  const normalizedCommands = OS2(commands, mcp.commands);
  const [selectedIde, setSelectedIde] = S9.useState(null);
  z$2(mcp.clients);
  useIdeSelectionNotificationHandler(mcp.clients, setSelectedIde);
  const [spinnerMode, setSpinnerMode] = S9.useState("responding");
  const [toolUseConfirmQueue, setToolUseConfirmQueue] = S9.useState([]);
  const [abortController, setAbortController] = S9.useState(null);
  const [isLoading, setIsLoading] = S9.useState(false);
  const [autoUpdaterResult, setAutoUpdaterResult] = S9.useState(null);
  const [toolJSX, setToolJSX] = S9.useState(null);
  const [messages, setMessages] = S9.useState(initialMessages ?? []);
  const [messageHistory, setMessageHistory] = S9.useState([]);
  const [input, setInput] = S9.useState("");
  const [inputMode, setInputMode] = S9.useState("prompt");
  const {
    queuedCommands,
    queuedCommandsRef,
    setQueuedCommands
  } = useQueuedCommands();
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
  const {
    haikuWords,
    generateHaikuWord
  } = useHaikuSpinnerWords(isLoading);
  const [ideInstallationStatus, setIdeInstallationStatus] = S9.useState(null);
  const [showIdeInstallPrompt, setShowIdeInstallPrompt] = S9.useState(false);

  // Effect: handle IDE installation and activity
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
    or0(handleIdeInstall, () => setShowIdeInstallPrompt(true), installStatus => {
      setIdeInstallationStatus(installStatus);
    });
  }, []);

  // Effect: handle rate limit resets and fallback
  S9.useEffect(() => {
    if (rateLimitResetsAt !== rateLimitInfo.resetsAt) {
      setAppState(prev => ({ ...prev, rateLimitResetsAt: rateLimitInfo.resetsAt }));
    }
    handleRateLimitFallback(maxRateLimitFallbackActive, rateLimitResetsAt, rateLimitInfo, fallbackActive => setAppState(prev => ({ ...prev, maxRateLimitFallbackActive: fallbackActive })));
    if (maxRateLimitFallbackActive && mainLoopModel === null) {
      addNotification({
        text: `Claude Opus 4 limit reached, now using ${getOpusOrSonnetLabel(JX())}`
      });
    }
  }, [addNotification, maxRateLimitFallbackActive, mainLoopModel, rateLimitResetsAt, rateLimitInfo, setAppState]);

  // Callback: set message history and reset conversationId
  const handleSetMessageHistory = S9.useCallback(newHistory => {
    setMessageHistory(newHistory);
    clearConsoleScreen();
    setConversationId(cAA());
  }, []);

  // Input change handler for prompt
  const handleInputChange = inputValue => {
    setInput(inputValue);
    if (inputMode !== "prompt") return;
    if (!inputValue) return;
    // Only generate haiku word if input is a new word
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

  // Memoized local storage key for todos
  const todosStorageKey = S9.useMemo(() => getAgentConfigFilePath(g9()), []);
  const readFileStateRef = S9.useRef({
    [todosStorageKey]: {
      content: JSON.stringify(initialTodos || []),
      timestamp: 0
    }
  });

  // API key status
  const {
    status: apiKeyStatus,
    reverify: reverifyApiKey
  } = useVerificationStatus();

  // Helper: abort current tool use or message
  function abortCurrentToolUse() {
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

  // Callback: handle queued commands submission
  const handleQueuedCommandsSubmit = S9.useCallback(() => {
    if (queuedCommands.length === 0) return;
    setInput([
      ...queuedCommands.map(cmd => cmd.value),
      input
    ].filter(Boolean).join("\n"));
    setInputMode("prompt");
    setQueuedCommands(() => []);
  }, [queuedCommands, setInput, setInputMode, setQueuedCommands, input]);

  // Streaming and tool use event handlers
  handleEscapeEvent(setToolUseConfirmQueue, abortCurrentToolUse, isLoading, isMessageSelectorVisible, queuedCommands, abortController?.signal, handleQueuedCommandsSubmit, vimMode);

  // Effect: show cost threshold warning if needed
  S9.useEffect(() => {
    if (SJ() >= 5 && !showCostThresholdWarning && !hasAcknowledgedCostThreshold) {
      logTelemetryEventIfEnabled("tengu_cost_threshold_reached", {});
      if (hasInsufficientOrElevatedOAuthRoles() && !process.env.DISABLE_COST_WARNINGS) setShowCostThresholdWarning(true);
    }
  }, [messages, showCostThresholdWarning, hasAcknowledgedCostThreshold]);

  // Memoized normalized message arrays
  const normalizedMessages = S9.useMemo(() => s3(messages).filter(isValidMessageEntry), [messages]);
  const normalizedMessageHistory = S9.useMemo(() => s3(messageHistory).filter(isValidMessageEntry), [messageHistory]);
  const unresolvedToolUseIDs = S9.useMemo(() => MO(normalizedMessages), [normalizedMessages]);
  const erroredToolUseIDs = S9.useMemo(() => QK1(normalizedMessages), [normalizedMessages]);

  // Tool permission context setter
  const setToolPermissionContext = S9.useCallback(context => {
    setAppState(prev => ({ ...prev, toolPermissionContext: context }));
  }, [setAppState]);

  // Tool use context factory
  const getToolUseContext = S9.useCallback((currentMessages, toolMessages, abortCtrl) => {
    return {
      abortController: abortCtrl,
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
      readFileState: readFileStateRef.current,
      setToolJSX,
      addNotification,
      setToolPermissionContext,
      onChangeDynamicMcpConfig: handleDynamicMcpConfigChange,
      nestedMemoryAttachmentTriggers: new Set(),
      setResponseLength: setCurrentResponseLength,
      setStreamMode: setSpinnerMode,
      setSpinnerMessage,
      setInProgressToolUseIDs,
      agentId: g9()
    };
  }, [normalizedCommands, debug, normalizedTools, mcp.resources, verbose, normalizedMainLoopModel, normalizedMcpClients, ideInstallationStatus, currentDynamicMcpConfig, handleSetMessageHistory, reverifyApiKey, addNotification, setToolPermissionContext, handleDynamicMcpConfigChange, queuedCommandsRef, setQueuedCommands, setCurrentResponseLength, setSpinnerMode, setSpinnerMessage, setInProgressToolUseIDs]);

  // Initial message load effect
  S9.useEffect(() => {
    async function loadInitialPrompt() {
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
      setToolUseConfirmQueue([]);
      const abortCtrl = new AbortController();
      setAbortController(abortCtrl);
      const {
        messages: promptMessages,
        shouldQuery
      } = await handleUserInput(
        initialPrompt,
        "prompt",
        setToolJSX,
        getToolUseContext(messages, messages, abortCtrl),
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
          setSpinnerMessage(null);
          return;
        }
        const [toolList, uwResult, weResult] = await Promise.all([
          Zj(normalizedTools, normalizedMainLoopModel, Object.values(mcp.resources).flat()),
          UW(),
          WE(false)
        ]);
        for await (const event of processStreamWithCompactionAndToolUse([...messages, ...promptMessages], toolList, uwResult, weResult, NS2(setToolUseConfirmQueue), getToolUseContext([...messages, ...promptMessages], promptMessages, abortCtrl))) {
          handleStreamEvent(event, newMsg => {
            setMessages(prev => [...prev, newMsg]);
          }, newText => setCurrentResponseLength(prev => prev + newText.length), setSpinnerMode, setToolUseConfirmQueue);
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
    loadInitialPrompt();
    return () => {
      qK.shutdown();
    };
  }, []);

  // Handler for submitting a new message or tool use
  async function handleQuerySubmit(newMessages, abortCtrl, shouldStream) {
    setMessages(prev => [...prev, ...newMessages]);
    setCurrentResponseLength(0);
    setToolUseConfirmQueue([]);
    if (shouldStream) {
      qK.handleQueryStart(normalizedMcpClients);
      const bwResult = findConnectedIdeEntry(normalizedMcpClients);
      if (bwResult) rr0(bwResult);
    }
    completeProjectOnboardingIfNeeded();
    const lastMsg = newMessages[newMessages.length - 1];
    if (lastMsg?.type === "user" && typeof lastMsg.message.content === "string") {
      analyzeAndSetConversationTitleIfNewTopic(lastMsg.message.content);
    }
    if (!shouldStream) {
      setAbortController(null);
      setIsLoading(false);
      setSpinnerMessage(null);
      return;
    }
    const toolUseContext = getToolUseContext([...messages, ...newMessages], newMessages, abortCtrl);
    const [toolList, uwResult, weResult] = await Promise.all([
      Zj(normalizedTools, normalizedMainLoopModel),
      UW(),
      WE(false)
    ]);
    for await (const event of processStreamWithCompactionAndToolUse([...messages, ...newMessages], toolList, uwResult, weResult, NS2(setToolUseConfirmQueue), toolUseContext, undefined)) {
      handleStreamEvent(event, newMsg => {
        setMessages(prev => [...prev, newMsg]);
      }, newText => setCurrentResponseLength(prev => prev + newText.length), setSpinnerMode, setToolUseConfirmQueue);
    }
    setIsLoading(false);
    setToolUseConfirmQueue([]);
    setCurrentResponseLength(0);
    setSpinnerMessage(null);
  }

  // Miscellaneous effects and handlers
  ez2();
  hN2(messages, messages.length === initialMessages?.length);
  zS2();

  // Effect: increment prompt queue use count
  S9.useEffect(() => {
    if (queuedCommands.length < 1) return;
    const appConfig = getCachedOrFreshConfig();
    updateProjectsAccessor({
      ...appConfig,
      promptQueueUseCount: (appConfig.promptQueueUseCount ?? 0) + 1
    });
  }, [queuedCommands.length]);

  // Effect: update last user interaction time
  S9.useEffect(() => {
    fp();
  }, [input, submitCount]);

  // Effect: idle notification
  S9.useEffect(() => {
    if (isLoading) return;
    if (submitCount === 0) return;
    const idleTimeout = setTimeout(() => {
      const idleMs = Date.now() - q01();
      if (!isLoading && toolUseConfirmQueue.length === 0 && !toolJSX && !(!isLoading && showCostThresholdWarning) && !isMessageSelectorVisible && idleMs >= getCachedOrFreshConfig().messageIdleNotifThresholdMs) {
        notifyUserBasedOnConfig({ message: "Claude is waiting for your input" });
      }
    }, getIdleNotificationThreshold());
    return () => clearTimeout(idleTimeout);
  }, [isLoading, toolUseConfirmQueue.length, toolJSX, showCostThresholdWarning, isMessageSelectorVisible, messages, submitCount]);

  // Screen toggle and auto-updater state
  registerTranscriptKeyboardShortcuts(currentScreen, setCurrentScreen, setScreenToggleId, setShowAllInTranscript, clearConsoleScreen);
  const [showAutoUpdater, setShowAutoUpdater] = S9.useState(false);
  const [showExitScreen, setShowExitScreen] = S9.useState(false);

  // Render transcript screen
  if (currentScreen === "transcript") {
    return r4.createElement(r4.Fragment, null,
      r4.createElement(renderTranscriptMessages, {
        messages,
        normalizedMessageHistory,
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

  // Main render
  return r4.createElement(r4.Fragment, null,
    r4.createElement(renderTranscriptMessages, {
      messages,
      normalizedMessageHistory,
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
      // Show haiku loading animation
      !toolJSX && toolUseConfirmQueue.length === 0 && isLoading && r4.createElement(HaikuStatusBar, {
        mode: spinnerMode,
        haikuWords,
        currentResponseLength,
        overrideMessage: spinnerMessage
      }),
      // Render tool JSX if present
      toolJSX ? toolJSX.jsx : null,
      // Tool use confirmation dialog
      !toolJSX && toolUseConfirmQueue[0] !== undefined && !isMessageSelectorVisible && r4.createElement(renderToolPermissionComponent, {
        onDone: () => setToolUseConfirmQueue(([first, ...rest]) => rest),
        onReject: handleQueuedCommandsSubmit,
        setToolPermissionContext,
        toolUseConfirm: toolUseConfirmQueue[0],
        toolUseContext: getToolUseContext(messages, messages, abortController ?? new AbortController()),
        verbose
      }),
      // Cost threshold warning
      !toolJSX && toolUseConfirmQueue.length === 0 && !isMessageSelectorVisible && showCostThresholdWarning && r4.createElement(SessionSpendingNotification, {
        onDone: () => {
          setShowCostThresholdWarning(false);
          setHasAcknowledgedCostThreshold(true);
          const appConfig = getCachedOrFreshConfig();
          updateProjectsAccessor({ ...appConfig, hasAcknowledgedCostThreshold: true });
          logTelemetryEventIfEnabled("tengu_cost_threshold_acknowledged", {});
        }
      }),
      // Auto-updater
      showAutoUpdater && r4.createElement(useMainLoopUtility, {
        onDone: async () => {
          await performCleanupAndExit(0);
        }
      }),
      // IDE install prompt
      showIdeInstallPrompt && r4.createElement(renderClaudeCodeInstallSuccessScreen, {
        onDone: () => setShowIdeInstallPrompt(false),
        installedVersion: ideInstallationStatus?.installedVersion ?? null
      }),
      // Prompt input
      toolUseConfirmQueue.length === 0 && !toolJSX?.shouldHidePromptInput && shouldShowPromptInput && !isMessageSelectorVisible && !showCostThresholdWarning && !showAutoUpdater && !showIdeInstallPrompt && !showExitScreen && r4.createElement(r4.Fragment, null,
        r4.createElement(KS2, {
          debug,
          ideSelection: selectedIde,
          getToolUseContext,
          toolPermissionContext,
          setToolPermissionContext,
          apiKeyStatus,
          commands: normalizedCommands,
          isLoading,
          onExit: async () => {
            setShowExitScreen(true);
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
      // Message selector
      isMessageSelectorVisible && r4.createElement(MessageSelector, {
        erroredToolUseIDs,
        unresolvedToolUseIDs,
        messages,
        onSelect: async selectedMsg => {
          setIsMessageSelectorVisible(false);
          if (!messages.includes(selectedMsg)) return;
          abortCurrentToolUse();
          setImmediate(async () => {
            await clearConsoleScreen();
            const msgIdx = messages.indexOf(selectedMsg);
            const prevMsgs = messages.slice(0, msgIdx);
            setMessages([...prevMsgs]);
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
              selectedMsg.message.content.some(c => c.type === "image") &&
              selectedMsg.message.content.some(c => c.type === "text")
            ) {
              const textContent = selectedMsg.message.content.find(c => c.type === "text");
              if (textContent && textContent.type === "text") {
                setInput(textContent.text);
                setInputMode("prompt");
              }
              const imageContents = selectedMsg.message.content.filter(c => c.type === "image");
              if (imageContents.length > 0) {
                const pasted = {};
                imageContents.forEach((img, idx) => {
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
      // Fallback loading spinner
      !showIdeInstallPrompt && r4.createElement(RG, null)
    )
  );
}

module.exports = createAppFactory;