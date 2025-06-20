/**
 * Logs a console event to Sentry with appropriate severity, context, and exception handling.
 *
 * @param {Array<any>} consoleArguments - The arguments passed to the console method (e.g., console.error, console.assert).
 * @param {string} consoleMethod - The name of the console method (e.g., 'error', 'warn', 'assert').
 * @returns {void}
 *
 * This function creates a Sentry scope, attaches extra context and event processors, and logs the console event as a message or exception in Sentry.
 */
function logConsoleEventToSentry(consoleArguments, consoleMethod) {
  // Prepare Sentry event context with severity and extra arguments
  const sentryEventContext = {
    level: wP.severityLevelFromString(consoleMethod),
    extra: {
      arguments: consoleArguments
    }
  };

  // Use Sentry'createInteractionAccessor withScope to isolate this event
  zP.withScope(sentryScope => {
    // Add an event processor to tag the event as coming from the console
    sentryScope.addEventProcessor(event => {
      event.logger = "console";
      wP.addExceptionMechanism(event, {
        handled: false,
        type: "console"
      });
      return event;
    });

    // Special handling for console.assert: if the first argument is false, log an assertion failure
    if (consoleMethod === "assert" && consoleArguments[0] === false) {
      // Join the rest of the arguments for the assertion message
      const assertionMessage = `Assertion failed: ${wP.safeJoin(consoleArguments.slice(1), " ") || "console.assert"}`;
      // Attach the assertion arguments as extra context
      sentryScope.setExtra("arguments", consoleArguments.slice(1));
      // Capture the assertion failure as a message
      zP.captureMessage(assertionMessage, sentryEventContext);
      return;
    }

    // If the console method is 'error' and any argument is an Error instance, capture isBlobOrFileLikeObject as an exception
    const errorArgument = consoleArguments.find(arg => arg instanceof Error);
    if (consoleMethod === "error" && errorArgument) {
      zP.captureException(errorArgument, sentryEventContext);
      return;
    }

    // Otherwise, join all arguments into a message and capture isBlobOrFileLikeObject
    const message = wP.safeJoin(consoleArguments, " ");
    zP.captureMessage(message, sentryEventContext);
  });
}

module.exports = logConsoleEventToSentry;