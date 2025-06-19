/**
 * Custom React hook for managing command and file autocomplete suggestions in an input field.
 * Handles user input, suggestion state, keyboard navigation, and selection logic.
 *
 * @param {Object} params - The parameters object.
 * @param {Array} params.commands - List of available command objects.
 * @param {Function} params.onInputChange - Callback for input value changes.
 * @param {Function} params.onSubmit - Callback for submitting a command or suggestion.
 * @param {Function} params.setCursorOffset - Callback to update the cursor position in the input.
 * @param {string} params.input - The current input string.
 * @param {number} params.cursorOffset - The current cursor position in the input.
 * @param {Function} params.setSuggestionsState - Setter for the suggestions state object.
 * @param {Object} params.suggestionsState - State object for suggestions.
 * @param {Array} params.suggestionsState.suggestions - Current array of suggestion objects.
 * @param {number} params.suggestionsState.selectedSuggestion - Index of the currently selected suggestion.
 * @param {string|undefined} params.suggestionsState.commandArgumentHint - Optional hint for command arguments.
 * @returns {Object} - Object containing suggestion state and a keyboard event handler.
 */
function useCommandAndFileSuggestions({
  commands,
  onInputChange,
  onSubmit,
  setCursorOffset,
  input,
  cursorOffset,
  setSuggestionsState,
  suggestionsState: {
    suggestions,
    selectedSuggestion,
    commandArgumentHint
  }
}) {
  const [suggestionType, setSuggestionType] = JE.useState("none"); // 'none' | 'command' | 'file'
  const [maxColumnWidth, setMaxColumnWidth] = JE.useState(undefined);
  const [resources] = useAppState(); // Custom hook, returns MCP resources

  /**
   * Clears all suggestions and resets state.
   */
  const clearSuggestions = JE.useCallback(() => {
    setSuggestionsState(() => ({
      commandArgumentHint: undefined,
      suggestions: [],
      selectedSuggestion: -1
    }));
    setSuggestionType("none");
    setMaxColumnWidth(undefined);
  }, [setSuggestionsState]);

  /**
   * Handles input changes and updates suggestions based on input context.
   * @param {string} currentInput - The current input string.
   * @param {number} [currentCursorOffset=cursorOffset] - The cursor position in the input.
   */
  const updateSuggestions = JE.useCallback(async (currentInput, currentCursorOffset = cursorOffset) => {
    // Check for @mention pattern
    const mentionMatch = currentInput.substring(0, currentCursorOffset).match(/(^|\s)@[a-zA-Z0-9_\-./]*$/);

    // If input is a command (starts with '/')
    if (Rz1(currentInput)) {
      // If command contains a space and doesn'processRuleBeginHandlers end with a space, clear suggestions
      if (currentInput.includes(" ") && !currentInput.endsWith(" ")) {
        clearSuggestions();
        return;
      }
      // Get command suggestions
      const commandSuggestions = mP2(currentInput, commands);
      let argumentHint;
      if (currentInput.length > 1) {
        // Extract command name and find argument hint if available
        const commandName = currentInput.endsWith(" ") ? currentInput.slice(1, -1) : currentInput.slice(1);
        const matchedCommand = commands.find(cmd => cmd.userFacingName() === commandName && cmd.argumentHint);
        if (matchedCommand?.argumentHint) argumentHint = matchedCommand.argumentHint;
      }
      setSuggestionsState(() => ({
        commandArgumentHint: argumentHint,
        suggestions: commandSuggestions,
        selectedSuggestion: commandSuggestions.length > 0 ? 0 : -1
      }));
      setSuggestionType(commandSuggestions.length > 0 ? "command" : "none");
      // Set max column width for suggestions popup
      if (commandSuggestions.length > 0) {
        const maxLength = Math.max(...commandSuggestions.map(cmd => cmd.displayText.length));
        setMaxColumnWidth(maxLength + 5);
      }
      return;
    }

    // If previously in command mode, but now not a command, clear suggestions
    if (suggestionType === "command") {
      clearSuggestions();
      return;
    }

    // If input matches @mention pattern, show file/resource suggestions
    if (mentionMatch) {
      const tokenInfo = extractTokenAtPosition(currentInput, currentCursorOffset, true);
      if (tokenInfo && tokenInfo.token.startsWith("@")) {
        const searchTerm = tokenInfo.token.substring(1);
        const fileSuggestions = await getCombinedResourceSuggestions(searchTerm, resources.mcp.resources, true);
        if (fileSuggestions.length === 0) {
          clearSuggestions();
          return;
        }
        setSuggestionsState(() => ({
          commandArgumentHint: undefined,
          suggestions: fileSuggestions,
          selectedSuggestion: fileSuggestions.length > 0 ? 0 : -1
        }));
        setSuggestionType(fileSuggestions.length > 0 ? "file" : "none");
        setMaxColumnWidth(undefined);
        return;
      }
    }

    // If in file suggestion mode, update file suggestions
    if (suggestionType === "file") {
      const tokenInfo = extractTokenAtPosition(currentInput, currentCursorOffset, true);
      if (tokenInfo) {
        const searchTerm = tokenInfo.token.startsWith("@") ? tokenInfo.token.substring(1) : tokenInfo.token;
        const fileSuggestions = await getCombinedResourceSuggestions(searchTerm, resources.mcp.resources);
        if (fileSuggestions.length === 0) {
          clearSuggestions();
          return;
        }
        setSuggestionsState(() => ({
          commandArgumentHint: undefined,
          suggestions: fileSuggestions,
          selectedSuggestion: fileSuggestions.length > 0 ? 0 : -1
        }));
        setSuggestionType(fileSuggestions.length > 0 ? "file" : "none");
        setMaxColumnWidth(undefined);
      } else {
        clearSuggestions();
      }
    }
  }, [cursorOffset, suggestionType, commands, setSuggestionsState, clearSuggestions, resources.mcp.resources]);

  // Update suggestions whenever input changes
  JE.useEffect(() => {
    updateSuggestions(input);
  }, [input, updateSuggestions]);

  /**
   * Handles Tab key or suggestion selection logic.
   */
  const handleTabOrSelectSuggestion = JE.useCallback(async () => {
    if (suggestions.length > 0) {
      const selectedIdx = selectedSuggestion === -1 ? 0 : selectedSuggestion;
      if (suggestionType === "command" && selectedIdx < suggestions.length) {
        const selectedCommand = suggestions[selectedIdx];
        if (selectedCommand) {
          handleInteractionAccessor(selectedCommand, false, commands, onInputChange, setCursorOffset, onSubmit);
          clearSuggestions();
        }
      } else if (suggestionType === "file" && suggestions.length > 0) {
        const tokenInfo = extractTokenAtPosition(input, cursorOffset, true);
        if (!tokenInfo) {
          clearSuggestions();
          return;
        }
        const completedText = getCommonPrefixFromDisplayTexts(suggestions);
        const isMention = tokenInfo.token.startsWith("@");
        const tokenLength = isMention ? tokenInfo.token.length - 1 : tokenInfo.token.length;
        if (completedText.length > tokenLength) {
          // Complete the token with the suggestion
          const newText = isMention ? `@${completedText}` : completedText;
          replaceTextAtPosition(newText, input, tokenInfo.token, tokenInfo.startPos, onInputChange, setCursorOffset);
          updateSuggestions(input.replace(tokenInfo.token, newText), cursorOffset);
        } else if (selectedIdx < suggestions.length) {
          const selectedFile = suggestions[selectedIdx];
          if (selectedFile) {
            const displayText = isMention ? `@${selectedFile.displayText} ` : selectedFile.displayText;
            replaceTextAtPosition(displayText, input, tokenInfo.token, tokenInfo.startPos, onInputChange, setCursorOffset);
            clearSuggestions();
          }
        }
      }
    } else if (input.trim() !== "") {
      // If no suggestions, but input is not empty, try to fetch file suggestions
      const tokenInfo = extractTokenAtPosition(input, cursorOffset, true);
      if (tokenInfo) {
        const isMention = tokenInfo.token.startsWith("@");
        const searchTerm = isMention ? tokenInfo.token.substring(1) : tokenInfo.token;
        const fileSuggestions = await getCombinedResourceSuggestions(searchTerm, resources.mcp.resources, isMention);
        if (fileSuggestions.length > 0) {
          setSuggestionsState(() => ({
            commandArgumentHint: undefined,
            suggestions: fileSuggestions,
            selectedSuggestion: 0
          }));
          setSuggestionType("file");
          setMaxColumnWidth(undefined);
        }
      }
    }
  }, [suggestions, selectedSuggestion, input, suggestionType, commands, onInputChange, setCursorOffset, onSubmit, clearSuggestions, cursorOffset, updateSuggestions, resources.mcp.resources, setSuggestionsState]);

  /**
   * Handles Enter/Return key selection of a suggestion.
   */
  const handleReturnKey = JE.useCallback(() => {
    if (selectedSuggestion < 0 || suggestions.length === 0) return;
    if (suggestionType === "command" && selectedSuggestion < suggestions.length) {
      const selectedCommand = suggestions[selectedSuggestion];
      if (selectedCommand) {
        handleInteractionAccessor(selectedCommand, true, commands, onInputChange, setCursorOffset, onSubmit);
        clearSuggestions();
      }
    } else if (suggestionType === "file" && selectedSuggestion < suggestions.length) {
      const tokenInfo = extractTokenAtPosition(input, cursorOffset, true);
      if (tokenInfo) {
        const selectedFile = suggestions[selectedSuggestion];
        if (selectedFile) {
          const displayText = tokenInfo.token.startsWith("@") ? `@${selectedFile.displayText} ` : selectedFile.displayText;
          replaceTextAtPosition(displayText, input, tokenInfo.token, tokenInfo.startPos, onInputChange, setCursorOffset);
          clearSuggestions();
        }
      }
    }
  }, [suggestions, selectedSuggestion, suggestionType, commands, input, cursorOffset, onInputChange, setCursorOffset, onSubmit, clearSuggestions]);

  /**
   * Keyboard event handler for navigating and selecting suggestions.
   * @param {string} _input - The input string (unused).
   * @param {Object} keyEvent - Object describing the keyboard event.
   */
  const handleKeyDown = D0((_, keyEvent) => {
    if (keyEvent.tab && !keyEvent.shift) {
      handleTabOrSelectSuggestion();
      return;
    }
    if (suggestions.length === 0) return;
    if (keyEvent.downArrow) {
      // Move selection down
      setSuggestionsState(prev => ({
        ...prev,
        selectedSuggestion: prev.selectedSuggestion >= suggestions.length - 1 ? 0 : prev.selectedSuggestion + 1
      }));
      return;
    }
    if (keyEvent.upArrow) {
      // Move selection up
      setSuggestionsState(prev => ({
        ...prev,
        selectedSuggestion: prev.selectedSuggestion <= 0 ? suggestions.length - 1 : prev.selectedSuggestion - 1
      }));
      return;
    }
    if (keyEvent.return) handleReturnKey();
    if (keyEvent.escape) clearSuggestions();
  });

  return {
    suggestions,
    selectedSuggestion,
    suggestionType,
    maxColumnWidth,
    commandArgumentHint,
    handleKeyDown
  };
}

module.exports = useCommandAndFileSuggestions;