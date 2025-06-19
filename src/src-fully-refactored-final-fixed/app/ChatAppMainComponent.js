/**
 * ChatAppMainComponent
 *
 * This is the main React component for the chat application. It manages all state, side effects, and renders the UI for chat, tool use, notifications, and IDE integration.
 *
 * @param {Object} props - The properties for the chat app.
 * @param {Array} props.commands - List of available commands.
 * @param {boolean} props.debug - Whether debug mode is enabled.
 * @param {string} props.initialPrompt - The initial prompt to display.
 * @param {boolean} props.shouldShowPromptInput - Whether to show the prompt input field.
 * @param {Array} props.initialTools - List of initial tools.
 * @param {Array} props.initialMessages - Initial chat messages.
 * @param {Array} props.initialTodos - Initial todo items.
 * @param {string} props.tipOfTheDay - Tip of the day string.
 * @param {Array} props.mcpClients - List of MCP clients.
 * @param {Object} props.dynamicMcpConfig - Dynamic MCP configuration.
 * @returns {React.Element} The rendered chat application UI.
 */
function ChatAppMainComponent({
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
  // State and hooks
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
  const reactiveData = useReactiveData();
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
  const [selectedIde, setSelectedIde] = S9.useState(null);
  z$2(mcp.clients);
  useIdeSelectionNotificationHandler(mcp.clients, setSelectedIde);
  const [responseMode, setResponseMode] = S9.useState("responding");
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

  // IDE selection effect
  S9.useEffect(() => {
    function handleIdeSelection(ide) {
      if (!qw() || !ide) return;
      setDynamicMcpConfig(prevConfig => {
        if (prevConfig?.ide) return prevConfig;
        return {
          ...prevConfig,
          ide: {
            type: ide.url.startsWith("ws:") ? "ws-ide" : "sse-ide",
            url: ide.url,
            ideName: ide.name,
            authToken: ide.authToken
          }
        };
      });
    }
    or0(handleIdeSelection, () => setShowIdeInstallPrompt(true), ide => {
      setIdeInstallationStatus(ide);
    });
  }, []);

  // Rate limit and notification effect
  S9.useEffect(() => {
    if (rateLimitResetsAt !== reactiveData.resetsAt) setMainState(prev => ({
      ...prev,
      rateLimitResetsAt: reactiveData.resetsAt
    }));
    handleRateLimitFallback(maxRateLimitFallbackActive, rateLimitResetsAt, reactiveData, fallbackActive => setMainState(prev => ({
      ...prev,
      maxRateLimitFallbackActive: fallbackActive
    })));
    if (maxRateLimitFallbackActive && mainLoopModel === null) addNotification({
      text: `Claude Opus 4 limit reached, now using ${getOpusOrSonnetLabel(JX())}`
    });
  }, [addNotification, maxRateLimitFallbackActive, mainLoopModel, rateLimitResetsAt, reactiveData, setMainState]);

  // Set message history and reset conversationId on message change
  const handleSetMessageHistory = S9.useCallback(history => {
    setMessageHistory(history);
    clearConsoleScreen();
    setConversationId(cAA());
  }, []);

  // Input change handler for prompt
  const handleInputChange = inputValue => {
    setInput(inputValue);
    if (inputMode !== "prompt") return;
    if (!inputValue) return;
    if (haikuWords.length > 0 && (!inputValue.endsWith(" ") || input.endsWith(" "))) return;
    if (!inputValue.includes(" ")) return;
    if (inputValue.length >= 3 && !inputValue.startsWith("!") && !inputValue.startsWith("#") && !inputValue.startsWith("/")) generateHaikuWord(inputValue);
  };

  // Agent config file path and file state
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

  // Helper to reset conversation state
  function resetConversationState() {
    if (!isLoading) return;
    setIsLoading(false);
    setCurrentResponseLength(0);
    setStreamingToolUses([]);
    setSpinnerMessage(null);
    if (toolUseConfirmQueue[0]) {
      toolUseConfirmQueue[0].onAbort();
      setToolUseConfirmQueue([]);
    } else if (abortController) {
      abortController.abort();
    }
  }

  // Handler for queued commands
  const handleQueuedCommands = S9.useCallback(() => {
    if (queuedCommands.length === 0) return;
    setInput([
      ...queuedCommands.map(cmd => cmd.value),
      input
    ].filter(Boolean).join("\n"));
    setInputMode("prompt");
    setQueuedCommands(() => []);
  }, [queuedCommands, setInput, setInputMode, setQueuedCommands, input]);

  // Escape event handler
  handleEscapeEvent(setToolUseConfirmQueue, resetConversationState, isLoading, isMessageSelectorVisible, queuedCommands, abortController?.signal, handleQueuedCommands, vimMode);

  // Cost threshold warning effect
  S9.useEffect(() => {
    if (SJ() >= 5 && !showCostThresholdWarning && !hasAcknowledgedCostThreshold) {
      if (logTelemetryEventIfEnabled("tengu_cost_threshold_reached", {}), hasInsufficientOrElevatedOAuthRoles() && !process.env.DISABLE_COST_WARNINGS) setShowCostThresholdWarning(true);
    }
  }, [messages, showCostThresholdWarning, hasAcknowledgedCostThreshold]);

  // Memoized normalized message history
  const normalizedMessageHistory = NS2(setToolUseConfirmQueue);

  // Tool permission context setter
  const setToolPermissionContext = S9.useCallback(context => {
    setMainState(prev => ({
      ...prev,
      toolPermissionContext: context
    }));
  }, [setMainState]);

  // Tool use context builder
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
      setToolPermissionContext,
      onChangeDynamicMcpConfig: handleDynamicMcpConfigChange,
      nestedMemoryAttachmentTriggers: new Set(),
      setResponseLength: setCurrentResponseLength,
      setStreamMode: setResponseMode,
      setSpinnerMessage,
      setInProgressToolUseIDs,
      agentId: g9()
    };
  }, [normalizedCommands, debug, normalizedTools, mcp.resources, verbose, mainLoopAccessor, normalizedMcpClients, ideInstallationStatus, currentDynamicMcpConfig, handleSetMessageHistory, reverifyApiKey, addNotification, setToolPermissionContext, handleDynamicMcpConfigChange, queuedCommandsRef, setQueuedCommands, setCurrentResponseLength, setResponseMode, setSpinnerMessage]);

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
    const controller = new AbortController();
    setAbortController(controller);
    const {
      messages: promptMessages,
      shouldQuery
    } = await handleUserInput(initialPrompt, "prompt", setToolJSX, getToolUseContext(messages, messages, controller), null, selectedIde, void 0);
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
        setSpinnerMessage(null);
        return;
      }
      const [tools, uw, handleMissingDoctypeError] = await Promise.all([
        Zj(normalizedTools, mainLoopAccessor, Object.values(mcp.resources).flat()),
        UW(),
        WE(false)
      ]);
      for await (const streamEvent of processStreamWithCompactionAndToolUse([...messages, ...promptMessages], tools, uw, handleMissingDoctypeError, normalizedMessageHistory, getToolUseContext([...messages, ...promptMessages], promptMessages, controller))) {
        handleStreamEvent(streamEvent, newMsg => {
          setMessages(prev => [...prev, newMsg]);
        }, newText => setCurrentResponseLength(prev => prev + newText.length), setResponseMode, setStreamingToolUses);
      }
    } else {
      addDisplayStateToHistory(initialPrompt);
    }
    setHasAcknowledgedCostThreshold(getCachedOrFreshConfig().hasAcknowledgedCostThreshold || false);
    setIsLoading(false);
    setCurrentResponseLength(0);
    setStreamingToolUses([]);
    setSpinnerMessage(null);
  }

  // Main query handler (formerly ChatAppMainComponent)
  async function handleQuery(newMessages, controller, shouldStream) {
    setMessages(prev => [...prev, ...newMessages]);
    setCurrentResponseLength(0);
    setStreamingToolUses([]);
    if (shouldStream) {
      qK.handleQueryStart(normalizedMcpClients);
      const connectedIde = findConnectedIdeEntry(normalizedMcpClients);
      if (connectedIde) rr0(connectedIde);
    }
    completeProjectOnboardingIfNeeded();
    const lastMsg = newMessages[newMessages.length - 1];
    if (lastMsg?.type === "user" && typeof lastMsg.message.content === "string") analyzeAndSetConversationTitleIfNewTopic(lastMsg.message.content);
    if (!shouldStream) {
      setAbortController(null);
      setIsLoading(false);
      setSpinnerMessage(null);
      return;
    }
    const toolUseContext = getToolUseContext([...messages, ...newMessages], newMessages, controller);
    const [tools, uw, handleMissingDoctypeError] = await Promise.all([
      Zj(normalizedTools, mainLoopAccessor),
      UW(),
      WE(false)
    ]);
    for await (const streamEvent of processStreamWithCompactionAndToolUse([...messages, ...newMessages], tools, uw, handleMissingDoctypeError, normalizedMessageHistory, toolUseContext, void 0)) {
      handleStreamEvent(streamEvent, msg => {
        setMessages(prev => [...prev, msg]);
      }, text => setCurrentResponseLength(prev => prev + text.length), setResponseMode, setStreamingToolUses);
    }
    setIsLoading(false);
    setStreamingToolUses([]);
    setCurrentResponseLength(0);
    setSpinnerMessage(null);
  }

  // Miscellaneous effects
  ez2();
  hN2(messages, messages.length === initialMessages?.length);
  zS2();

  // Prompt queue use count effect
  S9.useEffect(() => {
    if (queuedCommands.length < 1) return;
    const config = getCachedOrFreshConfig();
    updateProjectsAccessor({
      ...config,
      promptQueueUseCount: (config.promptQueueUseCount ?? 0) + 1
    });
  }, [queuedCommands.length]);

  // Cost threshold warning logic
  const showCostWarning = !isLoading && showCostThresholdWarning;

  // Input change and idle notification effect
  S9.useEffect(() => {
    fp();
  }, [input, submitCount]);
  S9.useEffect(() => {
    if (isLoading) return;
    if (submitCount === 0) return;
    const timeoutId = setTimeout(() => {
      const idleMs = Date.now() - q01();
      if (!isLoading && toolUseConfirmQueue.length === 0 && !toolJSX && !showCostWarning && !isMessageSelectorVisible && idleMs >= getCachedOrFreshConfig().messageIdleNotifThresholdMs) {
        notifyUserBasedOnConfig({
          message: "Claude is waiting for your input"
        });
      }
    }, getIdleNotificationThreshold());
    return () => clearTimeout(timeoutId);
  }, [isLoading, toolUseConfirmQueue.length, toolJSX, showCostWarning, isMessageSelectorVisible, messages, submitCount]);

  // Initial prompt effect on mount
  S9.useEffect(() => {
    handleInitialPrompt();
    return () => {
      qK.shutdown();
    };
  }, []);

  // Memoized message selectors
  const filteredMessages = S9.useMemo(() => s3(messages).filter(isValidMessageEntry), [messages]);
  const filteredMessageHistory = S9.useMemo(() => s3(messageHistory).filter(isValidMessageEntry), [messageHistory]);
  const unresolvedToolUseIDs = S9.useMemo(() => MO(filteredMessages), [filteredMessages]);
  const erroredToolUseIDs = S9.useMemo(() => QK1(filteredMessages), [filteredMessages]);

  // Tool use confirm queue handler
  registerTranscriptKeyboardShortcuts(currentScreen, setCurrentScreen, setScreenToggleId, setShowAllInTranscript, clearConsoleScreen);
  const [showAutoUpdater, setShowAutoUpdater] = S9.useState(false);
  const [showHaiku, setShowHaiku] = S9.useState(false);

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
      streamingToolUses,
      showAllInTranscript
    }),
    r4.createElement(g, {
      flexDirection: "column",
      width: "100%"
    },
      !toolJSX && toolUseConfirmQueue.length === 0 && isLoading && r4.createElement(HaikuStatusBar, {
        mode: responseMode,
        haikuWords,
        currentResponseLength,
        overrideMessage: spinnerMessage
      }),
      toolJSX ? toolJSX.jsx : null,
      !toolJSX && toolUseConfirmQueue[0] !== undefined && !isMessageSelectorVisible && r4.createElement(renderToolPermissionComponent, {
        onDone: () => setToolUseConfirmQueue(([first, ...rest]) => rest),
        onReject: handleQueuedCommands,
        setToolPermissionContext,
        toolUseConfirm: toolUseConfirmQueue[0],
        toolUseContext: getToolUseContext(messages, messages, abortController ?? new AbortController()),
        verbose
      }),
      !toolJSX && toolUseConfirmQueue.length === 0 && !isMessageSelectorVisible && showCostWarning && r4.createElement(SessionSpendingNotification, {
        onDone: () => {
          setShowCostThresholdWarning(false);
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
      showIdeInstallPrompt && r4.createElement(renderClaudeCodeInstallSuccessScreen, {
        onDone: () => setShowIdeInstallPrompt(false),
        installedVersion: ideInstallationStatus?.installedVersion ?? null
      }),
      toolUseConfirmQueue.length === 0 && !toolJSX?.shouldHidePromptInput && shouldShowPromptInput && !isMessageSelectorVisible && !showCostWarning && !showAutoUpdater && !showIdeInstallPrompt && !showHaiku && r4.createElement(r4.Fragment, null,
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
            setShowHaiku(true);
            if (!(await validateAndProcessInteractions(messages))) {
              await performCleanupAndExit(0);
              return;
            }
            setShowAutoUpdater(true);
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
          resetConversationState();
          setImmediate(async () => {
            await clearConsoleScreen();
            const msgIndex = messages.indexOf(selectedMsg);
            const prevMessages = messages.slice(0, msgIndex);
            setMessages([...prevMessages]);
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
            } else if (Array.isArray(selectedMsg.message.content) && selectedMsg.message.content.length >= 2 && selectedMsg.message.content.some(x => x.type === "image") && selectedMsg.message.content.some(x => x.type === "text")) {
              const textPart = selectedMsg.message.content.find(x => x.type === "text");
              if (textPart && textPart.type === "text") {
                setInput(textPart.text);
                setInputMode("prompt");
              }
              const imageParts = selectedMsg.message.content.filter(x => x.type === "image");
              if (imageParts.length > 0) {
                const pastedImages = {};
                imageParts.forEach((img, idx) => {
                  if (img.source.type === "base64") pastedImages[idx + 1] = {
                    id: idx + 1,
                    type: "image",
                    content: img.source.data,
                    mediaType: img.source.media_type
                  };
                });
                setPastedContents(pastedImages);
              }
            }
          });
        },
        onEscape: () => setIsMessageSelectorVisible(false),
        tools: normalizedTools
      }),
      !showIdeInstallPrompt && r4.createElement(RG, null)
    )
  );
}

module.exports = ChatAppMainComponent;