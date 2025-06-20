/**
 * Spawns a child process with the given command and arguments, optionally piping input/output as observables.
 * Handles process lifecycle, error propagation, and output streaming with RxJS observables.
 *
 * @param {string} command - The command to execute.
 * @param {Array<string>} args - Arguments to pass to the command.
 * @param {Object} [options={}] - Options for process spawning and observable handling.
 * @param {Observable} [options.stdin] - Observable to pipe into the process'createInteractionAccessor stdin.
 * @param {boolean} [options.jobber] - Whether to use jobber IPC for process management.
 * @param {boolean} [options.split] - Whether to split output into objects with source/text or just text.
 * @param {string} [options.encoding] - Encoding for output streams.
 * @param {boolean} [options.echoOutput] - Whether to echo process output to the parent process'createInteractionAccessor stdout/stderr.
 * @returns {Observable} Observable that emits process output (as text or objects depending on split option).
 */
function mapSetTimeout(command, args, options) {
  options = options !== null && options !== void 0 ? options : {};

  // Create an observable that manages the process lifecycle
  const processObservable = new UM.Observable(function (subscriber) {
    // Destructure and extract known options
    const {
      stdin: stdinObservable,
      jobber: useJobber,
      split: splitOutput,
      encoding: outputEncoding,
      echoOutput
    } = options;
    // Remove known options from options object for passing to spawn
    const spawnOptions = Im9(options, ["stdin", "jobber", "split", "encoding", "echoOutput"]);
    // Prepare command and arguments
    const { cmd: executable, args: commandArgs } = resolveWindowsExecutableCommand(command, args);

    kf(`spawning process: ${executable} ${commandArgs.join()} , ${JSON.stringify(spawnOptions)}`);

    // Spawn the child process
    const childProcess = Dm9.spawn(executable, commandArgs, spawnOptions);

    /**
     * Helper to handle data events from stdout/stderr
     * @param {"stdout"|"stderr"} source - Source of the data
     * @returns {function(Buffer|string): void}
     */
    const handleOutput = (source) => (chunk) => {
      if (chunk.length < 1) return;
      // Optionally echo output to parent process
      if (echoOutput) {
        (source === "stdout" ? process.stdout : process.stderr).write(chunk);
      }
      let outputText = "<< String sent back was too long >>";
      try {
        if (typeof chunk === "string") {
          outputText = chunk.toString();
        } else {
          outputText = chunk.toString(outputEncoding || "utf8");
        }
      } catch (err) {
        outputText = `<< Lost chunk of process output for ${command} - length was ${chunk.length}>>`;
      }
      // Emit output with source and text
      subscriber.next({
        source,
        text: outputText
      });
    };

    // Subscription manager for cleanup
    const subscription = new UM.Subscription();

    // Handle stdin piping if provided
    if (stdinObservable) {
      if (childProcess.stdin) {
        subscription.add(stdinObservable.subscribe({
          next: (input) => childProcess.stdin.write(input),
          error: subscriber.error.bind(subscriber),
          complete: () => childProcess.stdin.end()
        }));
      } else {
        subscriber.error(new Error("opts.stdio conflicts with provided spawn opts.stdin observable, 'pipe' is required"));
      }
    }

    // Prepare subjects for stdout/stderr close events
    let stderrCloseSubject = null;
    let stdoutCloseSubject = null;
    let processClosed = false;

    // Handle stdout
    if (childProcess.stdout) {
      stdoutCloseSubject = new UM.AsyncSubject();
      childProcess.stdout.on("data", handleOutput("stdout"));
      childProcess.stdout.on("close", function () {
        stdoutCloseSubject.next(true);
        stdoutCloseSubject.complete();
      });
    } else {
      stdoutCloseSubject = UM.of(true);
    }

    // Handle stderr
    if (childProcess.stderr) {
      stderrCloseSubject = new UM.AsyncSubject();
      childProcess.stderr.on("data", handleOutput("stderr"));
      childProcess.stderr.on("close", function () {
        stderrCloseSubject.next(true);
        stderrCloseSubject.complete();
      });
    } else {
      stderrCloseSubject = UM.of(true);
    }

    // Handle process error event
    childProcess.on("error", function (error) {
      processClosed = true;
      subscriber.error(error);
    });

    // Handle process close event
    childProcess.on("close", function (exitCode) {
      processClosed = true;
      // Wait for both stdout and stderr to close
      const allStreamsClosed = UM.merge(stdoutCloseSubject, stderrCloseSubject).pipe(
        VRA.reduce((acc) => acc, true)
      );
      if (exitCode === 0) {
        allStreamsClosed.subscribe(() => subscriber.complete());
      } else {
        allStreamsClosed.subscribe(() => {
          const error = new Error(`Failed with exit code: ${exitCode}`);
          error.exitCode = exitCode;
          error.code = exitCode;
          subscriber.error(error);
        });
      }
    });

    // Add cleanup logic for unsubscription
    subscription.add(new UM.Subscription(function () {
      if (processClosed) return;
      kf(`Killing process: ${executable} ${commandArgs.join()}`);
      if (useJobber) {
        Zm9.connect(`\\.\pipe\jobber-${childProcess.pid}`);
        setTimeout(() => childProcess.kill(), 5000);
      } else {
        childProcess.kill();
      }
    }));

    return subscription;
  });

  // If split option is set, return full output objects; otherwise, map to just text
  return options.split ? processObservable : processObservable.pipe(
    VRA.map((output) => output === null || output === void 0 ? void 0 : output.text)
  );
}

module.exports = mapSetTimeout;