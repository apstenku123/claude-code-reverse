/**
 * Custom React hook that provides the current terminal window size (columns and rows).
 * It listens for terminal resize events and updates the state accordingly.
 *
 * @returns {{columns: number, rows: number}} The current terminal window size.
 */
function useTerminalWindowSize() {
  // Check if the process is running in a special environment (e.g., CI or test)
  const isSpecialEnvironment = dI1();

  // Initialize state with current terminal size or default values
  const [windowSize, setWindowSize] = JK1.useState({
    columns: process.stdout.columns || 80,
    rows: process.stdout.rows || 24
  });

  JK1.useEffect(() => {
    // If in a special environment, do not set up resize listener
    if (isSpecialEnvironment) return;

    // Handler to update state when terminal is resized
    function handleResize() {
      setWindowSize({
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
  }, [isSpecialEnvironment]);

  return windowSize;
}

module.exports = useTerminalWindowSize;