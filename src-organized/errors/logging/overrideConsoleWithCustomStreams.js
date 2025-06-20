/**
 * Overrides the global console methods with a custom Console instance that redirects stdout and stderr
 * to the provided handler. Returns a function to restore the original console methods.
 *
 * @param {function} outputHandler - Function to handle output. Receives ('stdout'|'stderr', string) as arguments.
 * @returns {function} - Cleanup function that restores the original console methods.
 */
function overrideConsoleWithCustomStreams(outputHandler) {
  // Create writable streams that redirect their output to the outputHandler
  const stdoutStream = new b30();
  const stderrStream = new b30();

  // Redirect writes to the outputHandler for stdout
  stdoutStream.write = (data) => {
    outputHandler('stdout', data);
  };

  // Redirect writes to the outputHandler for stderr
  stderrStream.write = (data) => {
    outputHandler('stderr', data);
  };

  // Create a new Console instance using the custom streams
  const customConsole = new console.Console(stdoutStream, stderrStream);

  // Save original console methods and override them with the custom console'createInteractionAccessor methods
  for (const methodName of g30) {
    vy1[methodName] = console[methodName];
    console[methodName] = customConsole[methodName];
  }

  // Return a cleanup function to restore the original console methods
  return function restoreConsoleMethods() {
    for (const methodName of g30) {
      console[methodName] = vy1[methodName];
    }
    vy1 = {};
  };
}

module.exports = overrideConsoleWithCustomStreams;