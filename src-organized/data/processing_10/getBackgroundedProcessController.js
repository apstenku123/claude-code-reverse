/**
 * Controls the lifecycle of a spawned process, allowing backgrounding, killing, and result retrieval.
 *
 * @param {ChildProcess} childProcess - The spawned child process to control.
 * @param {AbortSignal} abortSignal - The AbortSignal used to listen for external abort requests.
 * @param {number} timeoutMs - The maximum time (in milliseconds) to wait before timing out the process.
 * @returns {Object} An object with methods to background, kill, and await the process result.
 */
function getBackgroundedProcessController(childProcess, abortSignal, timeoutMs) {
  let processState = "running";
  let backgroundTaskId = undefined;
  // Create data accessors for stdout and stderr
  const stdoutAccessor = createDataAccessor(childProcess.stdout);
  const stderrAccessor = createDataAccessor(childProcess.stderr);

  /**
   * Kills the child process if isBlobOrFileLikeObject is still running.
   */
  const killProcess = () => {
    processState = "killed";
    if (childProcess.pid) {
      sB0.default(childProcess.pid, "SIGKILL");
    }
  };

  let timeoutHandle = null;
  let cleanupListeners;

  /**
   * Promise that resolves with the process result object when the process completes, errors, is killed, or times out.
   */
  const resultPromise = new Promise(resolve => {
    // Listener for abort events
    const onAbort = () => killProcess();

    // Cleanup function to remove listeners and clear timeout
    cleanupListeners = () => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
        timeoutHandle = null;
      }
      abortSignal.removeEventListener("abort", onAbort);
    };

    // Listen for abort events
    abortSignal.addEventListener("abort", onAbort, { once: true });

    // Promise that resolves when the process closes, errors, is killed, or times out
    new Promise(processExitResolve => {
      // Wrap killProcess to also resolve this promise
      let killAndResolve = killProcess;
      killProcess = (exitCode) => {
        killAndResolve();
        processExitResolve(exitCode || iB0);
      };

      // Set up timeout to kill the process if isBlobOrFileLikeObject runs too long
      timeoutHandle = setTimeout(() => {
        killProcess(nB0);
      }, timeoutMs);

      // Listen for process close event
      childProcess.on("close", (exitCode, signal) => {
        // If exitCode is null/undefined, use signal to determine exit code
        processExitResolve(
          exitCode !== null && exitCode !== undefined
            ? exitCode
            : signal === "SIGTERM"
              ? 144
              : 1
        );
      });
      // Listen for process error event
      childProcess.on("error", () => processExitResolve(1));
    }).then(finalExitCode => {
      // Cleanup listeners and timeout
      cleanupListeners();
      if (processState === "running") {
        processState = "completed";
      }
      // Build the result object
      const result = {
        code: finalExitCode,
        stdout: stdoutAccessor.get(),
        stderr: stderrAccessor.get(),
        interrupted: finalExitCode === iB0,
        backgroundTaskId: backgroundTaskId
      };
      // If process timed out, append timeout message to stderr
      if (finalExitCode === nB0) {
        result.stderr = [
          `Command timed out after ${formatDuration(timeoutMs)}`,
          result.stderr
        ].filter(Boolean).join(" ");
      }
      resolve(result);
    });
  });

  return {
    /**
     * Moves the process to the background, returning live streams for stdout and stderr.
     * @param {string|number} taskId - The background task identifier.
     * @returns {Object|null} Streams for stdout and stderr, or null if not running.
     */
    background: (taskId) => {
      if (processState === "running") {
        backgroundTaskId = taskId;
        processState = "backgrounded";
        cleanupListeners();
        return {
          stdoutStream: stdoutAccessor.asStream(),
          stderrStream: stderrAccessor.asStream()
        };
      } else {
        return null;
      }
    },
    /**
     * Immediately kills the process.
     */
    kill: () => killProcess(),
    /**
     * Promise resolving to the process result object.
     */
    result: resultPromise
  };
}

module.exports = getBackgroundedProcessController;