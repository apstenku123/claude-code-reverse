/**
 * useTerminalInputListener
 *
 * Sets up terminal input event listeners and manages raw mode for terminal input.
 * Invokes the provided callback when input events are received, passing detailed key metadata.
 *
 * @param {function} onInputCallback - Callback invoked with (input, keyMeta) when terminal input is received.
 * @param {object} [options={}] - Configuration options.
 * @param {boolean} [options.isActive=true] - Whether the listener should be active.
 *
 * @returns {void}
 */
const useTerminalInputListener = (onInputCallback, options = {}) => {
  // Destructure dependencies from Ag()
  const {
    stdin: terminalStdin,
    setRawMode: setTerminalRawMode,
    internal_exitOnCtrlC: exitOnCtrlC,
    internal_eventEmitter: terminalEventEmitter
  } = Ag();

  // Effect to manage raw mode based on isActive
  px1.useEffect(() => {
    if (options.isActive === false) return;
    setTerminalRawMode(true);
    // Cleanup: disable raw mode when effect is cleaned up
    return () => {
      setTerminalRawMode(false);
    };
  }, [options.isActive, setTerminalRawMode]);

  // Effect to handle terminal input events
  px1.useEffect(() => {
    if (options.isActive === false) return;

    /**
     * Handles terminal input events, parses key metadata, and invokes callback.
     * @param {object} keyEvent - The key event object from terminal input.
     */
    const handleInputEvent = (keyEvent) => {
      // Build key metadata object
      const keyMeta = {
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

      // Determine the input string or key name
      let inputValue = keyEvent.ctrl ? keyEvent.name : keyEvent.sequence;
      if (inputValue === undefined) return;

      // Ignore certain function keys
      if (keyEvent.name && FG0.includes(keyEvent.name)) {
        inputValue = "";
      }

      // Remove leading escape character if present
      if (typeof inputValue === "string" && inputValue.startsWith("\x1B")) {
        inputValue = inputValue.slice(1);
      }

      // If input is a single uppercase character, set shift to true
      if (
        typeof inputValue === "string" &&
        inputValue.length === 1 &&
        inputValue[0].toUpperCase() === inputValue[0]
      ) {
        keyMeta.shift = true;
      }

      // If Ctrl+C and exitOnCtrlC is enabled, do not call callback (let process exit)
      if (inputValue === "c" && keyMeta.ctrl && exitOnCtrlC) {
        return;
      }

      // Use batched updates for performance
      cS.batchedUpdates(() => {
        onInputCallback(inputValue, keyMeta);
      });
    };

    // Subscribe to terminal input events
    terminalEventEmitter?.on("input", handleInputEvent);

    // Cleanup: remove listener on unmount or dependency change
    return () => {
      terminalEventEmitter?.removeListener("input", handleInputEvent);
    };
  }, [options.isActive, terminalStdin, exitOnCtrlC, onInputCallback]);
};

module.exports = useTerminalInputListener;
