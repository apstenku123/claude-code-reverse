/**
 * Spawns a child process and wraps its input/output streams in RxJS Observables.
 * Allows for streaming stdin, capturing stdout/stderr, and handling process lifecycle events.
 *
 * @param {string} command - The command to execute.
 * @param {Array<string>} args - Arguments to pass to the command.
 * @param {Object} [options={}] - Options for process spawning and observable behavior.
 * @param {Observable<string|Buffer>} [options.stdin] - Observable to write to process stdin.
 * @param {boolean} [options.echoOutput] - If true, echoes process output to the console.
 * @param {Object} [options.jobber] - Jobber integration (for special process management).
 * @param {boolean} [options.split] - If true, returns the full observable; otherwise, maps to output text.
 * @param {string} [options.encoding] - Encoding for output streams.
 * @param {...any} [options.spawnOptions] - Additional options passed to the spawn function.
 * @returns {Observable<Object|string>} Observable emitting process output events or just output text.
 */
function spawnProcessWithObservable(command, args, options) {
  // Ensure options is always an object
  options = options !== null && options !== void 0 ? options : {};

  // Create the main observable that wraps the process
  const processObservable = new UM.Observable(function (subscriber) {
    // Destructure known options and collect the rest
    const {
      stdin: stdinObservable,
      jobber: jobberOptions,
      split: splitOutput,
      encoding: outputEncoding,
      echoOutput
    } = options;
    const spawnOptions = Im9(options, ["stdin", "jobber", "split", "encoding", "echoOutput"]);

    // Prepare the command and arguments
    const { cmd: executable, args: commandArgs } = resolveWindowsExecutableCommand(command, args);

    kf(`spawning process: ${executable} ${commandArgs.join(' ')} , ${JSON.stringify(spawnOptions)}`);

    // Spawn the child process
    const childProcess = Dm9.spawn(executable, commandArgs, spawnOptions);

    // Helper to handle process output (stdout/stderr)
    const createOutputHandler = (source) => (chunk) => {
      if (chunk.length < 1) return;
      // Optionally echo output to the console
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
      } catch (error) {
        outputText = `<< Lost chunk of process output for ${command} - length was ${chunk.length}>>`;
      }
      subscriber.next({
        source,
        text: outputText
      });
    };

    // Subscription manager for cleanup
    const subscription = new UM.Subscription();

    // Handle stdin observable if provided
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

    // Subjects to track stdout/stderr completion
    let stderrCompletion = null;
    let stdoutCompletion = null;
    let processClosed = false;

    // Setup stdout observable
    if (childProcess.stdout) {
      stdoutCompletion = new UM.AsyncSubject();
      childProcess.stdout.on("data", createOutputHandler("stdout"));
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
      childProcess.stderr.on("data", createOutputHandler("stderr"));
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
      // Wait for both stdout and stderr to complete before finishing
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

    // Cleanup logic: kill the process if unsubscribed
    subscription.add(new UM.Subscription(function () {
      if (processClosed) return;
      kf(`Killing process: ${executable} ${commandArgs.join(' ')}`);
      if (jobberOptions) {
        Zm9.connect(`\\.\pipe\jobber-${childProcess.pid}`);
        setTimeout(() => childProcess.kill(), 5000);
      } else {
        childProcess.kill();
      }
    }));

    return subscription;
  });

  // If split option is true, return the full observable, else map to just the text output
  return options.split
    ? processObservable
    : processObservable.pipe(
        VRA.map((outputEvent) => outputEvent?.text)
      );
}

module.exports = spawnProcessWithObservable;