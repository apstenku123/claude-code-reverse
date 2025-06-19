/**
 * Displays a prompt for handling a long-running command, allowing the user to choose how to proceed.
 * Shows elapsed time, command details, and options to wait, run in background, or kill the command.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.command - The command object being executed.
 * @param {number} props.elapsedTimeSeconds - The initial elapsed time in seconds.
 * @param {function} props.onOptionSelected - Callback invoked when the user selects an option.
 * @returns {React.Element} The rendered prompt component.
 */
function LongRunningCommandPrompt({
  command,
  elapsedTimeSeconds,
  onOptionSelected
}) {
  // Get theme styles for consistent UI appearance
  const themeStyles = getThemeStylesheet();

  // State to track the number of seconds the command has been running
  const [elapsedSeconds, setElapsedSeconds] = Y5.useState(elapsedTimeSeconds);

  // Start an interval to update elapsedSeconds every second
  Y5.useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Get keyboard shortcut info (e.g., for exiting the prompt)
  const keyboardInfo = useCtrlKeyActionHandler();

  // Define the available user options
  const commandOptions = [
    {
      label: "Continue waiting",
      value: "wait"
    },
    {
      label: "Run in the background",
      value: "background"
    },
    {
      label: "Kill command",
      value: "kill"
    }
  ];

  /**
   * Handles the user'createInteractionAccessor option selection.
   * @param {string} selectedOption - The value of the selected option.
   */
  function handleOptionChange(selectedOption) {
    switch (selectedOption) {
      case "wait":
        onOptionSelected("wait");
        break;
      case "background":
        onOptionSelected("background");
        break;
      case "kill":
        onOptionSelected("kill");
        break;
      default:
        // No action for unknown option
        break;
    }
  }

  // Render the prompt UI
  return Y5.createElement(
    g,
    {
      flexDirection: "column",
      width: "100%"
    },
    // Outer container
    Y5.createElement(
      g,
      {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: themeStyles.permission,
        marginTop: 1,
        paddingLeft: 1,
        paddingRight: 1,
        paddingBottom: 1,
        width: "100%"
      },
      // Header
      Y5.createElement(
        g,
        { marginBottom: 1 },
        Y5.createElement(_, {
          color: themeStyles.permission,
          bold: true
        }, "Long-running command")
      ),
      // Command details and elapsed time
      Y5.createElement(
        g,
        {
          flexDirection: "column",
          paddingX: 1
        },
        Y5.createElement(
          _,
          { wrap: "truncate-end" },
          P4.renderToolUseMessage(
            { command },
            { verbose: true }
          )
        ),
        Y5.createElement(
          _,
          null,
          "Running for ",
          Y5.createElement(_, { bold: true }, elapsedSeconds),
          " seconds"
        )
      ),
      // Options prompt
      Y5.createElement(
        g,
        {
          flexDirection: "column",
          marginTop: 1
        },
        Y5.createElement(_, null, "How do you want to proceed?"),
        Y5.createElement(SelectableOptionsList, {
          options: commandOptions,
          onChange: handleOptionChange,
          onCancel: () => onOptionSelected("wait")
        })
      )
    ),
    // Keyboard hint
    Y5.createElement(
      g,
      { marginLeft: 2 },
      keyboardInfo.pending
        ? Y5.createElement(_, { dimColor: true }, "Press ", keyboardInfo.keyName, " again to exit")
        : Y5.createElement(_, { dimColor: true }, "Press esc to close")
    )
  );
}

module.exports = LongRunningCommandPrompt;