/**
 * InteractiveCommandInput is a React component that manages a rich command input interface with history, suggestions, paste handling, and various modes (bash, memory, etc).
 * It supports queued commands, notifications, Vim mode, image/text pasting, and integrates with tool permissions and auto-updater status.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.debug - Enables debug mode.
 * @param {Object} props.ideSelection - The current IDE selection context.
 * @param {Object} props.toolPermissionContext - The current tool permission context.
 * @param {Function} props.setToolPermissionContext - Setter for tool permission context.
 * @param {Object} props.apiKeyStatus - Status of the API key.
 * @param {Array} props.commands - List of available commands.
 * @param {boolean} props.isLoading - Loading state.
 * @param {Function} props.onQuery - Callback for query submission.
 * @param {boolean} props.verbose - Verbose mode flag.
 * @param {Array} props.messages - List of chat messages.
 * @param {Function} props.setToolJSX - Setter for tool JSX.
 * @param {Function} props.onAutoUpdaterResult - Callback for auto-updater result.
 * @param {Object} props.autoUpdaterResult - Result of auto-updater.
 * @param {string} props.input - Current input value.
 * @param {Function} props.onInputChange - Input change handler.
 * @param {string} props.mode - Current input mode (e.g., 'prompt', 'bash', 'memory').
 * @param {Function} props.onModeChange - Mode change handler.
 * @param {Array} props.queuedCommands - List of queued commands.
 * @param {Function} props.setQueuedCommands - Setter for queued commands.
 * @param {number} props.submitCount - Number of submissions.
 * @param {Function} props.onSubmitCountChange - Setter for submit count.
 * @param {Function} props.setIsLoading - Setter for loading state.
 * @param {Function} props.setAbortController - Setter for abort controller.
 * @param {Function} props.onShowMessageSelector - Callback to show message selector.
 * @param {Object} props.notification - Current notification object.
 * @param {Function} props.addNotification - Function to add a notification.
 * @param {Array} props.mcpClients - List of MCP clients.
 * @param {Object} props.pastedContents - Map of pasted contents.
 * @param {Function} props.setPastedContents - Setter for pasted contents.
 * @param {string} props.vimMode - Current Vim mode.
 * @param {Function} props.setVimMode - Setter for Vim mode.
 * @param {Object} props.ideInstallationStatus - IDE installation status.
 * @param {Function} props.onExit - Callback for exit event.
 * @param {Function} props.getToolUseContext - Function to get tool use context.
 * @returns {JSX.Element} The rendered command input interface.
 */
function InteractiveCommandInput({
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
  // State for exit message modal
  const [exitMessage, setExitMessage] = A3.useState({ show: false });
  // State for input placeholder
  const [inputPlaceholder, setInputPlaceholder] = A3.useState("");
  // State for cursor offset
  const [cursorOffset, setCursorOffset] = A3.useState(input.length);
  // State for whether input has been normalized for paste
  const [hasNormalizedPaste, setHasNormalizedPaste] = A3.useState(false);

  // Normalize pasted input if isBlobOrFileLikeObject'createInteractionAccessor too long
  A3.useEffect(() => {
    if (!hasNormalizedPaste && input.length > 10000) {
      const normalizationResult = addTruncatedPlaceholderContent(input, pastedContents);
      if (normalizationResult) {
        const { newInput, newPastedContents } = normalizationResult;
        onInputChange(newInput);
        setPastedContents(newPastedContents);
        setCursorOffset(newInput.length);
      }
      setHasNormalizedPaste(true);
    }
  }, [input, hasNormalizedPaste, pastedContents, onInputChange, setPastedContents]);

  // Reset normalization flag if input is cleared
  A3.useEffect(() => {
    if (input === "") setHasNormalizedPaste(false);
  }, [input]);

  // Next available pasted content updateSnapshotAndNotify
  const nextPastedContentId = A3.useMemo(() => {
    const keys = Object.keys(pastedContents).map(Number);
    if (keys.length === 0) return 1;
    return Math.max(...keys) + 1;
  }, [pastedContents]);

  // State for help modal
  const [isHelpOpen, setIsHelpOpen] = A3.useState(false);
  // State for shell selection
  const [isShellsSelected, setIsShellsSelected] = A3.useState(false);
  // State for paste-in-progress
  const [isPasting, setIsPasting] = A3.useState(false);
  // Whether input is empty and nothing has been submitted
  const isInputEmptyAndUnsubmitted = !input && submitCount === 0;

  // Suggest a command on first render
  A3.useEffect(() => {
    if (submitCount > 0) return;
    pH1(false).then(suggestedCommand => {
      setInputPlaceholder(`Try "${iT(suggestedCommand)}"`);
    });
  }, [mode, submitCount]);

  // Handle input change (including special cases for mode switching)
  const handleInputChange = A3.useCallback((newInput) => {
    if (newInput === "?") {
      logTelemetryEventIfEnabled("tengu_help_toggled", {});
      setIsHelpOpen(prev => !prev);
      return;
    }
    setIsHelpOpen(false);
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
    onInputChange(newInput.replaceAll("\processRuleBeginHandlers", "    "));
  }, [onInputChange, onModeChange, input, cursorOffset]);

  // Input history handlers
  const {
    resetHistory,
    onHistoryUp,
    onHistoryDown
  } = useInputHistoryAccessor((newInput, newMode, newPastedContents) => {
    handleInputChange(newInput);
    onModeChange(newMode);
    setPastedContents(newPastedContents);
  }, input, pastedContents);

  // Shells info
  const { shells } = useShellsState();
  const runningShellCount = shells.filter(shell => shell.status === "running").length;
  const maxQueuedCommandHintCount = 3;

  // Handle up arrow (history up)
  const handleHistoryUp = () => {
    if (suggestions.length <= 1) {
      if (queuedCommands.length > 0) {
        handleQueueToInput();
        return;
      }
      if (isShellsSelected) setIsShellsSelected(false);
      else onHistoryUp();
    }
  };

  // Handle down arrow (history down)
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

  // Handle query submission
  const handleSubmit = A3.useCallback(async (submittedInput, force = false, memorySelectArg) => {
    if (submittedInput.trim() === "") return;
    if (suggestionsState.suggestions.length > 0 && !force) return;
    if (["exit", "quit", ":q", ":q!", ":wq", ":wq!"].includes(submittedInput.trim())) {
      if (commands.find(cmd => cmd.name === "exit")) handleSubmit("/exit", true);
      else Sw5();
      return;
    }
    let processedInput = submittedInput;
    const pastedRefs = ri0(submittedInput);
    let pastedTextCount = 0;
    for (const ref of pastedRefs) {
      const pasted = pastedContents[ref.id];
      if (pasted && pasted.type === "text") {
        processedInput = processedInput.replace(ref.match, pasted.content);
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
        const displayInput =
          mode === "bash" ? `!${submittedInput}` :
          mode === "memorySelect" ? `#${submittedInput}` :
          submittedInput;
        addDisplayStateToHistory({ display: displayInput, pastedContents });
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

  // Handle image paste
  function handleImagePaste(imageData, mediaType) {
    logTelemetryEventIfEnabled("tengu_paste_image", {});
    onModeChange("prompt");
    const imageContent = {
      id: nextPastedContentId,
      type: "image",
      content: imageData,
      mediaType: mediaType || "image/png"
    };
    setPastedContents(prev => ({
      ...prev,
      [nextPastedContentId]: imageContent
    }));
    M0(formatImageLabel(imageContent.id));
  }

  // Handle text paste
  function handleTextPaste(pastedText) {
    let normalizedText = removeSpecialPatternFromString(pastedText).replace(/\r/g, "\n").replaceAll("\processRuleBeginHandlers", "    ");
    if (normalizedText.length > KW1) {
      const textContent = {
        id: nextPastedContentId,
        type: "text",
        content: normalizedText
      };
      const splitContent = NW1(normalizedText);
      setPastedContents(prev => ({
        ...prev,
        [nextPastedContentId]: textContent
      }));
      M0(formatPastedTextSummary(textContent.id, splitContent));
    } else {
      M0(normalizedText);
    }
  }

  // Insert content at cursor
  function M0(content) {
    const newInput = input.slice(0, cursorOffset) + content + input.slice(cursorOffset);
    onInputChange(newInput);
    setCursorOffset(cursorOffset + content.length);
  }

  // Show message selector
  const showMessageSelector = createThrottledInteractionHandler(() => {}, () => onShowMessageSelector());

  // Move queued commands to input
  const handleQueueToInput = A3.useCallback(() => {
    if (queuedCommands.length === 0) return;
    const queuedText = [...queuedCommands.map(cmd => cmd.value), input].filter(Boolean).join("\n");
    onInputChange(queuedText);
    onModeChange("prompt");
    setQueuedCommands(() => []);
    setCursorOffset(queuedCommands.map(cmd => cmd.value).join("\n").length + 1 + cursorOffset);
  }, [queuedCommands, onInputChange, onModeChange, setQueuedCommands, input, cursorOffset]);

  // If not loading and there are queued commands, submit them
  A3.useEffect(() => {
    if (!isLoading && queuedCommands[0]) {
      const queuedText = queuedCommands.map(cmd => cmd.value).join("\n");
      setQueuedCommands(cmds => cmds.filter(cmd => !queuedCommands.includes(cmd)));
      handleSubmit(queuedText, false);
    }
  }, [isLoading, queuedCommands, handleSubmit, setQueuedCommands]);

  // Handle MCP client @-mentions
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
    M0(mentionText);
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
      setIsHelpOpen(false);
    }
    if (isHelpOpen && input === "" && (keyEvent.backspace || keyEvent.delete)) {
      setIsHelpOpen(false);
    }
    if (keyEvent.tab && keyEvent.shift) {
      // Cycle tool permission modes
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
      if (isHelpOpen) setIsHelpOpen(false);
      return;
    }
    if (keyEvent.escape) {
      if (isShellsSelected) {
        setIsShellsSelected(false);
        return;
      }
      if (queuedCommands.length > 0) {
        handleQueueToInput();
        return;
      }
      if (messages.length > 0 && !input && !isLoading) showMessageSelector();
    }
    if (keyEvent.return && isHelpOpen) setIsHelpOpen(false);
  });

  // Layout info
  const { columns } = Z4();
  const inputWidth = columns - 6;
  const tokenUsage = A3.useMemo(() => findAndProcessLastValidInteraction(messages), [messages]);
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
    // Main input area
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
        mode === "bash" ? D8.createElement(_, { color: theme.bashBorder, dimColor: isLoading }, " ! ") :
        (mode === "memory" || mode === "memorySelect") ? D8.createElement(_, { color: theme.remember, dimColor: isLoading }, " # ") :
        D8.createElement(_, { color: isLoading ? theme.secondaryText : undefined }, " > ")
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
            : queuedCommands.length > 0 && (getCachedOrFreshConfig().queuedCommandUpHintCount || 0) < maxQueuedCommandHintCount
              ? "Press up to edit queued messages"
              : isInputEmptyAndUnsubmitted
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
    // Memory select mode
    mode === "memorySelect" && D8.createElement(MemoryLocationSelector, {
      onSelect: (selected) => {
        handleSubmit(input, false, selected);
      },
      onCancel: () => {
        onModeChange("memory");
      }
    }),
    // Status bar and suggestions
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
      helpOpen: isHelpOpen,
      suppressHint: input.length > 0,
      shellsSelected: isShellsSelected,
      ideSelection,
      mcpClients,
      ideInstallationStatus,
      isPasting
    })
  );
}

module.exports = InteractiveCommandInput;
