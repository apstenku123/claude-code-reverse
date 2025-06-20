/**
 * Factory function to create an input handler for a text input component with advanced editing, history, and paste/image support.
 * Handles keyboard navigation, input filtering, cursor movement, and custom callbacks for various user actions.
 *
 * @param {Object} options - Configuration options for the input handler.
 * @param {string} options.value - The current input value.
 * @param {function} options.onChange - Callback when the input value changes.
 * @param {function} options.onSubmit - Callback when the input is submitted (e.g., Enter pressed).
 * @param {function} options.onExit - Callback when the input is exited (e.g., Escape pressed).
 * @param {function} options.onExitMessage - Callback to show a message when exiting (e.g., Ctrl+C/createCompatibleVersionChecker).
 * @param {function} options.onMessage - Callback to show a message (e.g., Escape pressed once).
 * @param {function} options.onHistoryUp - Callback for navigating up in input history.
 * @param {function} options.onHistoryDown - Callback for navigating down in input history.
 * @param {function} options.onHistoryReset - Callback to reset input history.
 * @param {string} [options.mask=""] - Optional mask character for input display.
 * @param {boolean} [options.multiline=false] - Whether the input supports multiline editing.
 * @param {string} [options.cursorChar] - Character to use for the cursor.
 * @param {boolean} [options.invert] - Whether to invert the input display.
 * @param {number} [options.columns] - Number of columns for the input.
 * @param {function} [options.onImagePaste] - Callback for when an image is pasted.
 * @param {boolean} [options.disableCursorMovementForUpDownKeys=false] - Disables cursor movement for up/down keys if true.
 * @param {number} [options.externalOffset] - External offset for the cursor.
 * @param {function} [options.onOffsetChange] - Callback when the offset changes.
 * @param {function} [options.inputFilter] - Function to filter input before processing.
 * @returns {Object} Input handler with onInput, renderedValue, offset, and setOffset.
 */
function createInputHandler({
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
  let offset = externalOffset;
  let setOffset = onOffsetChange;
  // Create a text buffer object from the current value
  const textBuffer = e5.fromText(value, columns, offset);
  // State for message timeout (e.g., for temporary UI messages)
  const [messageTimeout, setMessageTimeout] = ei0.useState(null);

  /**
   * Clears any active message timeout and hides the message.
   */
  function clearMessageTimeout() {
    if (!messageTimeout) return;
    clearTimeout(messageTimeout);
    setMessageTimeout(null);
    if (onMessage) onMessage(false);
  }

  // Handler for Ctrl+C(exit with message) and Escape (exit)
  const handleExitWithMessage = createThrottledInteractionHandler(
    (event) => {
      clearMessageTimeout();
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

  // Handler for Escape (show message, then clear on second press)
  const handleEscape = createThrottledInteractionHandler(
    (event) => {
      clearMessageTimeout();
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

  // Handler for Ctrl+createCompatibleVersionChecker(exit with message if empty, else ignore)
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
   * Deletes a character or exits if input is empty.
   * @returns {Object} Updated text buffer.
   */
  function handleDelete() {
    clearMessageTimeout();
    if (textBuffer.text === "") {
      handleCtrlD();
      return textBuffer;
    }
    return textBuffer.del();
  }

  /**
   * Handles image paste events.
   * @param {Object|null} imageData - Image data object or null.
   * @returns {Object} Unchanged text buffer.
   */
  function handleImagePaste(imageData) {
    if (imageData === null) {
      // Only show message on macOS
      if (process.platform !== "darwin") return textBuffer;
      if (onMessage) onMessage(true, Ti0);
      clearMessageTimeout();
      setMessageTimeout(setTimeout(() => {
        if (onMessage) onMessage(false);
      }, 4000));
      return textBuffer;
    }
    if (onImagePaste) onImagePaste(imageData.base64, imageData.mediaType);
    return textBuffer;
  }

  // Mapping for Ctrl+<key> commands
  const ctrlKeyMap = ti0([
    ["a", () => textBuffer.startOfLine()],
    ["b", () => textBuffer.left()],
    ["c", handleExitWithMessage],
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

  // Mapping for Meta+<key> commands
  const metaKeyMap = ti0([
    ["b", () => textBuffer.prevWord()],
    ["f", () => textBuffer.nextWord()],
    ["d", () => textBuffer.deleteWordAfter()]
  ]);

  /**
   * Handles Enter/Return key, including multiline and meta cases.
   * @param {Object} keyEvent - Key event object.
   * @returns {Object|undefined} Updated text buffer or undefined.
   */
  function handleReturnKey(keyEvent) {
    // Multiline: insert newline if previous char is backslash
    if (multiline && textBuffer.offset > 0 && textBuffer.text[textBuffer.offset - 1] === "\\") {
      ensureBackslashReturnFlagSet();
      return textBuffer.backspace().insert(`\n`);
    }
    // Meta+Return: insert newline
    if (keyEvent.meta) return textBuffer.insert(`\n`);
    // Otherwise, submit
    if (onSubmit) onSubmit(value);
  }

  /**
   * Handles up arrow key (history up or move cursor up).
   * @returns {Object} Updated text buffer.
   */
  function handleHistoryUp() {
    if (disableCursorMovementForUpDownKeys) {
      if (onHistoryUp) onHistoryUp();
      return textBuffer;
    }
    const newBuffer = textBuffer.up();
    if (newBuffer.equals(textBuffer)) {
      if (onHistoryUp) onHistoryUp();
    }
    return newBuffer;
  }

  /**
   * Handles down arrow key (history down or move cursor down).
   * @returns {Object} Updated text buffer.
   */
  function handleHistoryDown() {
    if (disableCursorMovementForUpDownKeys) {
      if (onHistoryDown) onHistoryDown();
      return textBuffer;
    }
    const newBuffer = textBuffer.down();
    if (newBuffer.equals(textBuffer)) {
      if (onHistoryDown) onHistoryDown();
    }
    return newBuffer;
  }

  /**
   * Maps a key event to the corresponding handler function.
   * @param {Object} keyEvent - Key event object.
   * @returns {function} Handler function for the key event.
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
        return ctrlKeyMap;
      case keyEvent.home:
        return () => textBuffer.startOfLine();
      case keyEvent.end:
        return () => textBuffer.endOfLine();
      case keyEvent.pageDown:
        return () => textBuffer.endOfLine();
      case keyEvent.pageUp:
        return () => textBuffer.startOfLine();
      case keyEvent.meta:
        return metaKeyMap;
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
        // Default: handle literal character input and special escape sequences
        return function (inputChar) {
          switch (true) {
            case inputChar === "\x1B[H" || inputChar === "\x1B[1~":
              return textBuffer.startOfLine();
            case inputChar === "\x1B[F" || inputChar === "\x1B[4~":
              return textBuffer.endOfLine();
            default:
              // Insert literal character, handling special cases at start
              if (textBuffer.isAtStart() && (inputChar === "!" || inputChar === "#")) {
                return textBuffer.insert(removeSpecialPatternFromString(inputChar).replace(/\r/g, `\n`)).left();
              }
              return textBuffer.insert(removeSpecialPatternFromString(inputChar).replace(/\r/g, `\n`));
          }
        };
    }
  }

  /**
   * Main input handler function. Processes input and key events, applies filters, and updates state.
   * @param {string} inputValue - The input value or character.
   * @param {Object} keyEvent - Key event object.
   */
  function onInput(inputValue, keyEvent) {
    // Apply input filter if provided
    const filteredInput = inputFilter ? inputFilter(inputValue, keyEvent) : inputValue;
    if (filteredInput === "" && inputValue !== "") return;
    // Get the handler for this key event
    const newBuffer = mapKeyEventToHandler(keyEvent)(filteredInput);
    if (newBuffer) {
      // If buffer changed, update offset and value
      if (!textBuffer.equals(newBuffer)) {
        setOffset(newBuffer.offset);
        if (textBuffer.text !== newBuffer.text) onChange(newBuffer.text);
      }
    }
  }

  return {
    onInput,
    renderedValue: textBuffer.render(cursorChar, mask, invert),
    offset,
    setOffset
  };
}

module.exports = createInputHandler;
