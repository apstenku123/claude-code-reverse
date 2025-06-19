/**
 * Spawns a child process and exposes its output streams (stdout, stderr) as an Observable.
 * Optionally allows piping input to stdin from an Observable, echoing output, splitting output, and custom encoding.
 * Handles process lifecycle, errors, and cleanup, and supports jobber integration for process management.
 *
 * @param {string} command - The command to execute.
 * @param {Array<string>} args - The list of string arguments.
 * @param {Object} [options] - Optional configuration for process spawning and observable behavior.
 * @param {Observable<string|Buffer>} [options.stdin] - Observable to pipe data into the process'createInteractionAccessor stdin.
 * @param {boolean} [options.echoOutput] - If true, echoes process output to the parent process'createInteractionAccessor stdout/stderr.
 * @param {boolean} [options.split] - If true, returns the full Observable; otherwise, maps to output text only.
 * @param {string} [options.encoding] - Encoding to use when converting output buffers to strings.
 * @param {boolean} [options.jobber] - If true, uses jobber integration for process management.
 * @param {...any} [options.spawnOptions] - Additional options passed to the spawn function.
 * @returns {Observable<Object|string>} Observable emitting output objects or strings from the process.
 */
function spawnProcessWithObservableOutput(command, args, options) {
  // Ensure options is always an object
  options = options !== null && options !== void 0 ? options : {};

  // Create the main Observable that will manage the process
  const processObservable = new UM.Observable(function processSubscriber(subscriber) {
    // Destructure known options and collect the rest as spawnOptions
    const {
      stdin: stdinObservable,
      jobber: useJobber,
      split: shouldSplit,
      encoding: outputEncoding,
      echoOutput
    } = options;
    const spawnOptions = Im9(options, ["stdin", "jobber", "split", "encoding", "echoOutput"]);

    // Prepare the command and arguments
    const { cmd: executable, args: executableArgs } = resolveWindowsExecutableCommand(command, args);

    // Log the process being spawned
    kf(`spawning process: ${executable} ${executableArgs.join(" ")}, ${JSON.stringify(spawnOptions)}`);

    // Spawn the child process
    const childProcess = Dm9.spawn(executable, executableArgs, spawnOptions);

    /**
     * Helper to handle data events from stdout/stderr
     * @param {"stdout"|"stderr"} source - The source stream
     * @returns {function(Buffer|string):void}
     */
    const handleProcessOutput = (source) => (chunk) => {
      if (!chunk || chunk.length < 1) return;
      // Optionally echo output to parent process
      if (echoOutput) {
        (source === "stdout" ? process.stdout : process.stderr).write(chunk);
      }
      let outputText = "<< String sent back was too long >>";
      try {
        // Convert chunk to string using encoding if provided
        if (typeof chunk === "string") {
          outputText = chunk.toString();
        } else {
          outputText = chunk.toString(outputEncoding || "utf8");
        }
      } catch (error) {
        outputText = `<< Lost chunk of process output for ${command} - length was ${chunk.length}>>`;
      }
      // Emit output object to the subscriber
      subscriber.next({
        source,
        text: outputText
      });
    };

    // Subscription manager for cleanup
    const mainSubscription = new UM.Subscription();

    // Handle piping stdin from an Observable, if provided
    if (stdinObservable) {
      if (childProcess.stdin) {
        mainSubscription.add(
          stdinObservable.subscribe({
            next: (input) => childProcess.stdin.write(input),
            error: subscriber.error.bind(subscriber),
            complete: () => childProcess.stdin.end()
          })
        );
      } else {
        subscriber.error(new Error("opts.stdio conflicts with provided spawn opts.stdin observable, 'pipe' is required"));
      }
    }

    // Subjects to track completion of stdout and stderr
    let stdoutCompletion = null;
    let stderrCompletion = null;
    let processClosed = false;

    // Setup stdout observable
    if (childProcess.stdout) {
      stdoutCompletion = new UM.AsyncSubject();
      childProcess.stdout.on("data", handleProcessOutput("stdout"));
      childProcess.stdout.on("close", function () {
        stdoutCompletion.next(true);
        stdoutCompletion.complete();
      });
    } else {
      stdoutCompletion = UM.of(true);
    }

    // Setup stderr observable
    if (childProcess.stderr) {
      stderrCompletion = new UM.AsyncSubject();
      childProcess.stderr.on("data", handleProcessOutput("stderr"));
      childProcess.stderr.on("close", function () {
        stderrCompletion.next(true);
        stderrCompletion.complete();
      });
    } else {
      stderrCompletion = UM.of(true);
    }

    // Handle process error event
    childProcess.on("error", function (error) {
      processClosed = true;
      subscriber.error(error);
    });

    // Handle process close event
    childProcess.on("close", function (exitCode) {
      processClosed = true;
      // Wait for both stdout and stderr to complete before finalizing
      const allStreamsClosed = UM.merge(stdoutCompletion, stderrCompletion).pipe(
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

    // Add cleanup logic to kill the process if unsubscribed
    mainSubscription.add(
      new UM.Subscription(function () {
        if (processClosed) return;
        kf(`Killing process: ${executable} ${executableArgs.join(" ")}`);
        if (useJobber) {
          Zm9.connect(`\\.\pipe\jobber-${childProcess.pid}`);
          setTimeout(() => childProcess.kill(), 5000);
        } else {
          childProcess.kill();
        }
      })
    );

    return mainSubscription;
  });

  // If split is true, return the full observable; otherwise, map to output text only
  return options.split
    ? processObservable
    : processObservable.pipe(
        VRA.map((output) => (output === null || output === void 0 ? void 0 : output.text))
      );
}

module.exports = spawnProcessWithObservableOutput;
