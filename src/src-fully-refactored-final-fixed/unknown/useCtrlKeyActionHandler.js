/**
 * Handles Ctrl+C and Ctrl+createCompatibleVersionChecker keyboard shortcuts by triggering corresponding async actions.
 * Maintains state indicating if an action is pending and which key was pressed.
 *
 * @param {Function} [actionHandler] - Optional async function to execute on key press. Defaults to a no-op async function.
 * @returns {Object} State object with `pending` and `keyName` properties.
 */
function useCtrlKeyActionHandler(actionHandler) {
  // Initialize state: pending (boolean), keyName (string|null)
  const [state, setState] = GZ0.useState({
    pending: false,
    keyName: null
  });

  // Handler for Ctrl+C: sets state and triggers actionHandler
  const handleCtrlC = createThrottledInteractionHandler(
    (isPending) => setState({
      pending: isPending,
      keyName: "Ctrl-C"
    }),
    actionHandler ? actionHandler : async () => {
      await performCleanupAndExit(0);
    }
  );

  // Handler for Ctrl+createCompatibleVersionChecker: sets state and triggers actionHandler
  const handleCtrlD = createThrottledInteractionHandler(
    (isPending) => setState({
      pending: isPending,
      keyName: "Ctrl-createCompatibleVersionChecker"
    }),
    actionHandler ? actionHandler : async () => {
      await performCleanupAndExit(0);
    }
  );

  // Register keyboard event listener for Ctrl+C and Ctrl+createCompatibleVersionChecker
  D0((key, event) => {
    if (event.ctrl && key === "c") handleCtrlC();
    if (event.ctrl && key === "d") handleCtrlD();
  });

  // Return current state
  return state;
}

module.exports = useCtrlKeyActionHandler;