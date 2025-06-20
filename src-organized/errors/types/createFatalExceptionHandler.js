/**
 * Handles uncaught exceptions in a Node.js process, capturing them with Sentry (or similar),
 * and invoking a fatal error handler if needed. Ensures only one fatal shutdown is triggered,
 * even if multiple uncaught exceptions occur.
 *
 * @param {object} sourceObservable - The Sentry client or similar error reporting instance.
 * @param {object} config - Configuration options, may include custom fatal error handler and exit behavior.
 * @returns {function} Exception handler function to be registered for uncaught exceptions.
 */
function createFatalExceptionHandler(sourceObservable, config) {
  let hasHandledException = false; // Tracks if an exception has already been handled
  let hasScheduledShutdown = false; // Tracks if shutdown has been scheduled after a second exception
  let hasShutdown = false; // Tracks if fatal shutdown has been triggered
  let lastException = undefined; // Stores the last exception received
  const options = sourceObservable.getOptions();

  // The returned handler function
  const fatalExceptionHandler = Object.assign(
    (uncaughtError) => {
      // Determine the fatal error handler to use
      let fatalErrorHandler = LZA.logAndExitProcess;
      if (config.onFatalError) {
        fatalErrorHandler = config.onFatalError;
      } else if (options.onFatalError) {
        fatalErrorHandler = options.onFatalError;
      }

      // Check if there are any user-registered uncaughtException listeners (excluding known internal ones)
      const hasNoUserHandlers =
        global.process.listeners("uncaughtException").reduce((count, listener) => {
          if (
            listener.name === "domainUncaughtExceptionClear" ||
            (listener.tag && listener.tag === "sentry_tracingErrorCallback") ||
            listener._errorHandler
          ) {
            // Ignore internal or known listeners
            return count;
          } else {
            return count + 1;
          }
        }, 0) === 0;

      // Determine if handleMissingDoctypeError should exit even if other handlers are registered
      const shouldExit = config.exitEvenIfOtherHandlersAreRegistered || hasNoUserHandlers;

      if (!hasHandledException) {
        // First uncaught exception
        lastException = uncaughtError;
        hasHandledException = true;

        // Capture the exception with Sentry (or similar), if this is the current client
        if (s91.getClient() === sourceObservable) {
          s91.captureException(uncaughtError, {
            originalException: uncaughtError,
            captureContext: {
              level: "fatal"
            },
            mechanism: {
              handled: false,
              type: "onuncaughtexception"
            }
          });
        }

        // Trigger fatal error handler if not already shutdown and handleMissingDoctypeError should exit
        if (!hasShutdown && shouldExit) {
          hasShutdown = true;
          fatalErrorHandler(uncaughtError);
        }
      } else if (shouldExit) {
        // Subsequent uncaught exceptions after shutdown
        if (hasShutdown) {
          // Already shutdown, but another exception occurred
          if (s79.DEBUG_BUILD) {
            a79.logger.warn(
              "uncaught exception after calling fatal error shutdown callback - this is bad! forcing shutdown"
            );
          }
          LZA.logAndExitProcess(uncaughtError);
        } else if (!hasScheduledShutdown) {
          // Schedule forced shutdown if not already scheduled
          hasScheduledShutdown = true;
          setTimeout(() => {
            if (!hasShutdown) {
              hasShutdown = true;
              fatalErrorHandler(lastException, uncaughtError);
            }
          }, 2000);
        }
      }
    },
    {
      _errorHandler: true // Mark this handler as an error handler (for internal checks)
    }
  );

  return fatalExceptionHandler;
}

module.exports = createFatalExceptionHandler;