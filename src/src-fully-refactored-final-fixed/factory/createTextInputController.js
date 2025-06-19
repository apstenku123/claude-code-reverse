/**
 * Creates a text input controller with advanced editing, history, and event handling features.
 *
 * @param {Object} options - Configuration options for the text input controller.
 * @param {string} options.value - The current input value.
 * @param {function} options.onChange - Callback when the input value changes.
 * @param {function} options.onSubmit - Callback when the input is submitted.
 * @param {function} options.onExit - Callback when the input is exited.
 * @param {function} [options.onExitMessage] - Callback for exit messages (e.g., Ctrl-C, Ctrl-createCompatibleVersionChecker).
 * @param {function} [options.onMessage] - Callback for displaying messages to the user.
 * @param {function} [options.onHistoryUp] - Callback for navigating up in input history.
 * @param {function} [options.onHistoryDown] - Callback for navigating down in input history.
 * @param {function} [options.onHistoryReset] - Callback for resetting input history.
 * @param {string} [options.mask=""] - Mask character for input (e.g., password fields).
 * @param {boolean} [options.multiline=false] - Whether multiline input is enabled.
 * @param {string} [options.cursorChar] - Character to display as the cursor.
 * @param {boolean} [options.invert] - Whether to invert the input display.
 * @param {number} [options.columns] - Number of columns for the input field.
 * @param {function} [options.onImagePaste] - Callback when an image is pasted.
 * @param {boolean} [options.disableCursorMovementForUpDownKeys=false] - Disables cursor movement for up/down keys if true.
 * @param {number} [options.externalOffset] - External offset for the cursor.
 * @param {function} [options.onOffsetChange] - Callback when the offset changes.
 * @param {function} [options.inputFilter] - Function to filter/transform input before processing.
 * @returns {Object} Controller with onInput handler, renderedValue, offset, and setOffset.
 */
function createTextInputController({
  value,
  onChange,
  onSubmit,
  onExit,
  onExitMessage,
  onMessage,
  onHistoryUp,
  onHistoryDown,
  onHistoryReset,
  mask = "",
  multiline = false,
  cursorChar,
  invert,
  columns,
  onImagePaste,
  disableCursorMovementForUpDownKeys = false,
  externalOffset,
  onOffsetChange,
  inputFilter
}) {
  let currentOffset = externalOffset;
  let setOffset = onOffsetChange;
  // Create a text buffer object from the current value
  const textBuffer = e5.fromText(value, columns, currentOffset);
  // State for message timeout
  const [messageTimeout, setMessageTimeout] = ei0.useState(null);

  /**
   * Clears any active message and its timeout.
   */
  function clearMessage() {
    if (!messageTimeout) return;
    clearTimeout(messageTimeout);
    setMessageTimeout(null);
    if (onMessage) onMessage(false);
  }

  // Handler for Ctrl-C(exit)
  const handleCtrlC = createThrottledInteractionHandler(
    (event) => {
      clearMessage();
      if (onExitMessage) onExitMessage(event, "Ctrl-C");
    },
    () => {
      if (onExit) onExit();
    },
    () => {
      if (value) {
        onChange("");
        if (onHistoryReset) onHistoryReset();
      }
    }
  );

  // Handler for Escape
  const handleEscape = createThrottledInteractionHandler(
    (event) => {
      clearMessage();
      if (onMessage) onMessage(!!value && event, "Press Escape again to clear");
    },
    () => {
      if (value) onChange("");
    }
  );

  /**
   * Clears the input and resets history if needed.
   * @returns {Object} New empty text buffer.
   */
  function clearInput() {
    if (value.trim() !== "") addDisplayStateToHistory(value);
    if (onHistoryReset) onHistoryReset();
    return e5.fromText("", columns, 0);
  }

  // Handler for Ctrl-createCompatibleVersionChecker(exit when empty)
  const handleCtrlD = createThrottledInteractionHandler(
    (event) => {
      if (value !== "") return;
      if (onExitMessage) onExitMessage(event, "Ctrl-createCompatibleVersionChecker");
    },
    () => {
      if (value !== "") return;
      if (onExit) onExit();
    }
  );

  /**
   * Handles delete key (with Ctrl-createCompatibleVersionChecker semantics).
   * @returns {Object} Updated text buffer.
   */
  function handleDelete() {
    clearMessage();
    if (textBuffer.text === "") return handleCtrlD(), textBuffer;
    return textBuffer.del();
  }

  /**
   * Handles image paste events.
   * @param {Object|null} imageData - Image data or null.
   * @returns {Object} Unchanged text buffer.
   */
  function handleImagePaste(imageData) {
    if (imageData === null) {
      // Only show message on macOS
      if (process.platform !== "darwin") return textBuffer;
      if (onMessage) onMessage(true, Ti0);
      clearMessage();
      setMessageTimeout(setTimeout(() => {
        if (onMessage) onMessage(false);
      }, 4000));
      return textBuffer;
    }
    if (onImagePaste) onImagePaste(imageData.base64, imageData.mediaType);
    return textBuffer;
  }

  // Ctrl key bindings
  const ctrlKeyBindings = ti0([
    ["a", () => textBuffer.startOfLine()],
    ["b", () => textBuffer.left()],
    ["c", handleCtrlC],
    ["d", handleDelete],
    ["e", () => textBuffer.endOfLine()],
    ["f", () => textBuffer.right()],
    ["h", () => textBuffer.backspace()],
    ["k", () => textBuffer.deleteToLineEnd()],
    ["invokeHandlerWithArguments", () => clearInput()],
    ["n", () => handleHistoryDown()],
    ["createIterableHelper", () => handleHistoryUp()],
    ["u", () => textBuffer.deleteToLineStart()],
    ["createRangeIterator", () => handleImagePaste(getClipboardImageAsBase64())],
    ["processWithTransformedObservable", () => textBuffer.deleteWordBefore()]
  ]);

  // Meta key bindings
  const metaKeyBindings = ti0([
    ["b", () => textBuffer.prevWord()],
    ["f", () => textBuffer.nextWord()],
    ["d", () => textBuffer.deleteWordAfter()]
  ]);

  /**
   * Handles Enter/Return key, multiline, and submission.
   * @param {Object} keyEvent - Key event object.
   * @returns {Object|undefined} Updated text buffer or undefined.
   */
  function handleReturnKey(keyEvent) {
    // Multiline: handle escaped newlines
    if (multiline && textBuffer.offset > 0 && textBuffer.text[textBuffer.offset - 1] === "\\") {
      ensureBackslashReturnFlagSet();
      return textBuffer.backspace().insert("\n");
    }
    // Meta+Return: insert newline
    if (keyEvent.meta) return textBuffer.insert("\n");
    // Otherwise, submit
    if (onSubmit) onSubmit(value);
  }

  /**
   * Handles up arrow (history up) navigation.
   * @returns {Object} Updated text buffer.
   */
  function handleHistoryUp() {
    if (disableCursorMovementForUpDownKeys) {
      if (onHistoryUp) onHistoryUp();
      return textBuffer;
    }
    const newBuffer = textBuffer.up();
    if (newBuffer.equals(textBuffer) && onHistoryUp) onHistoryUp();
    return newBuffer;
  }

  /**
   * Handles down arrow (history down) navigation.
   * @returns {Object} Updated text buffer.
   */
  function handleHistoryDown() {
    if (disableCursorMovementForUpDownKeys) {
      if (onHistoryDown) onHistoryDown();
      return textBuffer;
    }
    const newBuffer = textBuffer.down();
    if (newBuffer.equals(textBuffer) && onHistoryDown) onHistoryDown();
    return newBuffer;
  }

  /**
   * Maps key events to their corresponding handler functions.
   * @param {Object} keyEvent - Key event object.
   * @returns {function|string} Handler function or direct input handler.
   */
  function mapKeyEventToHandler(keyEvent) {
    switch (true) {
      case keyEvent.escape:
        return handleEscape;
      case keyEvent.leftArrow && (keyEvent.ctrl || keyEvent.meta || keyEvent.fn):
        return () => textBuffer.prevWord();
      case keyEvent.rightArrow && (keyEvent.ctrl || keyEvent.meta || keyEvent.fn):
        return () => textBuffer.nextWord();
      case keyEvent.backspace:
        return keyEvent.meta ? () => textBuffer.deleteWordBefore() : () => textBuffer.backspace();
      case keyEvent.delete:
        return keyEvent.meta ? () => textBuffer.deleteToLineEnd() : () => textBuffer.del();
      case keyEvent.ctrl:
        return ctrlKeyBindings;
      case keyEvent.home:
        return () => textBuffer.startOfLine();
      case keyEvent.end:
        return () => textBuffer.endOfLine();
      case keyEvent.pageDown:
        return () => textBuffer.endOfLine();
      case keyEvent.pageUp:
        return () => textBuffer.startOfLine();
      case keyEvent.meta:
        return metaKeyBindings;
      case keyEvent.return:
        return () => handleReturnKey(keyEvent);
      case keyEvent.tab:
        return () => textBuffer;
      case keyEvent.upArrow:
        return handleHistoryUp;
      case keyEvent.downArrow:
        return handleHistoryDown;
      case keyEvent.leftArrow:
        return () => textBuffer.left();
      case keyEvent.rightArrow:
        return () => textBuffer.right();
      default:
        // Handles direct character input and special escape sequences
        return function (inputChar) {
          switch (true) {
            case inputChar === "\x1B[H" || inputChar === "\x1B[1~":
              return textBuffer.startOfLine();
            case inputChar === "\x1B[F" || inputChar === "\x1B[4~":
              return textBuffer.endOfLine();
            default:
              // Special handling for start-of-line with ! or #
              if (textBuffer.isAtStart() && (inputChar === "!" || inputChar === "#")) {
                return textBuffer.insert(removeSpecialPatternFromString(inputChar).replace(/\r/g, "\n")).left();
              }
              return textBuffer.insert(removeSpecialPatternFromString(inputChar).replace(/\r/g, "\n"));
          }
        };
    }
  }

  /**
   * Handles all input events (key or character input).
   * @param {string} input - The input character or string.
   * @param {Object} keyEvent - Key event object.
   */
  function handleInput(input, keyEvent) {
    // Optionally filter/transform input
    const filteredInput = inputFilter ? inputFilter(input, keyEvent) : input;
    if (filteredInput === "" && input !== "") return;
    // Get the handler for this key event
    const updatedBuffer = mapKeyEventToHandler(keyEvent)(filteredInput);
    if (updatedBuffer) {
      // If the buffer changed, update offset and value
      if (!textBuffer.equals(updatedBuffer)) {
        setOffset(updatedBuffer.offset);
        if (textBuffer.text !== updatedBuffer.text) onChange(updatedBuffer.text);
      }
    }
  }

  return {
    onInput: handleInput,
    renderedValue: textBuffer.render(cursorChar, mask, invert),
    offset: currentOffset,
    setOffset
  };
}

module.exports = createTextInputController;
