/**
 * Renders detailed information about a running shell session, including its status, runtime, command, and output.
 * Handles keyboard interactions for closing or killing the shell, and periodically updates runtime and output.
 *
 * @param {Object} params - The parameters for the shell session details component.
 * @param {Object} params.shell - The shell session object containing id, status, command, startTime, and result.
 * @param {Function} params.onDone - Callback to invoke when the session should be closed.
 * @param {Function} [params.onKillShell] - Optional callback to invoke to kill the running shell session.
 * @returns {JSX.Element} The rendered shell session details component.
 */
function ShellSessionDetails({
  shell,
  onDone,
  onKillShell
}) {
  // Get theme colors/styles
  const theme = getThemeStylesheet();

  // Used to trigger re-render every second for runtime updates
  const [tick, setTick] = XA1.useState(0);

  // State for shell output and line counts
  const [outputState, setOutputState] = XA1.useState({
    stdout: "",
    stderr: "",
    stdoutLines: 0,
    stderrLines: 0
  });

  // Keyboard interaction handler
  D0((key, meta) => {
    if (meta.escape) {
      onDone();
    } else if (key === "k" && shell.status === "running" && onKillShell) {
      onKillShell();
    }
  });

  // Get key prompt state (e.g., for exit/killing shell)
  const keyPrompt = useCtrlKeyActionHandler();

  /**
   * Formats the runtime duration from start time to now as a human-readable string.
   * @param {number} startTime - The shell'createInteractionAccessor start time (timestamp in ms).
   * @returns {string} Formatted duration string.
   */
  const formatRuntime = (startTime) => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds - hours * 3600) / 60);
    const seconds = elapsedSeconds - hours * 3600 - minutes * 60;
    return `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 || hours > 0 ? `${minutes}m ` : ""}${seconds}createInteractionAccessor`;
  };

  // Effect: Poll shell output and update state every second while running
  XA1.useEffect(() => {
    // Get latest shell output
    const shellOutput = aw.getShellOutput(shell.id);

    /**
     * Merges previous and new output, keeping only the last operateWithLeadingTrailing lines.
     * @param {string} previous - Previous output string.
     * @param {string} next - New output string.
     * @param {number} maxLines - Max lines to keep.
     * @returns {string} Merged output string.
     */
    const mergeOutput = (previous, next, maxLines = 10) => {
      if (!next) return previous;
      const prevLines = previous.split("\n");
      const nextLines = next.split("\n");
      return [...prevLines, ...nextLines].slice(-maxLines).join("\n");
    };

    // Merge and truncate stdout/stderr
    const mergedStdout = mergeOutput(outputState.stdout, shellOutput.stdout);
    const mergedStderr = mergeOutput(outputState.stderr, shellOutput.stderr);

    // Truncate and count lines for display
    const { totalLines: stdoutLines, truncatedContent: truncatedStdout } = getTruncatedContentSummary(mergedStdout);
    const { totalLines: stderrLines, truncatedContent: truncatedStderr } = getTruncatedContentSummary(mergedStderr);

    // Update output state
    setOutputState({
      stdout: truncatedStdout,
      stderr: truncatedStderr,
      stdoutLines,
      stderrLines
    });

    // If shell is running, set up a timer to update every second
    if (shell.status === "running") {
      const timer = setTimeout(() => {
        setTick(processRuleBeginHandlers => processRuleBeginHandlers + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [shell.id, shell.status, tick, outputState.stdout, outputState.stderr]);

  // Determine color for status
  const statusColor = shell.status === "running"
    ? theme.permission
    : shell.status === "completed"
      ? theme.success
      : theme.error;

  // Truncate command if too long
  const truncatedCommand = shell.command.length > 70
    ? shell.command.substring(0, 67) + "..."
    : shell.command;

  // Render UI
  return J5.default.createElement(g, {
    width: "100%",
    flexDirection: "column"
  },
    // Outer container
    J5.default.createElement(g, { width: "100%" },
      J5.default.createElement(g, {
        borderStyle: "round",
        borderColor: theme.permission,
        flexDirection: "column",
        padding: 1,
        width: "100%"
      },
        // Header
        J5.default.createElement(g, null,
          J5.default.createElement(_, {
            color: theme.permission,
            bold: true
          }, "Bash Details")
        ),
        // Details section
        J5.default.createElement(g, {
          flexDirection: "column",
          marginY: 1
        },
          J5.default.createElement(_, null,
            J5.default.createElement(_, { bold: true }, "updateSnapshotAndNotify:"), " ", shell.id
          ),
          J5.default.createElement(_, null,
            J5.default.createElement(_, { bold: true }, "Status:"), " ",
            J5.default.createElement(_, { color: statusColor },
              shell.status,
              shell.result?.code !== undefined && ` (exit code: ${shell.result.code})`
            )
          ),
          J5.default.createElement(_, null,
            J5.default.createElement(_, { bold: true }, "Runtime:"), " ",
            formatRuntime(shell.startTime)
          ),
          J5.default.createElement(_, { wrap: "truncate-end" },
            J5.default.createElement(_, { bold: true }, "Command:"), " ",
            truncatedCommand
          )
        ),
        // STDOUT section
        J5.default.createElement(g, {
          flexDirection: "column",
          marginY: 1
        },
          J5.default.createElement(_, { bold: true }, "STDOUT:"),
          outputState.stdout
            ? J5.default.createElement(J5.default.Fragment, null,
                J5.default.createElement(g, {
                  borderStyle: "round",
                  borderColor: theme.secondaryBorder,
                  paddingX: 1,
                  flexDirection: "column",
                  height: 7
                },
                  outputState.stdout.split("\n").slice(-5).map((line, idx) =>
                    J5.default.createElement(_, {
                      key: idx,
                      wrap: "truncate-end"
                    }, line)
                  )
                ),
                J5.default.createElement(_, {
                  dimColor: true,
                  italic: true
                },
                  outputState.stdoutLines > 5
                    ? `Showing last 5 lines of ${outputState.stdoutLines} total lines`
                    : `Showing ${outputState.stdoutLines} lines`
                )
              )
            : J5.default.createElement(_, { dimColor: true }, "No stdout output available")
        ),
        // STDERR section (only if present)
        outputState.stderr && J5.default.createElement(g, {
          flexDirection: "column",
          marginBottom: 1
        },
          J5.default.createElement(_, {
            bold: true,
            color: theme.error
          }, "STDERR:"),
          J5.default.createElement(g, {
            borderStyle: "round",
            borderColor: theme.error,
            paddingX: 1,
            flexDirection: "column",
            height: 3
          },
            outputState.stderr.split("\n").slice(-1).map((line, idx) =>
              J5.default.createElement(_, {
                key: idx,
                color: theme.error,
                wrap: "truncate-end"
              }, line)
            )
          ),
          J5.default.createElement(_, {
            dimColor: true,
            italic: true,
            color: theme.error
          },
            outputState.stderrLines > 1
              ? `Showing last line of ${outputState.stderrLines} total lines`
              : `Showing ${outputState.stderrLines} line`
          )
        )
      )
    ),
    // Footer prompt
    J5.default.createElement(g, null,
      keyPrompt.pending
        ? J5.default.createElement(_, { dimColor: true }, "Press ", keyPrompt.keyName, " again to exit")
        : J5.default.createElement(_, { dimColor: true },
            "Press esc to close",
            shell.status === "running" && onKillShell
              ? J5.default.createElement(_, null, " · k to kill shell")
              : null
          )
    )
  );
}

module.exports = ShellSessionDetails;