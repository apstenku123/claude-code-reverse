/**
 * useDelayedTrueFlag
 *
 * a custom React hook that returns a boolean flag which becomes true after a specified delay in milliseconds.
 *
 * @param {number} delayMs - The delay in milliseconds before the flag becomes true.
 * @returns {boolean} - Returns false initially, then true after the specified delay.
 */
function useDelayedTrueFlag(delayMs) {
  // State to track whether the delay has elapsed
  const [isDelayElapsed, setIsDelayElapsed] = Cz1.useState(false);

  // Effect to start a timer when delayMs changes
  Cz1.useEffect(() => {
    // Start a timer to set the flag to true after the specified delay
    const timeoutId = setTimeout(() => {
      setIsDelayElapsed(true);
    }, delayMs);

    // Cleanup: clear the timer if the component unmounts or delayMs changes
    return () => clearTimeout(timeoutId);
  }, [delayMs]);

  return isDelayElapsed;
}

module.exports = useDelayedTrueFlag;