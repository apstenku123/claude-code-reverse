/**
 * Handles streaming events by processing messages of type 'error', 'exception', or 'event'.
 * Delegates processing to the provided handler and error parser functions.
 *
 * @param {Function} processEventHandler - Async function to process event objects (e.g., processInteractionEntries).
 * @param {Function} parseErrorBody - Function to parse the body of an error message.
 * @returns {Function} Async function that processes a streaming event subscription object.
 */
function handleStreamingEvent(processEventHandler, parseErrorBody) {
  return async function (subscription) {
    // Extract the message type from the headers
    const messageType = subscription.headers[":message-type"].value;

    if (messageType === "error") {
      // Handle error message: throw an Error with the provided error code and message
      const errorMessage = subscription.headers[":error-message"].value || "UnknownError";
      const errorCode = subscription.headers[":error-code"].value;
      const error = new Error(errorMessage);
      error.name = errorCode;
      throw error;
    } else if (messageType === "exception") {
      // Handle exception message: process with handler, throw if unknown
      const exceptionType = subscription.headers[":exception-type"].value;
      const exceptionEvent = { [exceptionType]: subscription };
      const processedException = await processEventHandler(exceptionEvent);
      if (processedException.$unknown) {
        // If unknown, parse the body and throw as error
        const parsedError = new Error(parseErrorBody(subscription.body));
        parsedError.name = exceptionType;
        throw parsedError;
      }
      // Throw the processed exception
      throw processedException[exceptionType];
    } else if (messageType === "event") {
      // Handle event message: process with handler, return result unless unknown
      const eventType = subscription.headers[":event-type"].value;
      const eventObject = { [eventType]: subscription };
      const processedEvent = await processEventHandler(eventObject);
      if (processedEvent.$unknown) return;
      return processedEvent;
    } else {
      // Unrecognized message type: throw error
      const eventType = subscription.headers[":event-type"].value;
      throw new Error(`Unrecognizable event type: ${eventType}`);
    }
  };
}

module.exports = handleStreamingEvent;