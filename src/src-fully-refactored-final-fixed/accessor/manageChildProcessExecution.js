/**
 * Manages the execution of a child process, handling stdout/stderr accumulation, timeouts, abort signals, and backgrounding.
 *
 * @param {ChildProcess} childProcess - The spawned child process to manage.
 * @param {AbortSignal} abortSignal - An AbortSignal to allow external cancellation of the process.
 * @param {number} timeoutMs - The maximum time (in milliseconds) to allow the process to run before timing out.
 * @returns {object} An object with methods to background, kill, and await the result of the process.
 */
function manageChildProcessExecution(childProcess, abortSignal, timeoutMs) {
  /**
   * Possible states: 'running', 'killed', 'completed', 'backgrounded'
   * @type {string}
   */
  let processState = "running";

  /**
   * Background task identifier (if backgrounded)
   * @type {any}
   */
  let backgroundTaskId;

  // Accessors for accumulating stdout and stderr data
  const stdoutAccessor = createDataAccessor(childProcess.stdout);
  const stderrAccessor = createDataAccessor(childProcess.stderr);

  /**
   * Kills the child process and updates state
   * @param {any} [reason] - Optional reason for killing
   */
  let killProcess = (reason) => {
    processState = "killed";
    if (childProcess.pid) {
      sB0.default(childProcess.pid, "SIGKILL");
    }
  };

  /**
   * Timeout handler
   * @type {NodeJS.Timeout|null}
   */
  let timeoutHandle = null;

  /**
   * Cleanup function to remove listeners and clear timeout
   */
  let cleanup;

  // Promise that resolves with the process result
  const resultPromise = new Promise(resolve => {
    // Handler for abort event
    const onAbort = () => killProcess();

    // Cleanup removes abort listener and timeout
    cleanup = () => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
        timeoutHandle = null;
      }
      abortSignal.removeEventListener("abort", onAbort);
    };

    // Listen for abort signal (once)
    abortSignal.addEventListener("abort", onAbort, { once: true });

    // Promise that resolves when process closes, errors, or times out
    new Promise(processExitResolve => {
      // Wrap killProcess to also resolve this promise
      const originalKill = killProcess;
      killProcess = (reason) => {
        originalKill();
        processExitResolve(reason || iB0); // iB0: interrupted code
      };

      // Set up timeout
      timeoutHandle = setTimeout(() => {
        killProcess(nB0); // nB0: timeout code
      }, timeoutMs);

      // Listen for process close
      childProcess.on("close", (exitCode, signal) => {
        // If exitCode is null/undefined, infer from signal
        processExitResolve(
          exitCode != null ? exitCode : (signal === "SIGTERM" ? 144 : 1)
        );
      });

      // Listen for process error
      childProcess.on("error", () => processExitResolve(1));
    }).then(finalCode => {
      // Cleanup listeners and timeout
      cleanup();
      if (processState === "running") processState = "completed";

      // Prepare result object
      let result = {
        code: finalCode,
        stdout: stdoutAccessor.get(),
        stderr: stderrAccessor.get(),
        interrupted: finalCode === iB0,
        backgroundTaskId: backgroundTaskId
      };

      // If timed out, prepend timeout message to stderr
      if (finalCode === nB0) {
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
     * Backgrounds the process, returning live streams for stdout/stderr.
     * @param {any} taskId - Identifier for the background task.
     * @returns {object|null} Streams or null if not running.
     */
    background: (taskId) => {
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

module.exports = manageChildProcessExecution;