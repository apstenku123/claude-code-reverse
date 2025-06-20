/**
 * Factory function for creating and managing an AbortController context for handling user input, tool usage, and streaming events in the main application loop.
 *
 * This function initializes and manages the state and side effects required for the application'createInteractionAccessor main prompt, tool usage, notifications, rate limiting, and IDE integration. It wires together various hooks, event handlers, and context providers to support a rich interactive UI for a code assistant.
 *
 * @param {Object} options - The configuration object for the abort controller context.
 * @param {Array} options.commands - List of available commands.
 * @param {boolean} options.debug - Whether debug mode is enabled.
 * @param {string} options.initialPrompt - The initial prompt to display.
 * @param {boolean} options.shouldShowPromptInput - Whether to show the prompt input field.
 * @param {Array} options.initialTools - List of initial tools.
 * @param {Array} options.initialMessages - List of initial messages.
 * @param {Array} options.initialTodos - List of initial todos.
 * @param {string} options.tipOfTheDay - Tip of the day to display.
 * @param {Array} options.mcpClients - List of MCP client configurations.
 * @param {Object} options.dynamicMcpConfig - Dynamic MCP configuration object.
 * @returns {React.ReactElement} The main application UI element.
 */
function createAbortController({
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
  const mainLoopAccessor = useMainLoopModelAccessor();
  const rateLimitAccessor = useReactiveData();
  const availableTools = S9.useMemo(() => Hk(toolPermissionContext, todoFeatureEnabled), [toolPermissionContext, todoFeatureEnabled]);
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
  const normalizedTools = LS2([...availableTools, ...initialTools], mcp.tools);
  const normalizedCommands = OS2(commands, mcp.commands);
  const [ideSelection, setIdeSelection] = S9.useState(null);
  z$2(mcp.clients);
  useIdeSelectionNotificationHandler(mcp.clients, setIdeSelection);
  const [streamMode, setStreamMode] = S9.useState("responding");
  const [toolUseConfirmQueue, setToolUseConfirmQueue] = S9.useState([]);
  const [abortController, setAbortController] = S9.useState(null);
  const [isLoading, setIsLoading] = S9.useState(false);
  const [autoUpdaterResult, setAutoUpdaterResult] = S9.useState(null);
  const [toolJSX, setToolJSX] = S9.useState(null);
  const [messages, setMessages] = S9.useState(initialMessages ?? []);
  const [messageHistory, setMessageHistory] = S9.useState([]);
  const [input, setInput] = S9.useState("");
  const [mode, setMode] = S9.useState("prompt");
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
  const [costThresholdWarningVisible, setCostThresholdWarningVisible] = S9.useState(false);
  const [conversationId, setConversationId] = S9.useState(cAA());
  const [hasAcknowledgedCostThreshold, setHasAcknowledgedCostThreshold] = S9.useState(getCachedOrFreshConfig().hasAcknowledgedCostThreshold);
  const [inProgressToolUseIDs, setInProgressToolUseIDs] = S9.useState(new Set());
  const [vimMode, setVimMode] = S9.useState("INSERT");
  const {
    haikuWords,
    generateHaikuWord
  } = useHaikuSpinnerWords(isLoading);
  const [ideInstallationStatus, setIdeInstallationStatus] = S9.useState(null);
  const [showIdeInstaller, setShowIdeInstaller] = S9.useState(false);

  // IDE installer effect
  S9.useEffect(() => {
    function handleIdeInstaller(ideConfig) {
      if (!qw() || !ideConfig) return;
      setDynamicMcpConfig(prevConfig => {
        if (prevConfig?.ide) return prevConfig;
        return {
          ...prevConfig,
          ide: {
            type: ideConfig.url.startsWith("ws:") ? "ws-ide" : "sse-ide",
            url: ideConfig.url,
            ideName: ideConfig.name,
            authToken: ideConfig.authToken
          }
        };
      });
    }
    or0(handleIdeInstaller, () => setShowIdeInstaller(true), ideStatus => {
      setIdeInstallationStatus(ideStatus);
    });
  }, []);

  // Rate limit and fallback effect
  S9.useEffect(() => {
    if (rateLimitResetsAt !== rateLimitAccessor.resetsAt) {
      setMainState(prev => ({
        ...prev,
        rateLimitResetsAt: rateLimitAccessor.resetsAt
      }));
    }
    handleRateLimitFallback(maxRateLimitFallbackActive, rateLimitResetsAt, rateLimitAccessor, fallbackActive => setMainState(prev => ({
      ...prev,
      maxRateLimitFallbackActive: fallbackActive
    })));
    if (maxRateLimitFallbackActive && mainLoopModel === null) {
      addNotification({
        text: `Claude Opus 4 limit reached, now using ${getOpusOrSonnetLabel(JX())}`
      });
    }
  }, [addNotification, maxRateLimitFallbackActive, mainLoopModel, rateLimitResetsAt, rateLimitAccessor, setMainState]);

  // Set message history and reset conversationId on change
  const handleSetMessageHistory = S9.useCallback(newHistory => {
    setMessageHistory(newHistory);
    clearConsoleScreen();
    setConversationId(cAA());
  }, []);

  // Handle input change for haiku mode
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

  // File state ref
  const agentConfigFilePath = S9.useMemo(() => getAgentConfigFilePath(g9()), []);
  const readFileStateRef = S9.useRef({
    [agentConfigFilePath]: {
      content: JSON.stringify(initialTodos || []),
      timestamp: 0
    }
  });

  // API key status
  const {
    status: apiKeyStatus,
    reverify: reverifyApiKey
  } = useVerificationStatus();

  /**
   * Aborts the current tool use or streaming operation.
   */
  function abortCurrentOperation() {
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
    setMode("prompt");
    setQueuedCommands(() => []);
  }, [queuedCommands, setInput, setMode, setQueuedCommands, input]);

  // Escape event handler
  handleEscapeEvent(setToolUseConfirmQueue, abortCurrentOperation, isLoading, isMessageSelectorVisible, queuedCommands, abortController?.signal, handleQueuedCommandsSubmit, vimMode);

  // Cost threshold warning effect
  S9.useEffect(() => {
    if (SJ() >= 5 && !costThresholdWarningVisible && !hasAcknowledgedCostThreshold) {
      logTelemetryEventIfEnabled("tengu_cost_threshold_reached", {});
      if (hasInsufficientOrElevatedOAuthRoles() && !process.env.DISABLE_COST_WARNINGS) setCostThresholdWarningVisible(true);
    }
  }, [messages, costThresholdWarningVisible, hasAcknowledgedCostThreshold]);

  // Message normalization
  const normalizedMessages = NS2(setToolUseConfirmQueue);

  // Tool permission context setter
  const handleToolPermissionContextChange = S9.useCallback(newContext => {
    setMainState(prev => ({
      ...prev,
      toolPermissionContext: newContext
    }));
  }, [setMainState]);

  // Tool use context factory
  const getToolUseContext = S9.useCallback((currentMessages, contextMessages, controller) => {
    return {
      abortController: controller,
      options: {
        commands: normalizedCommands,
        tools: normalizedTools,
        debug,
        verbose,
        mainLoopModel: mainLoopAccessor,
        maxThinkingTokens: Kk(contextMessages),
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
      setToolPermissionContext: handleToolPermissionContextChange,
      onChangeDynamicMcpConfig: handleDynamicMcpConfigChange,
      nestedMemoryAttachmentTriggers: new Set(),
      setResponseLength: setCurrentResponseLength,
      setStreamMode,
      setSpinnerMessage,
      setInProgressToolUseIDs,
      agentId: g9()
    };
  }, [normalizedCommands, debug, normalizedTools, mcp.resources, verbose, mainLoopAccessor, normalizedMcpClients, ideInstallationStatus, currentDynamicMcpConfig, handleSetMessageHistory, reverifyApiKey, addNotification, handleToolPermissionContextChange, handleDynamicMcpConfigChange, queuedCommandsRef, setQueuedCommands, setCurrentResponseLength, setStreamMode, setSpinnerMessage]);

  /**
   * Handles the initial prompt submission and streaming response.
   */
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
    setToolUseConfirmQueue([]);
    const controller = new AbortController();
    setAbortController(controller);
    const {
      messages: promptMessages,
      shouldQuery
    } = await handleUserInput(initialPrompt, "prompt", setToolJSX, getToolUseContext(messages, messages, controller), null, ideSelection, void 0);
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
        Zj(normalizedTools, mainLoopAccessor, Object.values(mcp.resources).flat()),
        UW(),
        WE(false)
      ]);
      for await (const streamEvent of processStreamWithCompactionAndToolUse([...messages, ...promptMessages], tools, uw, handleMissingDoctypeError, normalizedMessages, getToolUseContext([...messages, ...promptMessages], promptMessages, controller))) {
        handleStreamEvent(streamEvent, newMsg => {
          setMessages(prev => [...prev, newMsg]);
        }, newText => setCurrentResponseLength(prev => prev + newText.length), setStreamMode, setToolUseConfirmQueue);
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
   * Handles tool use confirmation and streaming response.
   * @param {Array} toolMessages - Messages to send.
   * @param {AbortController} controller - Abort controller for the stream.
   * @param {boolean} shouldQuery - Whether to query the backend.
   */
  async function handleToolUse(toolMessages, controller, shouldQuery) {
    setMessages(prev => [...prev, ...toolMessages]);
    setCurrentResponseLength(0);
    setToolUseConfirmQueue([]);
    if (shouldQuery) {
      qK.handleQueryStart(normalizedMcpClients);
      const ideEntry = findConnectedIdeEntry(normalizedMcpClients);
      if (ideEntry) rr0(ideEntry);
    }
    completeProjectOnboardingIfNeeded();
    const lastMessage = toolMessages[toolMessages.length - 1];
    if (lastMessage?.type === "user" && typeof lastMessage.message.content === "string") {
      analyzeAndSetConversationTitleIfNewTopic(lastMessage.message.content);
    }
    if (!shouldQuery) {
      setAbortController(null);
      setIsLoading(false);
      setSpinnerMessage(null);
      return;
    }
    const toolUseContext = getToolUseContext([...messages, ...toolMessages], toolMessages, controller);
    const [tools, uw, handleMissingDoctypeError] = await Promise.all([
      Zj(normalizedTools, mainLoopAccessor),
      UW(),
      WE(false)
    ]);
    for await (const streamEvent of processStreamWithCompactionAndToolUse([...messages, ...toolMessages], tools, uw, handleMissingDoctypeError, normalizedMessages, toolUseContext, void 0)) {
      handleStreamEvent(streamEvent, newMsg => {
        setMessages(prev => [...prev, newMsg]);
      }, newText => setCurrentResponseLength(prev => prev + newText.length), setStreamMode, setToolUseConfirmQueue);
    }
    setIsLoading(false);
    setToolUseConfirmQueue([]);
    setCurrentResponseLength(0);
    setSpinnerMessage(null);
  }

  // Miscellaneous effects
  ez2();
  hN2(messages, messages.length === initialMessages?.length);
  zS2();

  // Prompt queue usage effect
  S9.useEffect(() => {
    if (queuedCommands.length < 1) return;
    const config = getCachedOrFreshConfig();
    updateProjectsAccessor({
      ...config,
      promptQueueUseCount: (config.promptQueueUseCount ?? 0) + 1
    });
  }, [queuedCommands.length]);

  // Cost threshold warning logic
  const showCostThresholdWarning = !isLoading && costThresholdWarningVisible;

  // Idle notification effect
  S9.useEffect(() => {
    fp();
  }, [input, submitCount]);
  S9.useEffect(() => {
    if (isLoading) return;
    if (submitCount === 0) return;
    const timeoutId = setTimeout(() => {
      const idleMs = Date.now() - q01();
      if (!isLoading && toolUseConfirmQueue.length === 0 && !toolJSX && !showCostThresholdWarning && !isMessageSelectorVisible && idleMs >= getCachedOrFreshConfig().messageIdleNotifThresholdMs) {
        notifyUserBasedOnConfig({
          message: "Claude is waiting for your input"
        });
      }
    }, getIdleNotificationThreshold());
    return () => clearTimeout(timeoutId);
  }, [isLoading, toolUseConfirmQueue.length, toolJSX, showCostThresholdWarning, isMessageSelectorVisible, messages, submitCount]);

  // Initial prompt effect
  S9.useEffect(() => {
    handleInitialPrompt();
    return () => {
      qK.shutdown();
    };
  }, []);

  // Message normalization and unresolved/errored tool use IDs
  const filteredMessages = S9.useMemo(() => s3(messages).filter(isValidMessageEntry), [messages]);
  const filteredMessageHistory = S9.useMemo(() => s3(messageHistory).filter(isValidMessageEntry), [messageHistory]);
  const unresolvedToolUseIDs = S9.useMemo(() => MO(filteredMessages), [filteredMessages]);
  const erroredToolUseIDs = S9.useMemo(() => QK1(filteredMessages), [filteredMessages]);

  // Tool use confirm queue and input state management
  registerTranscriptKeyboardShortcuts(currentScreen, setCurrentScreen, setScreenToggleId, setShowAllInTranscript, clearConsoleScreen);
  const [showAutoUpdater, setShowAutoUpdater] = S9.useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = S9.useState(false);

  // Render transcript screen
  if (currentScreen === "transcript") {
    return r4.createElement(r4.Fragment, null,
      r4.createElement(renderTranscriptMessages, {
        messages,
        normalizedMessageHistory: filteredMessageHistory,
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
        r4.createElement(_, {
          dimColor: true
        }, "Showing detailed transcript · Ctrl+isWildcardOrX to toggle")
      )
    );
  }

  // Main render
  return r4.createElement(r4.Fragment, null,
    r4.createElement(renderTranscriptMessages, {
      messages,
      normalizedMessageHistory: filteredMessageHistory,
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
    r4.createElement(g, {
      flexDirection: "column",
      width: "100%"
    },
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
        toolUseContext: getToolUseContext(messages, messages, abortController ?? new AbortController()),
        verbose
      }),
      !toolJSX && toolUseConfirmQueue.length === 0 && !isMessageSelectorVisible && showCostThresholdWarning && r4.createElement(SessionSpendingNotification, {
        onDone: () => {
          setCostThresholdWarningVisible(false);
          setHasAcknowledgedCostThreshold(true);
          const config = getCachedOrFreshConfig();
          updateProjectsAccessor({
            ...config,
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
      showIdeInstaller && r4.createElement(renderClaudeCodeInstallSuccessScreen, {
        onDone: () => setShowIdeInstaller(false),
        installedVersion: ideInstallationStatus?.installedVersion ?? null
      }),
      toolUseConfirmQueue.length === 0 && !toolJSX?.shouldHidePromptInput && shouldShowPromptInput && !isMessageSelectorVisible && !showCostThresholdWarning && !showAutoUpdater && !showIdeInstaller && !showExitConfirmation && r4.createElement(r4.Fragment, null,
        r4.createElement(KS2, {
          debug,
          ideSelection,
          getToolUseContext,
          toolPermissionContext,
          setToolPermissionContext: handleToolPermissionContextChange,
          apiKeyStatus,
          commands: normalizedCommands,
          isLoading,
          onExit: async () => {
            setShowExitConfirmation(true);
            if (!(await validateAndProcessInteractions(messages))) {
              await performCleanupAndExit(0);
              return;
            }
            setShowAutoUpdater(true);
          },
          onQuery: handleToolUse,
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
            setIdeSelection(null);
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
          abortCurrentOperation();
          setImmediate(async () => {
            await clearConsoleScreen();
            const msgIdx = messages.indexOf(selectedMsg);
            const prevMessages = messages.slice(0, msgIdx);
            setMessages([...prevMessages]);
            setConversationId(cAA());
            if (typeof selectedMsg.message.content === "string") {
              const bashInput = fG(selectedMsg.message.content, "bash-input");
              if (bashInput) {
                setInput(bashInput);
                setMode("bash");
              } else {
                setInput(selectedMsg.message.content);
                setMode("prompt");
              }
            } else if (Array.isArray(selectedMsg.message.content) && selectedMsg.message.content.length >= 2 && selectedMsg.message.content.some(x => x.type === "image") && selectedMsg.message.content.some(x => x.type === "text")) {
              const textContent = selectedMsg.message.content.find(item => item.type === "text");
              if (textContent && textContent.type === "text") {
                setInput(textContent.text);
                setMode("prompt");
              }
              const imageContents = selectedMsg.message.content.filter(item => item.type === "image");
              if (imageContents.length > 0) {
                const pastedImages = {};
                imageContents.forEach((img, idx) => {
                  if (img.source.type === "base64") {
                    pastedImages[idx + 1] = {
                      id: idx + 1,
                      type: "image",
                      content: img.source.data,
                      mediaType: img.source.media_type
                    };
                  }
                });
                setPastedContents(pastedImages);
              }
            }
          });
        },
        onEscape: () => setIsMessageSelectorVisible(false),
        tools: normalizedTools
      }),
      !showIdeInstaller && r4.createElement(RG, null)
    )
  );
}

module.exports = createAbortController;
