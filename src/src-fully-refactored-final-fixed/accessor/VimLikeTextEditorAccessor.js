/**
 * Renders a Vim-like text editor component with mode management and custom event handlers.
 *
 * @param {Object} props - The properties for configuring the text editor.
 * @param {string} props.value - The current value of the text editor.
 * @param {function} props.onChange - Handler for text changes.
 * @param {function} props.onSubmit - Handler for submit events.
 * @param {function} props.onExit - Handler for exit events.
 * @param {string} [props.onExitMessage] - Optional exit message.
 * @param {function} props.onMessage - Handler for message events.
 * @param {function} props.onHistoryReset - Handler for resetting history.
 * @param {function} props.onHistoryUp - Handler for navigating history up.
 * @param {function} props.onHistoryDown - Handler for navigating history down.
 * @param {boolean} props.focus - Whether the editor should be focused.
 * @param {boolean} props.mask - Whether input should be masked.
 * @param {boolean} props.multiline - Whether multiline input is allowed.
 * @param {boolean} props.showCursor - Whether to show the cursor character.
 * @param {boolean} props.highlightPastedText - Whether to highlight pasted text.
 * @param {number} props.columns - Number of columns for the editor.
 * @param {function} props.onImagePaste - Handler for image paste events.
 * @param {boolean} props.disableCursorMovementForUpDownKeys - Disables cursor movement for up/down keys.
 * @param {number} props.cursorOffset - External cursor offset.
 * @param {function} props.onChangeCursorOffset - Handler for cursor offset changes.
 * @param {function} props.onModeChange - Handler for mode changes.
 * @param {boolean} props.isLoading - Whether the editor is in a loading state.
 * @param {string} [props.initialMode] - Optional initial mode for the editor.
 * @returns {React.Element} The rendered Vim-like text editor component.
 */
function VimLikeTextEditorAccessor(props) {
  // Retrieve the current theme text configuration
  const themeTextConfig = H4().text;

  // Create the Vim-like text editor controller with all relevant props
  const textEditorController = createVimLikeTextEditorController({
    value: props.value,
    onChange: props.onChange,
    onSubmit: props.onSubmit,
    onExit: props.onExit,
    onExitMessage: props.onExitMessage,
    onMessage: props.onMessage,
    onHistoryReset: props.onHistoryReset,
    onHistoryUp: props.onHistoryUp,
    onHistoryDown: props.onHistoryDown,
    focus: props.focus,
    mask: props.mask,
    multiline: props.multiline,
    cursorChar: props.showCursor ? " " : "",
    highlightPastedText: props.highlightPastedText,
    invert: FA.inverse,
    themeText: color => FA.ansi256(themeTextConfig)(color),
    columns: props.columns,
    onImagePaste: props.onImagePaste,
    disableCursorMovementForUpDownKeys: props.disableCursorMovementForUpDownKeys,
    externalOffset: props.cursorOffset,
    onOffsetChange: props.onChangeCursorOffset,
    onModeChange: props.onModeChange,
    isMessageLoading: props.isLoading
  });

  // Destructure mode and setMode from the controller for mode management
  const {
    mode: currentMode,
    setMode: setEditorMode
  } = textEditorController;

  // Reactively update the editor mode if the initialMode prop changes
  Sz1.default.useEffect(() => {
    if (props.initialMode && props.initialMode !== currentMode) {
      setEditorMode(props.initialMode);
    }
  }, [props.initialMode, currentMode, setEditorMode]);

  // Render the editor layout and pass all necessary props
  return Sz1.default.createElement(
    g,
    { flexDirection: "column" },
    Sz1.default.createElement(CommandInputRenderer, {
      inputState: textEditorController,
      terminalFocus: true,
      ...props
    })
  );
}

module.exports = VimLikeTextEditorAccessor;