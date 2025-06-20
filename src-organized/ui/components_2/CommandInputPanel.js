/**
 * CommandInputPanel is a React component that manages the command input interface for a terminal-like UI.
 * It handles user input, command history, pasting, suggestions, permission context, and integrates with external tools.
 *
 * @param {Object} props - The properties for the CommandInputPanel component.
 * @param {boolean} props.debug - Whether debug mode is enabled.
 * @param {Object} props.ideSelection - The current IDE selection.
 * @param {Object} props.toolPermissionContext - The current tool permission context.
 * @param {Function} props.setToolPermissionContext - Function to update the tool permission context.
 * @param {Object} props.apiKeyStatus - The status of the API key.
 * @param {Array} props.commands - List of available commands.
 * @param {boolean} props.isLoading - Whether the panel is currently loading.
 * @param {Function} props.onQuery - Callback for when a query is submitted.
 * @param {boolean} props.verbose - Whether verbose mode is enabled.
 * @param {Array} props.messages - The current message history.
 * @param {Function} props.setToolJSX - Function to set the tool JSX.
 * @param {Function} props.onAutoUpdaterResult - Callback for auto updater results.
 * @param {Object} props.autoUpdaterResult - The result of the auto updater.
 * @param {string} props.input - The current input value.
 * @param {Function} props.onInputChange - Callback for input value changes.
 * @param {string} props.mode - The current input mode (e.g., 'prompt', 'bash', 'memory').
 * @param {Function} props.onModeChange - Callback for mode changes.
 * @param {Array} props.queuedCommands - List of queued commands.
 * @param {Function} props.setQueuedCommands - Function to update queued commands.
 * @param {number} props.submitCount - The number of times the input has been submitted.
 * @param {Function} props.onSubmitCountChange - Callback for submit count changes.
 * @param {Function} props.setIsLoading - Function to set the loading state.
 * @param {Function} props.setAbortController - Function to set the abort controller.
 * @param {Function} props.onShowMessageSelector - Callback to show the message selector.
 * @param {Object} props.notification - The current notification object.
 * @param {Function} props.addNotification - Function to add a notification.
 * @param {Object} props.mcpClients - MCP client objects.
 * @param {Object} props.pastedContents - Contents that have been pasted.
 * @param {Function} props.setPastedContents - Function to update pasted contents.
 * @param {string} props.vimMode - The current Vim mode.
 * @param {Function} props.setVimMode - Function to set the Vim mode.
 * @param {Object} props.ideInstallationStatus - The status of the IDE installation.
 * @param {Function} props.onExit - Callback for when the panel is exited.
 * @param {Function} props.getToolUseContext - Function to get the tool use context.
 * @returns {React.Element} The rendered command input panel.
 */
function CommandInputPanel({
  debug,
  ideSelection,
  toolPermissionContext,
  setToolPermissionContext,
  apiKeyStatus,
  commands,
  isLoading,
  onQuery,
  verbose,
  messages,
  setToolJSX,
  onAutoUpdaterResult,
  autoUpdaterResult,
  input,
  onInputChange,
  mode,
  onModeChange,
  queuedCommands,
  setQueuedCommands,
  submitCount,
  onSubmitCountChange,
  setIsLoading,
  setAbortController,
  onShowMessageSelector,
  notification,
  addNotification,
  mcpClients,
  pastedContents,
  setPastedContents,
  vimMode,
  setVimMode,
  ideInstallationStatus,
  onExit,
  getToolUseContext
}) {
  // State for auto-updating
  const [isAutoUpdating, setIsAutoUpdating] = A3.useState(false);
  // State for exit message
  const [exitMessage, setExitMessage] = A3.useState({ show: false });
  // State for input placeholder
  const [inputPlaceholder, setInputPlaceholder] = A3.useState("");
  // State for cursor offset in input
  const [cursorOffset, setCursorOffset] = A3.useState(input.length);
  // State to track if input has been normalized for length
  const [hasNormalizedInput, setHasNormalizedInput] = A3.useState(false);

  // Normalize input if isBlobOrFileLikeObject exceeds 10,000 characters
  A3.useEffect(() => {
    if (!hasNormalizedInput && input.length > 10000) {
      const normalizationResult = addTruncatedPlaceholderContent(input, pastedContents);
      if (normalizationResult) {
        const { newInput, newPastedContents } = normalizationResult;
        onInputChange(newInput);
        setPastedContents(newPastedContents);
        setCursorOffset(newInput.length);
      }
      setHasNormalizedInput(true);
    }
  }, [input, hasNormalizedInput, pastedContents, onInputChange, setPastedContents]);

  // Reset normalization flag if input is cleared
  A3.useEffect(() => {
    if (input === "") setHasNormalizedInput(false);
  }, [input]);

  // Generate a new unique pasted content updateSnapshotAndNotify
  const nextPastedContentId = A3.useMemo(() => {
    const keys = Object.keys(pastedContents).map(Number);
    if (keys.length === 0) return 1;
    return Math.max(...keys) + 1;
  }, [pastedContents]);

  // State for help panel
  const [helpOpen, setHelpOpen] = A3.useState(false);
  // State for shell selection
  const [shellsSelected, setShellsSelected] = A3.useState(false);
  // State for pasting
  const [isPasting, setIsPasting] = A3.useState(false);
  // Whether input is empty and not submitted yet
  const isInputEmptyAndNotSubmitted = !input && submitCount === 0;

  // Suggest a placeholder command when mode or submitCount changes
  A3.useEffect(() => {
    if (submitCount > 0) return;
    pH1(false).then(suggestedCommand => {
      setInputPlaceholder(`Try "${iT(suggestedCommand)}"`);
    });
  }, [mode, submitCount]);

  /**
   * Handles input changes and special triggers (help, mode switching, tab normalization)
   */
  const handleInputChange = A3.useCallback((newInput) => {
    if (newInput === "?") {
      logTelemetryEventIfEnabled("tengu_help_toggled", {});
      setHelpOpen(prev => !prev);
      return;
    }
    setHelpOpen(false);
    const isSingleCharAdded = newInput.length === input.length + 1;
    const isCursorAtStart = cursorOffset === 0;
    if (isSingleCharAdded && isCursorAtStart && newInput.startsWith("!")) {
      onModeChange("bash");
      return;
    }
    if (isSingleCharAdded && isCursorAtStart && newInput.startsWith("#")) {
      onModeChange("memory");
      return;
    }
    // Replace tabs with spaces
    onInputChange(newInput.replaceAll("\processRuleBeginHandlers", "    "));
  }, [onInputChange, onModeChange, input, cursorOffset]);

  // Command history navigation hook
  const {
    resetHistory,
    onHistoryUp,
    onHistoryDown
  } = useInputHistoryAccessor((newInput, newMode, newPastedContents) => {
    handleInputChange(newInput);
    onModeChange(newMode);
    setPastedContents(newPastedContents);
  }, input, pastedContents);

  // Get running shells count
  const { shells } = useShellsState();
  const runningShellsCount = shells.filter(shell => shell.status === "running").length;
  const maxQueuedCommandUpHintCount = 3;

  /**
   * Handles up arrow key for command history
   */
  const handleHistoryUp = () => {
    if (suggestions.length <= 1) {
      if (queuedCommands.length > 0) {
        handleQueueToInput();
        return;
      }
      if (shellsSelected) setShellsSelected(false);
      else onHistoryUp();
    }
  };

  /**
   * Handles down arrow key for command history
   */
  const handleHistoryDown = () => {
    if (suggestions.length <= 1) {
      const result = onHistoryDown();
      if (result && runningShellsCount > 0) {
        setShellsSelected(true);
        const config = getCachedOrFreshConfig();
        if (!config.hasSeenTasksHint) updateProjectsAccessor({ ...config, hasSeenTasksHint: true });
      } else setShellsSelected(false);
      return result;
    }
    return false;
  };

  // State for suggestions and argument hints
  const [suggestionsState, setSuggestionsState] = A3.useState({
    suggestions: [],
    selectedSuggestion: -1,
    commandArgumentHint: undefined
  });

  /**
   * Handles command submission, including pasting, mode switching, and tool invocation
   */
  const handleSubmit = A3.useCallback(async (submittedInput, force = false, memorySelectArg) => {
    if (submittedInput.trim() === "") return;
    if (suggestionsState.suggestions.length > 0 && !force) return;
    // Handle exit/quit commands
    if (["exit", "quit", ":q", ":q!", ":wq", ":wq!"].includes(submittedInput.trim())) {
      if (commands.find(cmd => cmd.name === "exit")) handleSubmit("/exit", true);
      else Sw5();
      return;
    }
    let processedInput = submittedInput;
    const pastedMatches = ri0(submittedInput);
    let pastedTextCount = 0;
    for (const match of pastedMatches) {
      const pasted = pastedContents[match.id];
      if (pasted && pasted.type === "text") {
        processedInput = processedInput.replace(match.match, pasted.content);
        pastedTextCount++;
      }
    }
    logTelemetryEventIfEnabled("tengu_paste_text", { pastedTextCount });
    if (isLoading) {
      if (mode !== "prompt") return;
      setQueuedCommands(prev => [...prev, { value: processedInput, mode: "prompt" }]);
      onInputChange("");
      setCursorOffset(0);
      setPastedContents({});
      resetHistory();
      return;
    }
    if (mode === "memory") {
      onModeChange("memorySelect");
      return;
    }
    onInputChange("");
    setCursorOffset(0);
    onModeChange("prompt");
    setPastedContents({});
    onSubmitCountChange(count => count + 1);
    setIsLoading(true);
    const abortController = new AbortController();
    setAbortController(abortController);
    const { messages: responseMessages, shouldQuery } = await handleUserInput(
      processedInput,
      mode,
      setToolJSX,
      getToolUseContext(messages, [], abortController),
      pastedContents,
      ideSelection,
      memorySelectArg
    );
    if (responseMessages.length) {
      onQuery(responseMessages, abortController, shouldQuery);
    } else {
      addDisplayStateToHistory({ display: submittedInput, pastedContents });
      resetHistory();
      return;
    }
    for (const msg of responseMessages) {
      if (msg.type === "user") {
        const displayValue =
          mode === "bash"
            ? `!${submittedInput}`
            : mode === "memorySelect"
            ? `#${submittedInput}`
            : submittedInput;
        addDisplayStateToHistory({ display: displayValue, pastedContents });
        resetHistory();
      }
    }
  }, [suggestionsState.suggestions.length, isLoading, mode, onInputChange, onModeChange, onSubmitCountChange, setIsLoading, setAbortController, setToolJSX, getToolUseContext, messages, pastedContents, setPastedContents, ideSelection, commands, setQueuedCommands, resetHistory, onQuery]);

  // Suggestions and argument hint hook
  const {
    suggestions,
    selectedSuggestion,
    commandArgumentHint
  } = useCommandAndFileSuggestions({
    commands,
    onInputChange,
    onSubmit: handleSubmit,
    setCursorOffset,
    input,
    cursorOffset,
    setSuggestionsState,
    suggestionsState
  });

  /**
   * Handles image paste events
   */
  function handleImagePaste(imageBuffer, mediaType) {
    logTelemetryEventIfEnabled("tengu_paste_image", {});
    onModeChange("prompt");
    const imageContent = {
      id: nextPastedContentId,
      type: "image",
      content: imageBuffer,
      mediaType: mediaType || "image/png"
    };
    setPastedContents(prev => ({ ...prev, [nextPastedContentId]: imageContent }));
    M0(formatImageLabel(imageContent.id));
  }

  /**
   * Handles text paste events
   */
  function handleTextPaste(pastedText) {
    let normalizedText = removeSpecialPatternFromString(pastedText).replace(/\r/g, "\n").replaceAll("\processRuleBeginHandlers", "    ");
    if (normalizedText.length > KW1) {
      const textContent = {
        id: nextPastedContentId,
        type: "text",
        content: normalizedText
      };
      const splitContent = NW1(normalizedText);
      setPastedContents(prev => ({ ...prev, [nextPastedContentId]: textContent }));
      M0(formatPastedTextSummary(textContent.id, splitContent));
    } else {
      M0(normalizedText);
    }
  }

  /**
   * Inserts text at the current cursor position
   */
  function insertAtCursor(text) {
    const newInput = input.slice(0, cursorOffset) + text + input.slice(cursorOffset);
    onInputChange(newInput);
    setCursorOffset(cursorOffset + text.length);
  }

  // Handles showing the message selector
  const handleShowMessageSelector = createThrottledInteractionHandler(() => {}, () => onShowMessageSelector());

  /**
   * Moves queued commands into the input box
   */
  const handleQueueToInput = A3.useCallback(() => {
    if (queuedCommands.length === 0) return;
    const combinedQueued = [...queuedCommands.map(cmd => cmd.value), input].filter(Boolean).join("\n");
    onInputChange(combinedQueued);
    onModeChange("prompt");
    setQueuedCommands(() => []);
    setCursorOffset(queuedCommands.map(cmd => cmd.value).join("\n").length + 1 + cursorOffset);
  }, [queuedCommands, onInputChange, onModeChange, setQueuedCommands, input, cursorOffset]);

  // When not loading and there are queued commands, submit them
  A3.useEffect(() => {
    if (!isLoading && queuedCommands[0]) {
      const combinedQueued = queuedCommands.map(cmd => cmd.value).join("\n");
      setQueuedCommands(cmds => cmds.filter(cmd => !queuedCommands.includes(cmd)));
      handleSubmit(combinedQueued, false);
    }
  }, [isLoading, queuedCommands, handleSubmit, setQueuedCommands]);

  // Handles @-mention from MCP clients
  useAtMentionNotificationHandler(mcpClients, function (mention) {
    logTelemetryEventIfEnabled("tengu_ext_at_mentioned", {});
    let mentionText;
    const relativePath = VS2.relative(iA(), mention.filePath);
    if (mention.lineStart && mention.lineEnd) {
      mentionText = mention.lineStart === mention.lineEnd
        ? `@${relativePath}#createRefCountedMulticastOperator${mention.lineStart} `
        : `@${relativePath}#createRefCountedMulticastOperator${mention.lineStart}-${mention.lineEnd} `;
    } else {
      mentionText = `@${relativePath} `;
    }
    const charBeforeCursor = input[cursorOffset - 1] ?? " ";
    if (!/\s/.test(charBeforeCursor)) mentionText = ` ${mentionText}`;
    insertAtCursor(mentionText);
  });

  // Handles keyboard events for special actions
  D0((_, keyEvent) => {
    if (keyEvent.return && shellsSelected) {
      handleSubmit("/bashes", true);
      setShellsSelected(false);
      return;
    }
    if (cursorOffset === 0 && (keyEvent.escape || keyEvent.backspace || keyEvent.delete)) {
      onModeChange("prompt");
      setHelpOpen(false);
    }
    if (helpOpen && input === "" && (keyEvent.backspace || keyEvent.delete)) {
      setHelpOpen(false);
    }
    if (keyEvent.tab && keyEvent.shift) {
      // Cycle tool permission context mode
      logTelemetryEventIfEnabled("tengu_mode_cycle", { to: toolPermissionContext.mode });
      switch (toolPermissionContext.mode) {
        case "default":
          setToolPermissionContext({ ...toolPermissionContext, mode: "acceptEdits" });
          break;
        case "plan":
          setToolPermissionContext({ ...toolPermissionContext, mode: "default" });
          break;
        case "acceptEdits":
          setToolPermissionContext({ ...toolPermissionContext, mode: "plan" });
          break;
        case "bypassPermissions":
          break;
      }
      if (helpOpen) setHelpOpen(false);
      return;
    }
    if (keyEvent.escape) {
      if (shellsSelected) {
        setShellsSelected(false);
        return;
      }
      if (queuedCommands.length > 0) {
        handleQueueToInput();
        return;
      }
      if (messages.length > 0 && !input && !isLoading) handleShowMessageSelector();
    }
    if (keyEvent.return && helpOpen) setHelpOpen(false);
  });

  // Get terminal dimensions
  const { columns } = Z4();
  const inputWidth = columns - 6;
  // Token usage for verbose mode
  const tokenUsage = A3.useMemo(() => findAndProcessLastValidInteraction(messages), [messages]);
  // Theme styles
  const theme = getThemeStylesheet();

  // Render
  return D8.createElement(g, { flexDirection: "column" },
    // Queued commands preview
    queuedCommands.length > 0 && D8.createElement(g, {
      flexDirection: "column",
      marginTop: 1
    }, D8.createElement(g, {
      paddingLeft: 2,
      flexDirection: "column",
      width: columns - 4
    }, D8.createElement(_, {
      color: theme.secondaryText,
      wrap: "wrap"
    }, queuedCommands.map(cmd => cmd.value).join("\n")))),
    // Main input panel
    D8.createElement(g, {
      alignItems: "flex-start",
      justifyContent: "flex-start",
      borderColor: mode === "bash" ? theme.bashBorder : (mode === "memory" || mode === "memorySelect") ? theme.remember : theme.secondaryBorder,
      borderDimColor: mode !== "memory",
      borderStyle: "round",
      marginTop: queuedCommands.length > 0 ? 0 : 1,
      width: "100%"
    },
      // Prompt symbol
      D8.createElement(g, {
        alignItems: "flex-start",
        alignSelf: "flex-start",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
        width: 3
      }, mode === "bash"
        ? D8.createElement(_, { color: theme.bashBorder, dimColor: isLoading }, " ! ")
        : (mode === "memory" || mode === "memorySelect")
        ? D8.createElement(_, { color: theme.remember, dimColor: isLoading }, " # ")
        : D8.createElement(_, { color: isLoading ? theme.secondaryText : undefined }, " > ")
      ),
      // Input box
      D8.createElement(g, { paddingRight: 1 }, (() => {
        const inputProps = {
          multiline: true,
          onSubmit: handleSubmit,
          onChange: handleInputChange,
          value: input,
          onHistoryUp: handleHistoryUp,
          onHistoryDown: handleHistoryDown,
          onHistoryReset: () => resetHistory(),
          placeholder: mode === "memory"
            ? 'Add to memory. Try "Always use descriptive variable names"'
            : (queuedCommands.length > 0 && (getCachedOrFreshConfig().queuedCommandUpHintCount || 0) < maxQueuedCommandUpHintCount)
              ? "Press up to edit queued messages"
              : isInputEmptyAndNotSubmitted
                ? inputPlaceholder
                : undefined,
          onExit,
          onExitMessage: (show, key) => setExitMessage({ show, key }),
          onMessage: (show, text) => {
            if (show && text) addNotification({ text }, { timeoutMs: 3600000 });
            else addNotification({ text: "" }, { timeoutMs: 0 });
          },
          onImagePaste: handleImagePaste,
          columns: inputWidth,
          disableCursorMovementForUpDownKeys: suggestions.length > 0,
          cursorOffset,
          onChangeCursorOffset: setCursorOffset,
          onPaste: handleTextPaste,
          onIsPastingChange: setIsPasting,
          focus: mode !== "memorySelect",
          showCursor: mode !== "memorySelect",
          argumentHint: commandArgumentHint
        };
        return isEditorModeVim()
          ? D8.createElement(VimLikeTextEditorAccessor, {
              ...inputProps,
              initialMode: vimMode,
              onModeChange: setVimMode,
              isLoading
            })
          : D8.createElement(TextInputWithController, inputProps);
      })())
    ),
    // Memory select panel
    mode === "memorySelect" && D8.createElement(MemoryLocationSelector, {
      onSelect: arg => {
        handleSubmit(input, false, arg);
      },
      onCancel: () => {
        onModeChange("memory");
      }
    }),
    // Suggestions, notifications, and status panel
    D8.createElement(XS2, {
      apiKeyStatus,
      debug,
      exitMessage,
      vimMode,
      mode,
      autoUpdaterResult,
      isAutoUpdating,
      verbose,
      tokenUsage,
      onAutoUpdaterResult,
      onChangeIsUpdating: setIsAutoUpdating,
      suggestions,
      selectedSuggestion,
      notification,
      toolPermissionContext,
      helpOpen,
      suppressHint: input.length > 0,
      shellsSelected,
      ideSelection,
      mcpClients,
      ideInstallationStatus,
      isPasting
    })
  );
}

module.exports = CommandInputPanel;