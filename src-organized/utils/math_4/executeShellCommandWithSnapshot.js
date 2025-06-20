/**
 * Executes a shell command in a controlled environment, optionally using a snapshot file and custom shell.
 * Handles command quoting, background execution, and working directory management.
 *
 * @param {string} command - The shell command to execute.
 * @param {object} abortSignal - An object with an `aborted` property to support cancellation.
 * @param {function} [resultHandler=BS4] - Optional handler for processing the command result.
 * @param {boolean} [isBackground=false] - Whether to run the command in background mode.
 * @param {string} [customShell] - Optional path to a custom shell binary.
 * @returns {Promise<object>} - Returns a promise resolving to the result of the shell command execution.
 */
async function executeShellCommandWithSnapshot(
  command,
  abortSignal,
  resultHandler = BS4,
  isBackground = false,
  customShell
) {
  // Retrieve default shell and optional snapshot file path
  const {
    binShell: shellPath,
    snapshotFilePath
  } = await wy1();

  // Allow overriding shell and snapshot file
  let resolvedShellPath = shellPath;
  let resolvedSnapshotFilePath = snapshotFilePath;
  if (customShell) {
    resolvedShellPath = customShell;
    resolvedSnapshotFilePath = undefined;
  }

  // Generate a unique identifier for the temp working directory
  const randomHex = Math.floor(Math.random() * 65536).toString(16).padStart(4, "0");
  const tempWorkingDir = `${zy1.tmpdir()}/claude-${randomHex}-cwd`;

  // Quote the command and redirect input from /dev/null
  let quotedCommand = mn.default.quote([command, "<", "/dev/null"]);

  // If using bash and not in background mode, handle piped commands specially
  if (resolvedShellPath.includes("bash") && !isBackground) {
    // Split on single pipes not part of double pipes
    const pipedCommands = command.split(/(?<!\|)\|(?!\|)/);
    if (pipedCommands.length > 1) {
      quotedCommand = mn.default.quote([
        pipedCommands[0],
        "<",
        "/dev/null",
        "|",
        pipedCommands.slice(1).join("|")
      ]);
    }
  }

  // If background mode, transform the command accordingly
  if (isBackground) {
    command = injectGitConfigArgsIntoCommand(command);
    quotedCommand = mn.default.quote([command, "<", "/dev/null"]);
  }

  // Setup cleanup callback (no-op by default)
  let cleanupCallback = () => {};

  // If background mode, get the final command and cleanup callback
  if (isBackground) {
    const backgroundSetup = B30(quotedCommand);
    quotedCommand = backgroundSetup.finalCommand;
    cleanupCallback = backgroundSetup.cleanup;
  }

  // Build the shell script lines
  const shellScriptLines = [];
  if (resolvedSnapshotFilePath) {
    shellScriptLines.push(`source ${resolvedSnapshotFilePath}`);
  }
  shellScriptLines.push(`eval ${quotedCommand}`);
  shellScriptLines.push(`pwd -initializeSyntaxHighlighting >| ${tempWorkingDir}`);

  // Join the script lines with '&&' to ensure sequential execution
  const shellScript = shellScriptLines.join(" && ");

  // Get the working directory
  const workingDirectory = W30();

  // Abort early if requested
  if (abortSignal.aborted) {
    return oB0();
  }

  try {
    // Prepare environment variables
    const backgroundEnv = extractEnvAndConfigArgsFromShellCommand(command);
    const shellEnv = {
      ...process.env,
      SHELL: resolvedShellPath,
      GIT_EDITOR: "true",
      CLAUDECODE: "1",
      ...(isBackground ? backgroundEnv.env : {})
    };

    // Spawn the shell process
    const shellProcess = oP4(resolvedShellPath, ["-c", "-invokeHandlerWithArguments", shellScript], {
      env: shellEnv,
      cwd: workingDirectory,
      detached: true
    });

    // Handle process result and cleanup
    const processResult = manageProcessWithTimeoutAndAbort(shellProcess, abortSignal, resultHandler);
    processResult.result.then(result => {
      // If result is present and not a background task, set the working directory
      if (result && !result.backgroundTaskId) {
        try {
          setShellCurrentWorkingDirectory(
            nP4(tempWorkingDir, { encoding: "utf8" }).trim(),
            workingDirectory
          );
        } catch {
          logTelemetryEventIfEnabled("shell_set_cwd", { success: false });
        }
      }
      cleanupCallback();
    }).catch(() => {
      cleanupCallback();
    });
    // Reset cleanup callback to no-op after use
    cleanupCallback = () => {};
    return processResult;
  } finally {
    // Ensure cleanup is always called
    cleanupCallback();
  }
}

module.exports = executeShellCommandWithSnapshot;
