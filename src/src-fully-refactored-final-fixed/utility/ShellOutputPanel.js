/**
 * Displays detailed information and live output for a running shell command in a styled panel.
 * Handles keyboard interactions, auto-refreshes output, and provides controls for killing the shell.
 *
 * @param {Object} props - The component props
 * @param {Object} props.shell - The shell object containing command, status, id, startTime, and result
 * @param {Function} props.onDone - Callback to invoke when the panel should close
 * @param {Function} [props.onKillShell] - Optional callback to kill the running shell
 * @returns {JSX.Element} The rendered shell output panel
 */
function ShellOutputPanel({
  shell,
  onDone,
  onKillShell
}) {
  // Get theme colors/styles
  const theme = getThemeStylesheet();

  // Used to trigger re-render every second for live runtime
  const [refreshTick, setRefreshTick] = XA1.useState(0);

  // State for shell output and line counts
  const [output, setOutput] = XA1.useState({
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

  // Get key prompt state (for exit instructions)
  const keyPrompt = useCtrlKeyActionHandler();

  /**
   * Formats elapsed time since start (in seconds) as '1h 2m 3s'
   * @param {number} startTime - The shell start timestamp (ms)
   * @returns {string}
   */
  const formatRuntime = (startTime) => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds - hours * 3600) / 60);
    const seconds = elapsedSeconds - hours * 3600 - minutes * 60;
    return `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 || hours > 0 ? `${minutes}m ` : ""}${seconds}createInteractionAccessor`;
  };

  // Effect: Poll shell output and update state every second if running
  XA1.useEffect(() => {
    // Get latest shell output
    const latestOutput = aw.getShellOutput(shell.id);

    /**
     * Merges previous and new output, keeping only the last operateWithLeadingTrailing lines
     * @param {string} prev - Previous output
     * @param {string} next - New output
     * @param {number} maxLines - Max lines to keep
     * @returns {string}
     */
    const mergeOutput = (prev, next, maxLines = 10) => {
      if (!next) return prev;
      const prevLines = prev.split("\n");
      const nextLines = next.split("\n");
      return [...prevLines, ...nextLines].slice(-maxLines).join("\n");
    };

    // Merge and truncate outputs
    const mergedStdout = mergeOutput(output.stdout, latestOutput.stdout);
    const mergedStderr = mergeOutput(output.stderr, latestOutput.stderr);

    // Truncate and count lines using getTruncatedContentSummary utility
    const { totalLines: stdoutLines, truncatedContent: truncatedStdout } = getTruncatedContentSummary(mergedStdout);
    const { totalLines: stderrLines, truncatedContent: truncatedStderr } = getTruncatedContentSummary(mergedStderr);

    // Update output state
    setOutput({
      stdout: truncatedStdout,
      stderr: truncatedStderr,
      stdoutLines,
      stderrLines
    });

    // If shell is running, set up timer to refresh every second
    if (shell.status === "running") {
      const timer = setTimeout(() => {
        setRefreshTick(tick => tick + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [shell.id, shell.status, refreshTick, output.stdout, output.stderr]);

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

  // Render panel
  return J5.default.createElement(g, {
    width: "100%",
    flexDirection: "column"
  },
    // Main panel
    J5.default.createElement(g, { width: "100%" },
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
        // Info section
        J5.default.createElement(g, {
          flexDirection: "column",
          marginY: 1
        },
          // updateSnapshotAndNotify
          J5.default.createElement(_, null,
            J5.default.createElement(_, { bold: true }, "updateSnapshotAndNotify:"), " ", shell.id
          ),
          // Status
          J5.default.createElement(_, null,
            J5.default.createElement(_, { bold: true }, "Status:"), " ",
            J5.default.createElement(_, { color: statusColor },
              shell.status,
              shell.result?.code !== undefined && ` (exit code: ${shell.result.code})`
            )
          ),
          // Runtime
          J5.default.createElement(_, null,
            J5.default.createElement(_, { bold: true }, "Runtime:"), " ",
            formatRuntime(shell.startTime)
          ),
          // Command
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
    // Footer instructions
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

module.exports = ShellOutputPanel;