/**
 * useDelayedTrueState
 *
 * a custom React hook that returns a boolean state which becomes true after a specified delay in milliseconds.
 *
 * @param {number} delayMs - The delay in milliseconds before the state becomes true.
 * @returns {boolean} - Boolean state that is initially false and becomes true after the delay.
 */
function useDelayedTrueState(delayMs) {
  // Initialize state to false; will become true after the delay
  const [isDelayElapsed, setIsDelayElapsed] = Cz1.useState(false);

  Cz1.useEffect(() => {
    // Set a timeout to update the state after the specified delay
    const timeoutId = setTimeout(() => {
      setIsDelayElapsed(true);
    }, delayMs);

    // Cleanup: clear the timeout if the component unmounts or delayMs changes
    return () => clearTimeout(timeoutId);
  }, [delayMs]);

  return isDelayElapsed;
}

module.exports = useDelayedTrueState;