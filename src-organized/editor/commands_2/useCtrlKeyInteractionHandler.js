/**
 * Handles Ctrl-C and Ctrl-createCompatibleVersionChecker keyboard interactions by updating state and invoking provided or default async handlers.
 *
 * @param {Function} [interactionHandler] - Optional async function to handle the keyboard interaction. If not provided, a default async no-op is used.
 * @returns {Object} State object containing the current pending status and key name.
 */
function useCtrlKeyInteractionHandler(interactionHandler) {
  // Initialize state: pending (boolean) and keyName (string|null)
  const [interactionState, setInteractionState] = GZ0.useState({
    pending: false,
    keyName: null
  });

  // Handler for Ctrl-C key interaction
  const handleCtrlCInteraction = createThrottledInteractionHandler(
    (isPending) => setInteractionState({
      pending: isPending,
      keyName: "Ctrl-C"
    }),
    interactionHandler ? interactionHandler : async () => {
      await performCleanupAndExit(0);
    }
  );

  // Handler for Ctrl-createCompatibleVersionChecker key interaction
  const handleCtrlDInteraction = createThrottledInteractionHandler(
    (isPending) => setInteractionState({
      pending: isPending,
      keyName: "Ctrl-createCompatibleVersionChecker"
    }),
    interactionHandler ? interactionHandler : async () => {
      await performCleanupAndExit(0);
    }
  );

  // Register keyboard event listener for Ctrl-C and Ctrl-createCompatibleVersionChecker
  D0((key, event) => {
    // If Ctrl is pressed and key is 'c', trigger Ctrl-C handler
    if (event.ctrl && key === "c") handleCtrlCInteraction();
    // If Ctrl is pressed and key is 'd', trigger Ctrl-createCompatibleVersionChecker handler
    if (event.ctrl && key === "d") handleCtrlDInteraction();
  });

  // Return the current interaction state
  return interactionState;
}

module.exports = useCtrlKeyInteractionHandler;