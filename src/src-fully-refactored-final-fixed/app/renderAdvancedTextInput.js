/**
 * Renders an advanced text input component with extensive customization and event handling.
 *
 * @param {Object} props - The properties for configuring the advanced text input component.
 * @param {string} props.value - The current value of the input.
 * @param {function} props.onChange - Callback for when the input value changes.
 * @param {function} props.onSubmit - Callback for when the input is submitted.
 * @param {function} props.onExit - Callback for when the input is exited.
 * @param {string} [props.onExitMessage] - Optional message to display on exit.
 * @param {function} [props.onMessage] - Optional callback for custom messages.
 * @param {function} [props.onHistoryReset] - Callback for resetting input history.
 * @param {function} [props.onHistoryUp] - Callback for navigating up in history.
 * @param {function} [props.onHistoryDown] - Callback for navigating down in history.
 * @param {boolean} [props.focus] - Whether the input should be focused.
 * @param {boolean} [props.mask] - Whether the input should be masked (e.g., for passwords).
 * @param {boolean} [props.multiline] - Whether the input supports multiple lines.
 * @param {boolean} [props.showCursor] - Whether to show the cursor character.
 * @param {boolean} [props.highlightPastedText] - Whether to highlight pasted text.
 * @param {number} [props.columns] - Number of columns for the input.
 * @param {function} [props.onImagePaste] - Callback for image paste events.
 * @param {boolean} [props.disableCursorMovementForUpDownKeys] - Disable cursor movement for up/down keys.
 * @param {number} [props.cursorOffset] - External cursor offset.
 * @param {function} [props.onChangeCursorOffset] - Callback for cursor offset changes.
 * @returns {React.Element} The rendered advanced text input React element.
 */
function renderAdvancedTextInput(props) {
  // Retrieve theme text color from configuration
  const themeTextColor = H4().text;

  // Get terminal focus state and input filter from context
  const {
    isFocused: terminalIsFocused,
    filterFocusSequences: inputFilter
  } = useTerminalFocusManager();

  // Create the input handler with all relevant props and behaviors
  const inputState = createTextInputController({
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
    invert: terminalIsFocused ? FA.inverse : (text) => text,
    // Apply ANSI 256 color theming to text
    themeText: (text) => FA.ansi256(themeTextColor)(text),
    columns: props.columns,
    onImagePaste: props.onImagePaste,
    disableCursorMovementForUpDownKeys: props.disableCursorMovementForUpDownKeys,
    externalOffset: props.cursorOffset,
    onOffsetChange: props.onChangeCursorOffset,
    inputFilter: inputFilter
  });

  // Render the advanced text input component with the computed state and props
  return Gn0.default.createElement(CommandInputRenderer, {
    inputState: inputState,
    terminalFocus: terminalIsFocused,
    ...props
  });
}

module.exports = renderAdvancedTextInput;