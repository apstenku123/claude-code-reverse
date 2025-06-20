/**
 * Renders a text input component with advanced editing, history, and event handling.
 * Integrates with terminal focus, theme, and input filtering logic.
 *
 * @param {Object} props - Properties for configuring the text input component.
 * @param {string} props.value - The current value of the input.
 * @param {function} props.onChange - Callback for when the input value changes.
 * @param {function} [props.onSubmit] - Callback for when the input is submitted.
 * @param {function} [props.onExit] - Callback for when the input is exited.
 * @param {string} [props.onExitMessage] - Message to display on exit.
 * @param {function} [props.onMessage] - Callback for custom messages.
 * @param {function} [props.onHistoryReset] - Callback for resetting input history.
 * @param {function} [props.onHistoryUp] - Callback for navigating up in history.
 * @param {function} [props.onHistoryDown] - Callback for navigating down in history.
 * @param {boolean} [props.focus] - Whether the input should be focused.
 * @param {boolean} [props.mask] - Whether to mask the input (e.g., for passwords).
 * @param {boolean} [props.multiline] - Whether the input supports multiple lines.
 * @param {boolean} [props.showCursor] - Whether to show the cursor character.
 * @param {boolean} [props.highlightPastedText] - Whether to highlight pasted text.
 * @param {number} [props.columns] - Number of columns for the input field.
 * @param {function} [props.onImagePaste] - Callback for image paste events.
 * @param {boolean} [props.disableCursorMovementForUpDownKeys] - Disables cursor movement with up/down keys.
 * @param {number} [props.cursorOffset] - External cursor offset.
 * @param {function} [props.onChangeCursorOffset] - Callback for cursor offset changes.
 * @returns {React.Element} The rendered text input React element.
 */
function TextInputComponent(props) {
  // Retrieve the current theme text color from the terminal configuration
  const { text: themeTextColor } = H4();

  // Get terminal focus state and input filter function
  const {
    isFocused: terminalIsFocused,
    filterFocusSequences: inputFilter
  } = useTerminalFocusManager();

  // Create the text input controller with all relevant props and handlers
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
    cursorChar: props.showCursor ? " " : "",
    highlightPastedText: props.highlightPastedText,
    // Use inverse theme if terminal is focused, otherwise use identity function
    invert: terminalIsFocused ? FA.inverse : value => value,
    // Apply ANSI 256 color theming to text
    themeText: value => FA.ansi256(themeTextColor)(value),
    columns: props.columns,
    onImagePaste: props.onImagePaste,
    disableCursorMovementForUpDownKeys: props.disableCursorMovementForUpDownKeys,
    externalOffset: props.cursorOffset,
    onOffsetChange: props.onChangeCursorOffset,
    inputFilter: inputFilter
  });

  // Render the text input component with the computed input state and terminal focus
  return Gn0.default.createElement(CommandInputRenderer, {
    inputState: inputController,
    terminalFocus: terminalIsFocused,
    ...props
  });
}

module.exports = TextInputComponent;