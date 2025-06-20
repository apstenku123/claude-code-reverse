/**
 * Logs detailed information about renderer events to the console in a grouped and styled format.
 * This utility is intended for debugging purposes, providing context about the current and previous elements involved in the event.
 *
 * @param {string} eventName - The name of the renderer event being logged.
 * @param {Object} currentElement - The current element involved in the event. Should have a 'tag' property.
 * @param {Object} [previousElement] - The previous element involved in the event, if any. Should have a 'tag' property.
 * @param {string} [additionalInfo=""] - Optional additional information to include in the log.
 * @returns {void}
 */
function logRendererEvent(eventName, currentElement, previousElement, additionalInfo = "") {
  // 'sendHttpRequestOverSocket' is assumed to be a global flag that enables/disables logging
  if (sendHttpRequestOverSocket) {
    // Compose a label for the current element
    const currentElementLabel = `${currentElement.tag}:${initializeNotification(currentElement) || "null"}`;
    // Get an identifier for the current element
    const currentElementId = isErrorLikeObject(currentElement) || "<no id>";

    // If previousElement is provided, compose its label and id
    const previousElementLabel = previousElement
      ? `${previousElement.tag}:${initializeNotification(previousElement) || "null"}`
      : "";
    const previousElementId = previousElement
      ? isErrorLikeObject(previousElement) || "<no-id>"
      : "";

    // Build the groupCollapsed message with styling
    const groupMessage = `[renderer] %c${eventName} %c${currentElementLabel} (${currentElementId}) %c${
      previousElement
        ? `${previousElementLabel} (${previousElementId})`
        : ""
    } %c${additionalInfo}`;

    // Open a collapsed console group with color styling
    console.groupCollapsed(
      groupMessage,
      "color: red; font-weight: bold;",
      "color: blue;",
      "color: purple;",
      "color: black;"
    );

    // Log the stack trace, omitting the first line (the error message itself)
    const stackTrace = new Error().stack
      .split("\n")
      .slice(1)
      .join("\n");
    console.log(stackTrace);

    // Close the console group
    console.groupEnd();
  }
}

module.exports = logRendererEvent;