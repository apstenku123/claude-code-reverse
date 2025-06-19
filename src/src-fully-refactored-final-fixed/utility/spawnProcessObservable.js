/**
 * Spawns a child process as an Observable, streaming stdout/stderr and handling stdin as an Observable.
 *
 * @param {string} command - The command to run.
 * @param {Array<string>} args - Array of arguments for the command.
 * @param {Object} [options={}] - Options for process spawning and observable behavior.
 * @param {Observable} [options.stdin] - Observable to write to the process'createInteractionAccessor stdin.
 * @param {boolean} [options.echoOutput] - If true, echoes process output to the current process'createInteractionAccessor stdout/stderr.
 * @param {string} [options.encoding] - Encoding for output text conversion.
 * @param {boolean} [options.split] - If true, returns the full Observable; otherwise, maps to output text only.
 * @param {Object} [options.jobber] - If present, uses jobber for process management.
 * @returns {Observable} Observable emitting process output objects or strings.
 */
function spawnProcessObservable(command, args, options) {
  options = options !== null && options !== void 0 ? options : {};

  // Create the Observable that will manage the process
  const processObservable = new UM.Observable(function (observer) {
    const {
      stdin: stdinObservable,
      jobber,
      split,
      encoding
    } = options;
    // Remove known keys from options to pass the rest to spawn
    const spawnOptions = Im9(options, ["stdin", "jobber", "split", "encoding"]);

    // Prepare command and arguments
    const { cmd: executable, args: spawnArgs } = resolveWindowsExecutableCommand(command, args);

    kf(`spawning process: ${executable} ${spawnArgs.join()} , ${JSON.stringify(spawnOptions)}`);

    // Spawn the child process
    const childProcess = Dm9.spawn(executable, spawnArgs, spawnOptions);

    /**
     * Helper to handle data events from stdout/stderr
     * @param {"stdout"|"stderr"} source - Source stream
     * @returns {function(Buffer|string):void}
     */
    const handleProcessOutput = function (source) {
      return function (chunk) {
        if (chunk.length < 1) return;
        // Optionally echo output to process stdout/stderr
        if (options.echoOutput) {
          (source === "stdout" ? process.stdout : process.stderr).write(chunk);
        }
        let outputText = "<< String sent back was too long >>";
        try {
          // Convert chunk to string with encoding if needed
          if (typeof chunk === "string") {
            outputText = chunk.toString();
          } else {
            outputText = chunk.toString(encoding || "utf8");
          }
        } catch (error) {
          outputText = `<< Lost chunk of process output for ${command} - length was ${chunk.length}>>`;
        }
        observer.next({
          source,
          text: outputText
        });
      };
    };

    // Subscription manager for cleanup
    const subscription = new UM.Subscription();

    // Handle stdin as an Observable if provided
    if (options.stdin) {
      if (childProcess.stdin) {
        subscription.add(
          options.stdin.subscribe({
            next: (input) => childProcess.stdin.write(input),
            error: observer.error.bind(observer),
            complete: () => childProcess.stdin.end()
          })
        );
      } else {
        observer.error(new Error("opts.stdio conflicts with provided spawn opts.stdin observable, 'pipe' is required"));
      }
    }

    // AsyncSubjects to track completion of stdout/stderr
    let stderrCompletion = null;
    let stdoutCompletion = null;
    let processClosed = false;

    // Setup stdout Observable
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

    // Setup stderr Observable
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
      observer.error(error);
    });

    // Handle process close event
    childProcess.on("close", function (exitCode) {
      processClosed = true;
      // Wait for both stdout and stderr to complete
      const completion = UM.merge(stdoutCompletion, stderrCompletion).pipe(
        VRA.reduce((acc) => acc, true)
      );
      if (exitCode === 0) {
        // Success: complete the observer
        completion.subscribe(() => observer.complete());
      } else {
        // Failure: emit error with exit code
        completion.subscribe(() => {
          const error = new Error(`Failed with exit code: ${exitCode}`);
          error.exitCode = exitCode;
          error.code = exitCode;
          observer.error(error);
        });
      }
    });

    // Add cleanup logic to kill the process if unsubscribed before close
    subscription.add(
      new UM.Subscription(function () {
        if (processClosed) return;
        kf(`Killing process: ${executable} ${spawnArgs.join()}`);
        if (options.jobber) {
          Zm9.connect(`\\.\pipe\jobber-${childProcess.pid}`);
          setTimeout(() => childProcess.kill(), 5000);
        } else {
          childProcess.kill();
        }
      })
    );

    return subscription;
  });

  // If split option is set, return the full output objects; otherwise, map to text only
  return options.split
    ? processObservable
    : processObservable.pipe(
        VRA.map((output) => output === null || output === void 0 ? void 0 : output.text)
      );
}

module.exports = spawnProcessObservable;
