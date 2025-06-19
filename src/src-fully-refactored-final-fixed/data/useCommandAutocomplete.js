/**
 * React hook for managing command and file autocomplete suggestions in an input field.
 * Handles user input, suggestion state, and keyboard navigation for commands and file mentions.
 *
 * @param {Object} params - The parameters object.
 * @param {Array<Object>} params.commands - List of available command objects.
 * @param {Function} params.onInputChange - Callback for input value changes.
 * @param {Function} params.onSubmit - Callback for submitting a command.
 * @param {Function} params.setCursorOffset - Callback to update the cursor offset.
 * @param {string} params.input - The current input value.
 * @param {number} params.cursorOffset - The current cursor position in the input.
 * @param {Function} params.setSuggestionsState - Setter for suggestions state object.
 * @param {Object} params.suggestionsState - The current suggestions state.
 * @param {Array<Object>} params.suggestionsState.suggestions - Current list of suggestions.
 * @param {number} params.suggestionsState.selectedSuggestion - Index of the selected suggestion.
 * @param {string|undefined} params.suggestionsState.commandArgumentHint - Optional argument hint for the selected command.
 * @returns {Object} - Autocomplete state and handlers for rendering and interaction.
 */
function useCommandAutocomplete({
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
  // suggestionType: 'none' | 'command' | 'file'
  const [suggestionType, setSuggestionType] = JE.useState("none");
  // maxColumnWidth: used for suggestion dropdown width
  const [maxColumnWidth, setMaxColumnWidth] = JE.useState(undefined);
  // mcpContext: external context for MCP resources
  const [mcpContext] = useAppState();

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
   * Updates suggestions based on input and cursor position.
   * Handles command and file suggestions, as well as mention tokens.
   * @param {string} currentInput - The current input value.
   * @param {number} [currentCursorOffset=cursorOffset] - The cursor position.
   */
  const updateSuggestions = JE.useCallback(async (currentInput, currentCursorOffset = cursorOffset) => {
    // Regex to match @mention tokens
    const mentionMatch = currentInput.substring(0, currentCursorOffset).match(/(^|\s)@[a-zA-Z0-9_\-./]*$/);

    if (Rz1(currentInput)) { // If input is a command
      // If command contains a space but does not end with a space, clear suggestions
      if (currentInput.includes(" ") && !currentInput.endsWith(" ")) {
        clearSuggestions();
        return;
      }
      // Get command suggestions
      const commandSuggestions = mP2(currentInput, commands);
      let argumentHint;
      if (currentInput.length > 1) {
        // Extract command name (without leading '/')
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
      if (commandSuggestions.length > 0) {
        // Set dropdown width based on longest suggestion
        const maxLength = Math.max(...commandSuggestions.map(createInteractionAccessor => createInteractionAccessor.displayText.length));
        setMaxColumnWidth(maxLength + 5);
      }
      return;
    }

    // If previously in command mode, clear suggestions
    if (suggestionType === "command") {
      clearSuggestions();
      return;
    }

    // If @mention detected, suggest files/resources
    if (mentionMatch) {
      const tokenInfo = extractTokenAtPosition(currentInput, currentCursorOffset, true);
      if (tokenInfo && tokenInfo.token.startsWith("@")) {
        const mentionQuery = tokenInfo.token.substring(1);
        const mentionSuggestions = await getCombinedResourceSuggestions(mentionQuery, mcpContext.mcp.resources, true);
        if (mentionSuggestions.length === 0) {
          clearSuggestions();
          return;
        }
        setSuggestionsState(() => ({
          commandArgumentHint: undefined,
          suggestions: mentionSuggestions,
          selectedSuggestion: mentionSuggestions.length > 0 ? 0 : -1
        }));
        setSuggestionType(mentionSuggestions.length > 0 ? "file" : "none");
        setMaxColumnWidth(undefined);
        return;
      }
    }

    // If in file suggestion mode, update suggestions
    if (suggestionType === "file") {
      const tokenInfo = extractTokenAtPosition(currentInput, currentCursorOffset, true);
      if (tokenInfo) {
        const fileQuery = tokenInfo.token.startsWith("@") ? tokenInfo.token.substring(1) : tokenInfo.token;
        const fileSuggestions = await getCombinedResourceSuggestions(fileQuery, mcpContext.mcp.resources);
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
  }, [cursorOffset, suggestionType, commands, setSuggestionsState, clearSuggestions, mcpContext.mcp.resources]);

  // Update suggestions whenever input changes
  JE.useEffect(() => {
    updateSuggestions(input);
  }, [input, updateSuggestions]);

  /**
   * Handles tab/enter key to accept the current suggestion.
   */
  const handleAcceptSuggestion = JE.useCallback(async () => {
    if (suggestions.length > 0) {
      const suggestionIndex = selectedSuggestion === -1 ? 0 : selectedSuggestion;
      if (suggestionType === "command" && suggestionIndex < suggestions.length) {
        const selectedCommand = suggestions[suggestionIndex];
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
        const combinedText = getCommonPrefixFromDisplayTexts(suggestions);
        const isMention = tokenInfo.token.startsWith("@");
        const mentionLength = isMention ? tokenInfo.token.length - 1 : tokenInfo.token.length;
        if (combinedText.length > mentionLength) {
          // Replace token with full combined suggestion
          const replacement = isMention ? `@${combinedText}` : combinedText;
          replaceTextAtPosition(replacement, input, tokenInfo.token, tokenInfo.startPos, onInputChange, setCursorOffset);
          updateSuggestions(input.replace(tokenInfo.token, replacement), cursorOffset);
        } else if (suggestionIndex < suggestions.length) {
          const selectedFile = suggestions[suggestionIndex];
          if (selectedFile) {
            const replacement = isMention ? `@${selectedFile.displayText} ` : selectedFile.displayText;
            replaceTextAtPosition(replacement, input, tokenInfo.token, tokenInfo.startPos, onInputChange, setCursorOffset);
            clearSuggestions();
          }
        }
      }
    } else if (input.trim() !== "") {
      // If no suggestions but input is not empty, try to fetch file suggestions
      const tokenInfo = extractTokenAtPosition(input, cursorOffset, true);
      if (tokenInfo) {
        const isMention = tokenInfo.token.startsWith("@");
        const query = isMention ? tokenInfo.token.substring(1) : tokenInfo.token;
        const fileSuggestions = await getCombinedResourceSuggestions(query, mcpContext.mcp.resources, isMention);
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
  }, [suggestions, selectedSuggestion, input, suggestionType, commands, onInputChange, setCursorOffset, onSubmit, clearSuggestions, cursorOffset, updateSuggestions, mcpContext.mcp.resources, setSuggestionsState]);

  /**
   * Handles enter key to submit the current suggestion.
   */
  const handleSubmitSuggestion = JE.useCallback(() => {
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
          const replacement = tokenInfo.token.startsWith("@") ? `@${selectedFile.displayText} ` : selectedFile.displayText;
          replaceTextAtPosition(replacement, input, tokenInfo.token, tokenInfo.startPos, onInputChange, setCursorOffset);
          clearSuggestions();
        }
      }
    }
  }, [suggestions, selectedSuggestion, suggestionType, commands, input, cursorOffset, onInputChange, setCursorOffset, onSubmit, clearSuggestions]);

  // Keyboard event handler for suggestion navigation and selection
  D0((_, keyEvent) => {
    if (keyEvent.tab && !keyEvent.shift) {
      handleAcceptSuggestion();
      return;
    }
    if (suggestions.length === 0) return;
    if (keyEvent.downArrow) {
      setSuggestionsState(prevState => ({
        ...prevState,
        selectedSuggestion: prevState.selectedSuggestion >= suggestions.length - 1 ? 0 : prevState.selectedSuggestion + 1
      }));
      return;
    }
    if (keyEvent.upArrow) {
      setSuggestionsState(prevState => ({
        ...prevState,
        selectedSuggestion: prevState.selectedSuggestion <= 0 ? suggestions.length - 1 : prevState.selectedSuggestion - 1
      }));
      return;
    }
    if (keyEvent.return) handleSubmitSuggestion();
    if (keyEvent.escape) clearSuggestions();
  });

  return {
    suggestions,
    selectedSuggestion,
    suggestionType,
    maxColumnWidth,
    commandArgumentHint
  };
}

module.exports = useCommandAutocomplete;