/**
 * Creates a shell snapshot by running a shell command and saving the output to a temporary file.
 *
 * This function generates a unique filename in the system'createInteractionAccessor temporary directory, verifies the shell binary,
 * and attempts to create a shell snapshot using external helper functions. It reports success or failure
 * through telemetry and error logging.
 *
 * @returns {Promise<string|undefined>} Resolves with the snapshot file path if successful, otherwise undefined.
 */
function createShellSnapshot() {
  // Generate a random 4-digit hexadecimal string for uniqueness
  const randomHex = Math.floor(Math.random() * 65536).toString(16).padStart(4, "0");
  // Get the shell binary path (e.g., '/bin/bash')
  const shellBinary = Y30();
  // Construct the snapshot file path in the system'createInteractionAccessor temp directory
  const snapshotFilePath = `${zy1.tmpdir()}/claude-shell-snapshot-${randomHex}`;

  return new Promise(resolve => {
    try {
      // Validate the shell binary path
      const shellBinaryStats = D30(shellBinary);
      if (!I30(shellBinaryStats)) {
        // Shell binary is invalid or does not exist
        resolve(undefined);
        return;
      }

      // Prepare the shell command script and arguments
      const shellScriptPath = generateShellSnapshotScript(shellBinary, snapshotFilePath);
      rP4(
        shellBinary,
        ["-c", "-invokeHandlerWithArguments", shellScriptPath],
        {
          env: {
            // Optionally inherit environment variables
            ...(process.env.CLAUDE_CODE_DONT_INHERIT_ENV ? {} : process.env),
            SHELL: shellBinary,
            GIT_EDITOR: "true",
            CLAUDECODE: "1"
          },
          timeout: 10000, // 10 seconds
          maxBuffer: 1048576 // 1 MB
        },
        (error, stdout, stderr) => {
          if (error) {
            // Log error and send telemetry for failure
            reportErrorIfAllowed(new Error(`Failed to create shell snapshot: ${stderr}`));
            logTelemetryEventIfEnabled("shell_snapshot_failed", { stderr_length: stderr.length });
            resolve(undefined);
          } else if (I30(snapshotFilePath)) {
            // Snapshot file was created successfully
            const snapshotSize = aP4(snapshotFilePath).size;
            logTelemetryEventIfEnabled("shell_snapshot_created", { snapshot_size: snapshotSize });
            resolve(snapshotFilePath);
          } else {
            // Unknown error: file not created
            logTelemetryEventIfEnabled("shell_unknown_error", {});
            resolve(undefined);
          }
        }
      );
    } catch (caughtError) {
      // Handle unexpected errors
      reportErrorIfAllowed(caughtError instanceof Error ? caughtError : new Error(String(caughtError)));
      logTelemetryEventIfEnabled("shell_snapshot_error", {});
      resolve(undefined);
    }
  });
}

module.exports = createShellSnapshot;