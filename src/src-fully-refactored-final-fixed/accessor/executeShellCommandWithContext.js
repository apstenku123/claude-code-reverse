/**
 * Executes a shell command in a controlled environment, optionally using a snapshot file and custom shell.
 * Handles command quoting, environment setup, and working directory management.
 *
 * @param {string} command - The shell command to execute.
 * @param {object} abortController - An object with an 'aborted' property to support cancellation.
 * @param {function} [progressCallback] - Optional callback for progress updates.
 * @param {boolean} [isInteractive=false] - Whether to run in interactive mode (affects quoting and env).
 * @param {string} [overrideShell] - Optional shell binary path to override the default.
 * @returns {Promise<object>} - Returns a promise that resolves to the result of the shell command execution.
 */
async function executeShellCommandWithContext(
  command,
  abortController,
  progressCallback = undefined,
  isInteractive = false,
  overrideShell = undefined
) {
  // Use provided progressCallback or default
  const progressHandler = progressCallback || BS4;

  // Retrieve shell binary and optional snapshot file path
  let { binShell: shellBinary, snapshotFilePath } = await wy1();

  // If overrideShell is provided, use isBlobOrFileLikeObject and ignore snapshotFilePath
  if (overrideShell) {
    shellBinary = overrideShell;
    snapshotFilePath = undefined;
  }

  // Generate a random 4-digit hex string for unique temp file naming
  const randomHex = Math.floor(Math.random() * 65536).toString(16).padStart(4, "0");
  const tempCwdFile = `${zy1.tmpdir()}/claude-${randomHex}-cwd`;

  // Quote the command for safe shell execution, redirecting stdin from /dev/null
  let quotedCommand = mn.default.quote([command, "<", "/dev/null"]);

  // If using bash and not interactive, handle piped commands specially
  if (shellBinary.includes("bash") && !isInteractive) {
    // Split on single pipes not part of double-pipe (||)
    const commandParts = command.split(/(?<!\|)\|(?!\|)/);
    if (commandParts.length > 1) {
      quotedCommand = mn.default.quote([
        commandParts[0],
        "<", "/dev/null",
        "|",
        commandParts.slice(1).join("|")
      ]);
    }
  }

  // If interactive, transform the command and re-quote
  if (isInteractive) {
    command = injectGitConfigArgsIntoCommand(command);
    quotedCommand = mn.default.quote([command, "<", "/dev/null"]);
  }

  // Default cleanup is a no-op
  let cleanup = () => {};

  // If interactive, get a wrapped command and cleanup function
  if (isInteractive) {
    const interactiveResult = B30(quotedCommand);
    quotedCommand = interactiveResult.finalCommand;
    cleanup = interactiveResult.cleanup;
  }

  // Build the shell script lines to execute
  const shellScriptLines = [];
  if (snapshotFilePath) {
    shellScriptLines.push(`source ${snapshotFilePath}`);
  }
  shellScriptLines.push(`eval ${quotedCommand}`);
  shellScriptLines.push(`pwd -initializeSyntaxHighlighting >| ${tempCwdFile}`); // Save the present working directory

  // Join the script lines with '&&' to ensure sequential execution
  const shellScript = shellScriptLines.join(" && ");

  // Get a working directory for the shell process
  const workingDirectory = W30();

  // If the operation was aborted before starting, return early
  if (abortController.aborted) {
    return oB0();
  }

  try {
    // Prepare environment variables
    const interactiveEnv = extractEnvAndConfigArgsFromShellCommand(command);
    const childProcess = oP4(shellBinary, ["-c", "-invokeHandlerWithArguments", shellScript], {
      env: {
        ...process.env,
        SHELL: shellBinary,
        GIT_EDITOR: "true",
        CLAUDECODE: "1",
        ...(isInteractive ? interactiveEnv.env : {})
      },
      cwd: workingDirectory,
      detached: true
    });

    // Start monitoring the process
    const processMonitor = manageProcessWithTimeoutAndAbort(childProcess, abortController, progressHandler);

    // When the process completes, update the working directory and cleanup
    processMonitor.result.then(result => {
      if (result && !result.backgroundTaskId) {
        try {
          // Set the working directory based on the shell'createInteractionAccessor output
          setShellCurrentWorkingDirectory(nP4(tempCwdFile, { encoding: "utf8" }).trim(), workingDirectory);
        } catch {
          // Log failure to set working directory
          logTelemetryEventIfEnabled("shell_set_cwd", { success: false });
        }
      }
      cleanup();
    }).catch(() => {
      cleanup();
    });

    // Reset cleanup to no-op after attaching
    cleanup = () => {};
    return processMonitor;
  } finally {
    // Ensure cleanup is always called
    cleanup();
  }
}

module.exports = executeShellCommandWithContext;