/**
 * Renders a Vim-like text input component with customizable behavior and appearance.
 * Handles input state, mode switching, and various callbacks for text editing actions.
 *
 * @param {Object} props - The properties for configuring the text input component.
 * @param {string} props.value - The current value of the text input.
 * @param {function} props.onChange - Callback for when the text input value changes.
 * @param {function} props.onSubmit - Callback for when the input is submitted.
 * @param {function} props.onExit - Callback for when the input is exited.
 * @param {string} [props.onExitMessage] - Optional message to display on exit.
 * @param {function} [props.onMessage] - Optional callback for displaying messages.
 * @param {function} [props.onHistoryReset] - Callback for resetting input history.
 * @param {function} [props.onHistoryUp] - Callback for navigating up in input history.
 * @param {function} [props.onHistoryDown] - Callback for navigating down in input history.
 * @param {boolean} [props.focus] - Whether the input should be focused.
 * @param {boolean} [props.mask] - Whether the input should be masked (e.g., for passwords).
 * @param {boolean} [props.multiline] - Whether the input supports multiple lines.
 * @param {boolean} [props.showCursor] - Whether to show the cursor character.
 * @param {boolean} [props.highlightPastedText] - Whether to highlight pasted text.
 * @param {number} [props.columns] - Number of columns for the input field.
 * @param {function} [props.onImagePaste] - Callback for when an image is pasted.
 * @param {boolean} [props.disableCursorMovementForUpDownKeys] - Disables cursor movement for up/down keys.
 * @param {number} [props.cursorOffset] - External offset for the cursor position.
 * @param {function} [props.onChangeCursorOffset] - Callback for when the cursor offset changes.
 * @param {function} [props.onModeChange] - Callback for when the input mode changes.
 * @param {boolean} [props.isLoading] - Whether the input is in a loading state.
 * @param {string} [props.initialMode] - The initial mode for the input (e.g., 'NORMAL', 'INSERT').
 * @returns {React.Element} The rendered Vim-like text input component.
 */
function VimLikeTextInputAccessor(props) {
  // Retrieve the current terminal text color configuration
  const terminalTextConfig = H4().text;

  // Create the Vim-like text input handler with all relevant props
  const inputState = createVimLikeTextInputHandler({
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
    themeText: color => FA.ansi256(terminalTextConfig)(color),
    columns: props.columns,
    onImagePaste: props.onImagePaste,
    disableCursorMovementForUpDownKeys: props.disableCursorMovementForUpDownKeys,
    externalOffset: props.cursorOffset,
    onOffsetChange: props.onChangeCursorOffset,
    onModeChange: props.onModeChange,
    isMessageLoading: props.isLoading
  });

  // Destructure mode and setMode from the input state
  const {
    mode: currentMode,
    setMode: setInputMode
  } = inputState;

  // Ensure the input mode is set to the initialMode prop if provided and different from current
  Sz1.default.useEffect(() => {
    if (props.initialMode && props.initialMode !== currentMode) {
      setInputMode(props.initialMode);
    }
  }, [props.initialMode, currentMode, setInputMode]);

  // Render the Vim-like text input component within a flex column container
  return Sz1.default.createElement(
    g,
    { flexDirection: "column" },
    Sz1.default.createElement(CommandInputRenderer, {
      inputState: inputState,
      terminalFocus: true,
      ...props
    })
  );
}

module.exports = VimLikeTextInputAccessor;