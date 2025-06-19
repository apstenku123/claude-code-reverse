/**
 * InteractiveCommandInputPanel
 *
 * Renders and manages the interactive command input panel for the terminal UI, handling user input, command history, paste events, suggestions, and mode switching.
 * Integrates with command history, suggestions, permissions, notifications, and supports advanced features like image/text pasting, Vim mode, and queued commands.
 *
 * @param {Object} props - The properties for the command input panel.
 * @param {boolean} props.debug - Whether debug mode is enabled.
 * @param {Object} props.ideSelection - The current IDE selection context.
 * @param {Object} props.toolPermissionContext - The current tool permission context.
 * @param {Function} props.setToolPermissionContext - Setter for tool permission context.
 * @param {string} props.apiKeyStatus - Status of the API key.
 * @param {Array} props.commands - List of available commands.
 * @param {boolean} props.isLoading - Whether the panel is currently loading.
 * @param {Function} props.onQuery - Handler for submitting a query.
 * @param {boolean} props.verbose - Whether verbose mode is enabled.
 * @param {Array} props.messages - The current message history.
 * @param {Function} props.setToolJSX - Setter for tool JSX.
 * @param {Function} props.onAutoUpdaterResult - Handler for auto updater result.
 * @param {Object} props.autoUpdaterResult - Result of the auto updater.
 * @param {string} props.input - The current input value.
 * @param {Function} props.onInputChange - Handler for input value change.
 * @param {string} props.mode - The current input mode (e.g., 'prompt', 'bash', 'memory').
 * @param {Function} props.onModeChange - Handler for mode change.
 * @param {Array} props.queuedCommands - List of queued commands.
 * @param {Function} props.setQueuedCommands - Setter for queued commands.
 * @param {number} props.submitCount - Number of times submit has been pressed.
 * @param {Function} props.onSubmitCountChange - Handler for submit count change.
 * @param {Function} props.setIsLoading - Setter for loading state.
 * @param {Function} props.setAbortController - Setter for abort controller.
 * @param {Function} props.onShowMessageSelector - Handler to show message selector.
 * @param {Object} props.notification - Current notification object.
 * @param {Function} props.addNotification - Function to add a notification.
 * @param {Array} props.mcpClients - List of MCP clients.
 * @param {Object} props.pastedContents - Contents pasted by the user.
 * @param {Function} props.setPastedContents - Setter for pasted contents.
 * @param {string} props.vimMode - Current Vim mode.
 * @param {Function} props.setVimMode - Setter for Vim mode.
 * @param {string} props.ideInstallationStatus - IDE installation status.
 * @param {Function} props.onExit - Handler for exit event.
 * @param {Function} props.getToolUseContext - Function to get tool use context.
 * @returns {React.ReactElement} The rendered command input panel.
 */
function InteractiveCommandInputPanel({
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
  // State for Vim mode help
  const [isHelpOpen, setIsHelpOpen] = A3.useState(false);
  // State for exit message
  const [exitMessage, setExitMessage] = A3.useState({ show: false });
  // State for placeholder suggestion
  const [placeholderSuggestion, setPlaceholderSuggestion] = A3.useState("");
  // State for cursor offset
  const [cursorOffset, setCursorOffset] = A3.useState(input.length);
  // State to track if input was truncated due to length
  const [hasTruncatedInput, setHasTruncatedInput] = A3.useState(false);

  // Truncate input if too long and not already truncated
  A3.useEffect(() => {
    if (!hasTruncatedInput && input.length > 10000) {
      const result = addTruncatedPlaceholderContent(input, pastedContents);
      if (result) {
        const { newInput, newPastedContents } = result;
        onInputChange(newInput);
        setPastedContents(newPastedContents);
        setCursorOffset(newInput.length);
      }
      setHasTruncatedInput(true);
    }
  }, [input, hasTruncatedInput, pastedContents, onInputChange, setPastedContents]);

  // Reset truncation flag if input is cleared
  A3.useEffect(() => {
    if (input === "") setHasTruncatedInput(false);
  }, [input]);

  // Next available pasted content updateSnapshotAndNotify
  const nextPastedContentId = A3.useMemo(() => {
    const keys = Object.keys(pastedContents).map(Number);
    if (keys.length === 0) return 1;
    return Math.max(...keys) + 1;
  }, [pastedContents]);

  // State for help modal, shell selection, and isPasting
  const [isHelpModalOpen, setIsHelpModalOpen] = A3.useState(false);
  const [isShellsSelected, setIsShellsSelected] = A3.useState(false);
  const [isPasting, setIsPasting] = A3.useState(false);

  // Whether to show placeholder suggestion
  const isInputEmptyAndNotSubmitted = !input && submitCount === 0;

  // Suggest a placeholder command on mode or submitCount change
  A3.useEffect(() => {
    if (submitCount > 0) return;
    pH1(false).then(suggestion => {
      setPlaceholderSuggestion(`Try "${iT(suggestion)}"`);
    });
  }, [mode, submitCount]);

  /**
   * Handles input change, mode switching, and help toggling.
   */
  const handleInputChange = A3.useCallback((newInput) => {
    if (newInput === "?") {
      logTelemetryEventIfEnabled("tengu_help_toggled", {});
      setIsHelpModalOpen(prev => !prev);
      return;
    }
    setIsHelpModalOpen(false);
    const isSingleCharAdded = newInput.length === input.length + 1;
    const isCursorAtStart = cursorOffset === 0;
    // Switch to bash mode if input starts with '!'
    if (isSingleCharAdded && isCursorAtStart && newInput.startsWith("!")) {
      onModeChange("bash");
      return;
    }
    // Switch to memory mode if input starts with '#'
    if (isSingleCharAdded && isCursorAtStart && newInput.startsWith("#")) {
      onModeChange("memory");
      return;
    }
    // Replace tabs with spaces
    onInputChange(newInput.replaceAll("\processRuleBeginHandlers", "    "));
  }, [onInputChange, onModeChange, input, cursorOffset]);

  // Command history navigation
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
  const runningShellCount = shells.filter(shell => shell.status === "running").length;
  const maxQueuedCommandHintCount = 3;

  // Handle history up navigation
  const handleHistoryUp = () => {
    if (suggestions.length <= 1) {
      if (queuedCommands.length > 0) {
        mergeQueuedCommandsToInput();
        return;
      }
      if (isShellsSelected) setIsShellsSelected(false);
      else onHistoryUp();
    }
  };

  // Handle history down navigation
  const handleHistoryDown = () => {
    if (suggestions.length <= 1) {
      const result = onHistoryDown();
      if (result && runningShellCount > 0) {
        setIsShellsSelected(true);
        const config = getCachedOrFreshConfig();
        if (!config.hasSeenTasksHint) updateProjectsAccessor({ ...config, hasSeenTasksHint: true });
      } else setIsShellsSelected(false);
      return result;
    }
    return false;
  };

  // Suggestions state
  const [suggestionsState, setSuggestionsState] = A3.useState({
    suggestions: [],
    selectedSuggestion: -1,
    commandArgumentHint: undefined
  });

  /**
   * Handles command submission, including special commands, pastes, and mode switching.
   */
  const handleSubmit = A3.useCallback(async (commandInput, force = false, memorySelection) => {
    if (commandInput.trim() === "") return;
    if (suggestionsState.suggestions.length > 0 && !force) return;
    // Handle exit/quit commands
    if (["exit", "quit", ":q", ":q!", ":wq", ":wq!"].includes(commandInput.trim())) {
      if (commands.find(cmd => cmd.name === "exit")) handleSubmit("/exit", true);
      else Sw5();
      return;
    }
    let processedInput = commandInput;
    const pasteMatches = ri0(commandInput);
    let pastedTextCount = 0;
    for (const match of pasteMatches) {
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
    // Query for messages
    const { messages: queriedMessages, shouldQuery } = await handleUserInput(
      processedInput,
      mode,
      setToolJSX,
      getToolUseContext(messages, [], abortController),
      pastedContents,
      ideSelection,
      memorySelection
    );
    if (queriedMessages.length) {
      onQuery(queriedMessages, abortController, shouldQuery);
    } else {
      addDisplayStateToHistory({ display: commandInput, pastedContents });
      resetHistory();
      return;
    }
    // Add user message to history
    for (const msg of queriedMessages) {
      if (msg.type === "user") {
        const displayValue =
          mode === "bash" ? `!${commandInput}` :
          mode === "memorySelect" ? `#${commandInput}` :
          commandInput;
        addDisplayStateToHistory({ display: displayValue, pastedContents });
        resetHistory();
      }
    }
  }, [suggestionsState.suggestions.length, isLoading, mode, onInputChange, onModeChange, onSubmitCountChange, setIsLoading, setAbortController, setToolJSX, getToolUseContext, messages, pastedContents, setPastedContents, ideSelection, commands, setQueuedCommands, resetHistory, onQuery]);

  // Suggestions and argument hint
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
   * Handles image paste event.
   */
  function handleImagePaste(imageData, mediaType) {
    logTelemetryEventIfEnabled("tengu_paste_image", {});
    onModeChange("prompt");
    const pastedImage = {
      id: nextPastedContentId,
      type: "image",
      content: imageData,
      mediaType: mediaType || "image/png"
    };
    setPastedContents(prev => ({ ...prev, [nextPastedContentId]: pastedImage }));
    insertTextAtCursor(formatImageLabel(pastedImage.id));
  }

  /**
   * Handles text paste event.
   */
  function handleTextPaste(pastedText) {
    let normalizedText = removeSpecialPatternFromString(pastedText).replace(/\r/g, "\n").replaceAll("\processRuleBeginHandlers", "    ");
    if (normalizedText.length > KW1) {
      const pastedTextObj = {
        id: nextPastedContentId,
        type: "text",
        content: normalizedText
      };
      const pastedTextSummary = NW1(normalizedText);
      setPastedContents(prev => ({ ...prev, [nextPastedContentId]: pastedTextObj }));
      insertTextAtCursor(formatPastedTextSummary(pastedTextObj.id, pastedTextSummary));
    } else {
      insertTextAtCursor(normalizedText);
    }
  }

  /**
   * Inserts text at the current cursor position in the input.
   */
  function insertTextAtCursor(text) {
    const newInput = input.slice(0, cursorOffset) + text + input.slice(cursorOffset);
    onInputChange(newInput);
    setCursorOffset(cursorOffset + text.length);
  }

  // Handler for showing message selector
  const handleShowMessageSelector = createThrottledInteractionHandler(() => {}, () => onShowMessageSelector());

  /**
   * Merges queued commands into the input field.
   */
  const mergeQueuedCommandsToInput = A3.useCallback(() => {
    if (queuedCommands.length === 0) return;
    const mergedInput = [...queuedCommands.map(cmd => cmd.value), input].filter(Boolean).join("\n");
    onInputChange(mergedInput);
    onModeChange("prompt");
    setQueuedCommands(() => []);
    setCursorOffset(queuedCommands.map(cmd => cmd.value).join("\n").length + 1 + cursorOffset);
  }, [queuedCommands, onInputChange, onModeChange, setQueuedCommands, input, cursorOffset]);

  // When not loading and there are queued commands, submit them
  A3.useEffect(() => {
    if (!isLoading && queuedCommands[0]) {
      const mergedInput = queuedCommands.map(cmd => cmd.value).join("\n");
      setQueuedCommands(cmds => cmds.filter(cmd => !queuedCommands.includes(cmd)));
      handleSubmit(mergedInput, false);
    }
  }, [isLoading, queuedCommands, handleSubmit, setQueuedCommands]);

  // Handle MCP client @-mention paste
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
    insertTextAtCursor(mentionText);
  });

  // Keyboard event handler
  D0((_, keyEvent) => {
    if (keyEvent.return && isShellsSelected) {
      handleSubmit("/bashes", true);
      setIsShellsSelected(false);
      return;
    }
    if (cursorOffset === 0 && (keyEvent.escape || keyEvent.backspace || keyEvent.delete)) {
      onModeChange("prompt");
      setIsHelpModalOpen(false);
    }
    if (isHelpModalOpen && input === "" && (keyEvent.backspace || keyEvent.delete)) {
      setIsHelpModalOpen(false);
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
      if (isHelpModalOpen) setIsHelpModalOpen(false);
      return;
    }
    if (keyEvent.escape) {
      if (isShellsSelected) {
        setIsShellsSelected(false);
        return;
      }
      if (queuedCommands.length > 0) {
        mergeQueuedCommandsToInput();
        return;
      }
      if (messages.length > 0 && !input && !isLoading) handleShowMessageSelector();
    }
    if (keyEvent.return && isHelpModalOpen) setIsHelpModalOpen(false);
  });

  // Terminal window size
  const { columns } = Z4();
  const inputWidth = columns - 6;
  const tokenUsage = A3.useMemo(() => findAndProcessLastValidInteraction(messages), [messages]);
  const theme = getThemeStylesheet();

  // Render
  return D8.createElement(g, { flexDirection: "column" },
    // Queued commands display
    queuedCommands.length > 0 && D8.createElement(g, { flexDirection: "column", marginTop: 1 },
      D8.createElement(g, { paddingLeft: 2, flexDirection: "column", width: columns - 4 },
        D8.createElement(_, { color: theme.secondaryText, wrap: "wrap" },
          queuedCommands.map(cmd => cmd.value).join("\n")
        )
      )
    ),
    // Input panel
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
      },
        mode === "bash"
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
            : (queuedCommands.length > 0 && (getCachedOrFreshConfig().queuedCommandUpHintCount || 0) < maxQueuedCommandHintCount)
              ? "Press up to edit queued messages"
              : isInputEmptyAndNotSubmitted
                ? placeholderSuggestion
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
    // Memory select mode
    mode === "memorySelect" && D8.createElement(MemoryLocationSelector, {
      onSelect: (selection) => {
        handleSubmit(input, false, selection);
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
      isAutoUpdating: isHelpOpen,
      verbose,
      tokenUsage,
      onAutoUpdaterResult,
      onChangeIsUpdating: setIsHelpOpen,
      suggestions,
      selectedSuggestion,
      notification,
      toolPermissionContext,
      helpOpen: isHelpModalOpen,
      suppressHint: input.length > 0,
      shellsSelected: isShellsSelected,
      ideSelection,
      mcpClients,
      ideInstallationStatus,
      isPasting
    })
  );
}

module.exports = InteractiveCommandInputPanel;