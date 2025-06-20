/**
 * useTerminalInputHandler
 *
 * React hook to manage terminal input events, enabling raw mode and handling keypress events.
 * It sets up listeners for terminal input, maps key events to descriptive flags, and invokes a callback with the processed input.
 *
 * @param {function} onInput - Callback function invoked with the processed input and key flags.
 * @param {object} [options={}] - Configuration options.
 * @param {boolean} [options.isActive=true] - Whether the input handler is active.
 *
 * @returns {void}
 */
const useTerminalInputHandler = (onInput, options = {}) => {
  // Destructure dependencies from Ag()
  const {
    stdin: terminalInputStream,
    setRawMode: setTerminalRawMode,
    internal_exitOnCtrlC: exitOnCtrlC,
    internal_eventEmitter: terminalEventEmitter
  } = Ag();

  // Enable or disable raw mode based on isActive
  px1.useEffect(() => {
    if (options.isActive === false) return;
    setTerminalRawMode(true);
    // Cleanup: disable raw mode on unmount or when inactive
    return () => {
      setTerminalRawMode(false);
    };
  }, [options.isActive, setTerminalRawMode]);

  // Set up terminal input event listener
  px1.useEffect(() => {
    if (options.isActive === false) return;

    /**
     * Handles terminal input events, maps key info, and invokes the callback.
     * @param {object} keyEvent - The key event object from the terminal.
     */
    const handleInput = (keyEvent) => {
      // Map key event to descriptive flags
      const keyFlags = {
        upArrow: keyEvent.name === "up",
        downArrow: keyEvent.name === "down",
        leftArrow: keyEvent.name === "left",
        rightArrow: keyEvent.name === "right",
        pageDown: keyEvent.name === "pagedown",
        pageUp: keyEvent.name === "pageup",
        home: keyEvent.name === "home",
        end: keyEvent.name === "end",
        return: keyEvent.name === "return",
        escape: keyEvent.name === "escape",
        fn: keyEvent.fn,
        ctrl: keyEvent.ctrl,
        shift: keyEvent.shift,
        tab: keyEvent.name === "tab",
        backspace: keyEvent.name === "backspace",
        delete: keyEvent.name === "delete",
        meta: keyEvent.meta || keyEvent.name === "escape" || keyEvent.option
      };

      // Determine the key sequence or name
      let keyValue = keyEvent.ctrl ? keyEvent.name : keyEvent.sequence;
      if (keyValue === undefined) return;

      // If the key name is in FG0 (special keys), ignore the value
      if (keyEvent.name && FG0.includes(keyEvent.name)) keyValue = "";

      // Remove leading escape character if present
      if (typeof keyValue === "string" && keyValue.startsWith("\x1B")) {
        keyValue = keyValue.slice(1);
      }

      // If single uppercase character, set shift flag
      if (
        typeof keyValue === "string" &&
        keyValue.length === 1 &&
        keyValue.toUpperCase() === keyValue
      ) {
        keyFlags.shift = true;
      }

      // If Ctrl+C and exitOnCtrlC is enabled, do not call callback
      if (keyValue === "c" && keyFlags.ctrl && exitOnCtrlC) return;

      // Batch updates for React state
      cS.batchedUpdates(() => {
        onInput(keyValue, keyFlags);
      });
    };

    // Register input event listener
    terminalEventEmitter?.on("input", handleInput);

    // Cleanup: remove listener on unmount or when inactive
    return () => {
      terminalEventEmitter?.removeListener("input", handleInput);
    };
  }, [options.isActive, terminalInputStream, exitOnCtrlC, onInput]);
};

module.exports = useTerminalInputHandler;
