/**
 * Creates and manages a Vim-like editor input component with mode switching, history navigation, and customizable behavior.
 *
 * @param {Object} props - The properties for configuring the Vim-like editor input.
 * @param {string} props.value - The current value of the input.
 * @param {function} props.onChange - Callback for when the input value changes.
 * @param {function} props.onSubmit - Callback for when the input is submitted.
 * @param {function} [props.onExit] - Callback for when the input is exited.
 * @param {string} [props.onExitMessage] - Message to display on exit.
 * @param {function} [props.onMessage] - Callback for displaying messages.
 * @param {function} [props.onHistoryReset] - Callback for resetting input history.
 * @param {function} [props.onHistoryUp] - Callback for navigating up in history.
 * @param {function} [props.onHistoryDown] - Callback for navigating down in history.
 * @param {boolean} [props.focus] - Whether the input should be focused.
 * @param {boolean} [props.mask] - Whether the input should mask its value.
 * @param {boolean} [props.multiline] - Whether the input supports multiple lines.
 * @param {boolean} [props.showCursor] - Whether to show the cursor character.
 * @param {boolean} [props.highlightPastedText] - Whether to highlight pasted text.
 * @param {number} [props.columns] - Number of columns for the input.
 * @param {function} [props.onImagePaste] - Callback for image paste events.
 * @param {boolean} [props.disableCursorMovementForUpDownKeys] - Disables cursor movement for up/down keys.
 * @param {number} [props.cursorOffset] - External cursor offset.
 * @param {function} [props.onChangeCursorOffset] - Callback for cursor offset changes.
 * @param {function} [props.onModeChange] - Callback for mode changes.
 * @param {boolean} [props.isLoading] - Whether a message is loading.
 * @param {string} [props.initialMode] - Initial mode for the editor (e.g., 'NORMAL', 'INSERT').
 * @returns {React.ReactElement} The Vim-like editor input component.
 */
function VimLikeEditorAccessor(props) {
  // Retrieve the current theme text configuration
  const { text: themeTextConfig } = H4();

  // Create the Vim-like editor controller with all necessary props and handlers
  const vimEditorController = createVimLikeEditorController({
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
  } = vimEditorController;

  // React effect: If an initial mode is provided and differs from the current mode, set isBlobOrFileLikeObject
  Sz1.default.useEffect(() => {
    if (props.initialMode && props.initialMode !== currentMode) {
      setEditorMode(props.initialMode);
    }
  }, [props.initialMode, currentMode, setEditorMode]);

  // Render the Vim-like editor input inside a flex column container
  return Sz1.default.createElement(
    g,
    { flexDirection: "column" },
    Sz1.default.createElement(CommandInputRenderer, {
      inputState: vimEditorController,
      terminalFocus: true,
      ...props
    })
  );
}

module.exports = VimLikeEditorAccessor;