/**
 * Renders a text input component with advanced editing, history, and keyboard handling.
 * Integrates with terminal focus state, theming, and custom input behaviors.
 *
 * @param {Object} props - Configuration and event handlers for the text input.
 * @param {string} props.value - Current value of the text input.
 * @param {function} props.onChange - Handler for input value changes.
 * @param {function} [props.onSubmit] - Handler for input submission.
 * @param {function} [props.onExit] - Handler for input exit.
 * @param {string} [props.onExitMessage] - Message to display on exit.
 * @param {function} [props.onMessage] - Handler for custom messages.
 * @param {function} [props.onHistoryReset] - Handler for resetting input history.
 * @param {function} [props.onHistoryUp] - Handler for navigating up in history.
 * @param {function} [props.onHistoryDown] - Handler for navigating down in history.
 * @param {boolean} [props.focus] - Whether the input should be focused.
 * @param {boolean} [props.mask] - Whether to mask the input (e.g., for passwords).
 * @param {boolean} [props.multiline] - Whether the input supports multiple lines.
 * @param {boolean} [props.showCursor] - Whether to show the cursor character.
 * @param {boolean} [props.highlightPastedText] - Whether to highlight pasted text.
 * @param {number} [props.columns] - Number of columns for the input field.
 * @param {function} [props.onImagePaste] - Handler for image paste events.
 * @param {boolean} [props.disableCursorMovementForUpDownKeys] - Disable cursor movement for up/down keys.
 * @param {number} [props.cursorOffset] - External cursor offset.
 * @param {function} [props.onChangeCursorOffset] - Handler for cursor offset changes.
 * @returns {React.ReactElement} The rendered text input component.
 */
function TextInputWithController(props) {
  // Retrieve the current terminal theme text color
  const { text: themeTextColor } = H4();

  // Get terminal focus state and input filter function
  const {
    isFocused: terminalIsFocused,
    filterFocusSequences: inputFilter
  } = useTerminalFocusManager();

  // Create the text input controller with all relevant props and behaviors
  const inputController = createTextInputController({
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
    // Show a space as the cursor character if showCursor is true, otherwise hide
    cursorChar: props.showCursor ? " " : "",
    highlightPastedText: props.highlightPastedText,
    // Invert colors if terminal is focused, otherwise use identity function
    invert: terminalIsFocused ? FA.inverse : (x) => x,
    // Apply ANSI 256 color theming to text
    themeText: (text) => FA.ansi256(themeTextColor)(text),
    columns: props.columns,
    onImagePaste: props.onImagePaste,
    disableCursorMovementForUpDownKeys: props.disableCursorMovementForUpDownKeys,
    externalOffset: props.cursorOffset,
    onOffsetChange: props.onChangeCursorOffset,
    inputFilter: inputFilter
  });

  // Render the text input component with the controller and terminal focus state
  return Gn0.default.createElement(CommandInputRenderer, {
    inputState: inputController,
    terminalFocus: terminalIsFocused,
    ...props
  });
}

module.exports = TextInputWithController;