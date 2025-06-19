/**
 * Manages the execution of a child process with support for backgrounding, killing, and result collection.
 * Handles stdout/stderr buffering, process timeouts, abort signals, and background task tracking.
 *
 * @param {ChildProcess} childProcess - The spawned child process to manage.
 * @param {AbortSignal} abortSignal - Signal to listen for abort events (e.g., user cancellation).
 * @param {number} timeoutMs - Maximum allowed execution time in milliseconds before forceful termination.
 * @returns {Object} An object with methods to background, kill, and await the process result.
 */
function getBackgrounded(childProcess, abortSignal, timeoutMs) {
  let processState = "running";
  let backgroundTaskId = undefined;
  const stdoutAccessor = createDataAccessor(childProcess.stdout);
  const stderrAccessor = createDataAccessor(childProcess.stderr);

  /**
   * Kills the child process if isBlobOrFileLikeObject'createInteractionAccessor still running.
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
   * Promise that resolves with the process result object when the process completes, errors, or is killed.
   */
  const resultPromise = new Promise(resolve => {
    // Handler to cleanup listeners and timeout
    cleanupListeners = () => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
        timeoutHandle = null;
      }
      abortSignal.removeEventListener("abort", onAbort);
    };

    // Abort event handler
    const onAbort = () => killProcess();
    abortSignal.addEventListener("abort", onAbort, { once: true });

    // Promise that resolves when the process ends (close, error, or timeout)
    new Promise(processDone => {
      // Wrap killProcess to also resolve the done promise
      let killAndResolve = killProcess;
      killProcess = (exitCode) => {
        killAndResolve();
        processDone(exitCode || iB0);
      };

      // Set up timeout to kill process if isBlobOrFileLikeObject runs too long
      timeoutHandle = setTimeout(() => {
        killProcess(nB0);
      }, timeoutMs);

      // Listen for process close event
      childProcess.on("close", (exitCode, signal) => {
        // If exitCode is null/undefined, map SIGTERM to 144, otherwise default to 1
        processDone(
          exitCode !== null && exitCode !== undefined
            ? exitCode
            : signal === "SIGTERM"
              ? 144
              : 1
        );
      });

      // Listen for process error event
      childProcess.on("error", () => processDone(1));
    }).then(finalExitCode => {
      cleanupListeners();
      if (processState === "running") {
        processState = "completed";
      }
      const result = {
        code: finalExitCode,
        stdout: stdoutAccessor.get(),
        stderr: stderrAccessor.get(),
        interrupted: finalExitCode === iB0,
        backgroundTaskId
      };
      // If process timed out, prepend timeout message to stderr
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
     * Moves the process to backgrounded state, returning live stdout/stderr streams.
     * @param {string} taskId - Identifier for the background task.
     * @returns {Object|null} Streams if backgrounded, otherwise null.
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

module.exports = getBackgrounded;