/**
 * Creates an uncaught exception handler that captures exceptions, logs them, and optionally exits the process.
 *
 * @param {Object} client - The Sentry client instance used for capturing exceptions.
 * @param {Object} config - Configuration options for error handling.
 * @returns {Function} The uncaught exception handler function with an _errorHandler property.
 */
function createUncaughtExceptionHandler(client, config) {
  let hasHandledException = false;
  let fatalCallbackInvoked = false;
  let shutdownInProgress = false;
  let storedError;
  const clientOptions = client.getOptions();

  /**
   * Handles uncaught exceptions by capturing them, invoking fatal error callbacks, and exiting if necessary.
   *
   * @param {Error} error - The uncaught exception to handle.
   */
  function uncaughtExceptionHandler(error) {
    // Determine which fatal error callback to use
    let fatalErrorCallback = LZA.logAndExitProcess;
    if (config.onFatalError) {
      fatalErrorCallback = config.onFatalError;
    } else if (clientOptions.onFatalError) {
      fatalErrorCallback = clientOptions.onFatalError;
    }

    // Check if there are any other uncaughtException listeners registered (excluding known ones)
    const hasNoOtherHandlers = global.process.listeners("uncaughtException").reduce((handlerCount, listener) => {
      if (
        listener.name === "domainUncaughtExceptionClear" ||
        (listener.tag && listener.tag === "sentry_tracingErrorCallback") ||
        listener._errorHandler
      ) {
        return handlerCount;
      }
      return handlerCount + 1;
    }, 0) === 0;

    // Decide if handleMissingDoctypeError should exit even if other handlers are registered
    const shouldExit = config.exitEvenIfOtherHandlersAreRegistered || hasNoOtherHandlers;

    if (!hasHandledException) {
      // First uncaught exception
      storedError = error;
      hasHandledException = true;
      // Only capture if this client is the active Sentry client
      if (s91.getClient() === client) {
        s91.captureException(error, {
          originalException: error,
          captureContext: {
            level: "fatal"
          },
          mechanism: {
            handled: false,
            type: "onuncaughtexception"
          }
        });
      }
      // Call fatal error callback and exit if appropriate
      if (!shutdownInProgress && shouldExit) {
        shutdownInProgress = true;
        fatalErrorCallback(error);
      }
    } else if (shouldExit) {
      // Subsequent uncaught exceptions after shutdown initiated
      if (shutdownInProgress) {
        // Already shutting down, log a warning and force exit
        if (s79.DEBUG_BUILD) {
          a79.logger.warn(
            "uncaught exception after calling fatal error shutdown callback - this is bad! forcing shutdown"
          );
        }
        LZA.logAndExitProcess(error);
      } else if (!fatalCallbackInvoked) {
        // Schedule a delayed fatal error callback if not already invoked
        fatalCallbackInvoked = true;
        setTimeout(() => {
          if (!shutdownInProgress) {
            shutdownInProgress = true;
            fatalErrorCallback(storedError, error);
          }
        }, 2000);
      }
    }
  }

  // Attach a marker property so this handler can be identified
  return Object.assign(uncaughtExceptionHandler, {
    _errorHandler: true
  });
}

module.exports = createUncaughtExceptionHandler;