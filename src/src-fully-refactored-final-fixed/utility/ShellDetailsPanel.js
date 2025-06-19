/**
 * Renders a detailed panel displaying information about a running or completed shell command.
 * Shows command details, runtime, stdout/stderr output, and provides keyboard shortcuts for closing or killing the shell.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.shell - The shell object containing command, status, id, startTime, and result.
 * @param {Function} params.onDone - Callback to invoke when the panel should be closed.
 * @param {Function} [params.onKillShell] - Optional callback to kill the running shell.
 * @returns {JSX.Element} The rendered shell details panel.
 */
function ShellDetailsPanel({
  shell,
  onDone,
  onKillShell
}) {
  // Theme and color palette
  const theme = getThemeStylesheet();

  // Used to trigger periodic updates (every second) while running
  const [tick, setTick] = XA1.useState(0);

  // State for shell output and line counts
  const [output, setOutput] = XA1.useState({
    stdout: "",
    stderr: "",
    stdoutLines: 0,
    stderrLines: 0
  });

  // Keyboard event handler: esc closes, 'k' kills shell if running
  D0((key, event) => {
    if (event.escape) {
      onDone();
    } else if (key === "k" && shell.status === "running" && onKillShell) {
      onKillShell();
    }
  });

  // Keyboard shortcut state (for showing hints)
  const keyboardShortcut = useCtrlKeyActionHandler();

  /**
   * Formats the runtime duration from the shell'createInteractionAccessor start time to now.
   * @param {number} startTime - The shell'createInteractionAccessor start time (ms since epoch)
   * @returns {string} Formatted duration string
   */
  const formatRuntime = (startTime) => {
    const secondsElapsed = Math.floor((Date.now() - startTime) / 1000);
    const hours = Math.floor(secondsElapsed / 3600);
    const minutes = Math.floor((secondsElapsed - hours * 3600) / 60);
    const seconds = secondsElapsed - hours * 3600 - minutes * 60;
    return `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 || hours > 0 ? `${minutes}m ` : ""}${seconds}createInteractionAccessor`;
  };

  // Effect: poll shell output and update state every second while running
  XA1.useEffect(() => {
    // Fetch latest shell output
    const shellOutput = aw.getShellOutput(shell.id);

    /**
     * Merges previous and new output, keeping only the last operateWithLeadingTrailing lines.
     * @param {string} previous - Previous output
     * @param {string} next - New output
     * @param {number} maxLines - Max lines to keep
     * @returns {string}
     */
    const mergeOutput = (previous, next, maxLines = 10) => {
      if (!next) return previous;
      const prevLines = previous.split("\n");
      const nextLines = next.split("\n");
      return [...prevLines, ...nextLines].slice(-maxLines).join("\n");
    };

    // Merge and truncate stdout/stderr
    const mergedStdout = mergeOutput(output.stdout, shellOutput.stdout);
    const mergedStderr = mergeOutput(output.stderr, shellOutput.stderr);

    // Truncate and count lines for display
    const { totalLines: stdoutLines, truncatedContent: truncatedStdout } = getTruncatedContentSummary(mergedStdout);
    const { totalLines: stderrLines, truncatedContent: truncatedStderr } = getTruncatedContentSummary(mergedStderr);

    // Update output state
    setOutput({
      stdout: truncatedStdout,
      stderr: truncatedStderr,
      stdoutLines,
      stderrLines
    });

    // If still running, schedule next poll in 1s
    if (shell.status === "running") {
      const timeoutId = setTimeout(() => {
        setTick(tick => tick + 1);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [shell.id, shell.status, tick, output.stdout, output.stderr]);

  // Choose color for status
  const statusColor = shell.status === "running"
    ? theme.permission
    : shell.status === "completed"
      ? theme.success
      : theme.error;

  // Truncate command if too long for display
  const truncatedCommand = shell.command.length > 70
    ? shell.command.substring(0, 67) + "..."
    : shell.command;

  // Render the panel
  return J5.default.createElement(g, {
    width: "100%",
    flexDirection: "column"
  },
    // Outer container
    J5.default.createElement(g, { width: "100%" },
      // Bordered panel
      J5.default.createElement(g, {
        borderStyle: "round",
        borderColor: theme.permission,
        flexDirection: "column",
        padding: 1,
        width: "100%"
      },
        // Title
        J5.default.createElement(g, null,
          J5.default.createElement(_, {
            color: theme.permission,
            bold: true
          }, "Bash Details")
        ),
        // Command details
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
            J5.default.createElement(_, { bold: true }, "Command:"), " ", truncatedCommand
          )
        ),
        // STDOUT section
        J5.default.createElement(g, {
          flexDirection: "column",
          marginY: 1
        },
          J5.default.createElement(_, { bold: true }, "STDOUT:"),
          output.stdout
            ? J5.default.createElement(J5.default.Fragment, null,
                J5.default.createElement(g, {
                  borderStyle: "round",
                  borderColor: theme.secondaryBorder,
                  paddingX: 1,
                  flexDirection: "column",
                  height: 7
                },
                  output.stdout.split("\n").slice(-5).map((line, idx) =>
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
                  output.stdoutLines > 5
                    ? `Showing last 5 lines of ${output.stdoutLines} total lines`
                    : `Showing ${output.stdoutLines} lines`
                )
              )
            : J5.default.createElement(_, { dimColor: true }, "No stdout output available")
        ),
        // STDERR section (only if present)
        output.stderr && J5.default.createElement(g, {
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
            output.stderr.split("\n").slice(-1).map((line, idx) =>
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
            output.stderrLines > 1
              ? `Showing last line of ${output.stderrLines} total lines`
              : `Showing ${output.stderrLines} line`
          )
        )
      )
    ),
    // Footer: keyboard shortcut hints
    J5.default.createElement(g, null,
      keyboardShortcut.pending
        ? J5.default.createElement(_, { dimColor: true }, "Press ", keyboardShortcut.keyName, " again to exit")
        : J5.default.createElement(_, { dimColor: true },
            "Press esc to close",
            shell.status === "running" && onKillShell
              ? J5.default.createElement(_, null, " · k to kill shell")
              : null
          )
    )
  );
}

module.exports = ShellDetailsPanel;