/**
 * Processes an incoming event stream message and handles isBlobOrFileLikeObject according to its type (error, exception, event).
 * Delegates processing to the provided handler functions and throws or returns as appropriate.
 *
 * @param {Function} processEventHandler - Async function to process event or exception objects.
 * @param {Function} parseErrorBody - Function to parse the body of an unknown exception.
 * @returns {Function} Async function that processes a single event stream message object.
 */
function handleEventStreamMessage(processEventHandler, parseErrorBody) {
  return async function (eventStreamMessage) {
    // Extract the message type from the headers
    const messageTypeHeader = eventStreamMessage.headers[":message-type"];
    const messageType = messageTypeHeader.value;

    if (messageType === "error") {
      // Handle error message type
      const errorMessage = eventStreamMessage.headers[":error-message"].value || "UnknownError";
      const errorCode = eventStreamMessage.headers[":error-code"].value;
      const error = new Error(errorMessage);
      error.name = errorCode;
      throw error;
    } else if (messageType === "exception") {
      // Handle exception message type
      const exceptionType = eventStreamMessage.headers[":exception-type"].value;
      const exceptionObject = {
        [exceptionType]: eventStreamMessage
      };
      // Delegate to the provided handler
      const processedException = await processEventHandler(exceptionObject);
      if (processedException.$unknown) {
        // If the exception is unknown, parse the body and throw an error
        const unknownError = new Error(parseErrorBody(eventStreamMessage.body));
        unknownError.name = exceptionType;
        throw unknownError;
      }
      // Throw the processed exception
      throw processedException[exceptionType];
    } else if (messageType === "event") {
      // Handle event message type
      const eventType = eventStreamMessage.headers[":event-type"].value;
      const eventObject = {
        [eventType]: eventStreamMessage
      };
      // Delegate to the provided handler
      const processedEvent = await processEventHandler(eventObject);
      if (processedEvent.$unknown) {
        // If the event is unknown, do not return anything
        return;
      }
      // Return the processed event
      return processedEvent;
    } else {
      // Unrecognized message type
      const eventType = eventStreamMessage.headers[":event-type"]?.value;
      throw new Error(`Unrecognizable event type: ${eventType}`);
    }
  };
}

module.exports = handleEventStreamMessage;