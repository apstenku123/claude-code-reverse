/**
 * React hook that provides the current terminal (stdout) dimensions (columns and rows).
 * It listens for terminal resize events and updates the state accordingly.
 *
 * @returns {Object} An object containing the current number of columns and rows of the terminal.
 */
function useTerminalDimensions() {
  // Check if the source observable (likely a TTY check or similar) is active
  const sourceObservable = dI1();

  // Initialize state with current terminal dimensions, or defaults if unavailable
  const [terminalDimensions, setTerminalDimensions] = JK1.useState({
    columns: process.stdout.columns || 80,
    rows: process.stdout.rows || 24
  });

  JK1.useEffect(() => {
    // If the source observable is active, do not set up resize listeners
    if (sourceObservable) return;

    // Handler to update state when terminal is resized
    function handleResize() {
      setTerminalDimensions({
        columns: process.stdout.columns || 80,
        rows: process.stdout.rows || 24
      });
    }

    // Increase max listeners to avoid warnings and add resize event listener
    process.stdout.setMaxListeners(200).on("resize", handleResize);

    // Cleanup: remove resize event listener on unmount
    return () => {
      process.stdout.off("resize", handleResize);
    };
  }, [sourceObservable]);

  // Return the current terminal dimensions
  return terminalDimensions;
}

module.exports = useTerminalDimensions;
