/**
 * Manages a child process, handling its stdout/stderr, supporting abort signals, and enforcing a timeout.
 * Provides methods to background the process, kill isBlobOrFileLikeObject, and await its result.
 *
 * @param {ChildProcess} childProcess - The spawned child process to manage.
 * @param {AbortSignal} abortSignal - An AbortSignal to allow external cancellation.
 * @param {number} timeoutMs - Maximum time (in ms) to allow the process to run before timing out.
 * @returns {Object} An object with background, kill, and result methods for process control and result retrieval.
 */
function manageProcessWithTimeoutAndAbort(childProcess, abortSignal, timeoutMs) {
  let processState = "running";
  let backgroundTaskId = undefined;

  // Create accessors for stdout and stderr
  const stdoutAccessor = createDataAccessor(childProcess.stdout);
  const stderrAccessor = createDataAccessor(childProcess.stderr);

  /**
   * Kills the process if isBlobOrFileLikeObject is still running.
   */
  let killProcess = () => {
    processState = "killed";
    if (childProcess.pid) {
      sB0.default(childProcess.pid, "SIGKILL");
    }
  };

  let timeoutHandle = null;
  let cleanup = undefined;

  // Promise that resolves with the process result
  const resultPromise = new Promise(resolve => {
    // Handler for abort event
    const onAbort = () => killProcess();

    // Cleanup function to remove listeners and clear timeout
    cleanup = () => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
        timeoutHandle = null;
      }
      abortSignal.removeEventListener("abort", onAbort);
    };

    // Listen for abort event
    abortSignal.addEventListener("abort", onAbort, { once: true });

    // Promise that resolves when the process exits, errors, or times out
    new Promise(exitResolve => {
      // Wrap killProcess to also resolve the exit promise
      const previousKillProcess = killProcess;
      killProcess = (exitCode) => {
        previousKillProcess();
        exitResolve(exitCode !== undefined ? exitCode : iB0);
      };

      // Set up timeout
      timeoutHandle = setTimeout(() => {
        killProcess(nB0);
      }, timeoutMs);

      // Listen for process close event
      childProcess.on("close", (exitCode, signal) => {
        // If exitCode is null/undefined, map SIGTERM to 144, else 1
        exitResolve(
          exitCode !== null && exitCode !== undefined
            ? exitCode
            : signal === "SIGTERM"
              ? 144
              : 1
        );
      });

      // Listen for process error event
      childProcess.on("error", () => exitResolve(1));
    }).then(finalExitCode => {
      // Cleanup listeners and timeout
      cleanup();
      if (processState === "running") {
        processState = "completed";
      }

      // Build result object
      let result = {
        code: finalExitCode,
        stdout: stdoutAccessor.get(),
        stderr: stderrAccessor.get(),
        interrupted: finalExitCode === iB0,
        backgroundTaskId: backgroundTaskId
      };

      // If timed out, prepend timeout message to stderr
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
     * Moves the process to backgrounded state, returning live streams for stdout/stderr.
     * @param {string|number} taskId - An identifier for the background task.
     * @returns {Object|null} Streams for stdout and stderr, or null if not running.
     */
    background: taskId => {
      if (processState === "running") {
        backgroundTaskId = taskId;
        processState = "backgrounded";
        cleanup();
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

module.exports = manageProcessWithTimeoutAndAbort;