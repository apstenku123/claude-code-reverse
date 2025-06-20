/**
 * Logs a console event to Sentry with appropriate severity, context, and exception handling.
 * Handles special cases for console.assert and console.error with Error objects.
 *
 * @param {Array<any>} consoleArguments - The arguments passed to the console method (e.g., console.error, console.assert).
 * @param {string} consoleMethod - The name of the console method invoked (e.g., 'error', 'assert').
 * @returns {void}
 */
function logConsoleEventWithSentry(consoleArguments, consoleMethod) {
  // Prepare Sentry event context with severity and extra arguments
  const sentryEventContext = {
    level: wP.severityLevelFromString(consoleMethod),
    extra: {
      arguments: consoleArguments
    }
  };

  // Use Sentry'createInteractionAccessor withScope to isolate event context
  zP.withScope(scope => {
    // Add a processor to tag the event as coming from the console and mark as unhandled
    scope.addEventProcessor(event => {
      event.logger = "console";
      wP.addExceptionMechanism(event, {
        handled: false,
        type: "console"
      });
      return event;
    });

    // Special handling for console.assert: only log if assertion failed (first arg is false)
    if (consoleMethod === "assert" && consoleArguments[0] === false) {
      // Create assertion failure message, joining remaining arguments
      const assertionMessage = `Assertion failed: ${wP.safeJoin(consoleArguments.slice(1), " ") || "console.assert"}`;
      // Attach the failed assertion arguments as extra context
      scope.setExtra("arguments", consoleArguments.slice(1));
      // Capture the assertion failure as a message in Sentry
      zP.captureMessage(assertionMessage, sentryEventContext);
      return;
    }

    // If console.error was called and any argument is an Error, capture isBlobOrFileLikeObject as an exception
    const errorArgument = consoleArguments.find(arg => arg instanceof Error);
    if (consoleMethod === "error" && errorArgument) {
      zP.captureException(errorArgument, sentryEventContext);
      return;
    }

    // For all other cases, join the arguments and capture as a message
    const message = wP.safeJoin(consoleArguments, " ");
    zP.captureMessage(message, sentryEventContext);
  });
}

module.exports = logConsoleEventWithSentry;