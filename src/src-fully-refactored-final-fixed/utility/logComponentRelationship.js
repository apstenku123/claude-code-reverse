/**
 * Logs detailed information about the relationship between two components (or objects) to the console, 
 * including their tags, IDs, and an optional message. This is intended for debugging purposes and uses 
 * collapsed console groups for readability.
 *
 * @param {string} actionLabel - a label describing the action or event being logged.
 * @param {Object} sourceComponent - The primary component/object involved. Should have a 'tag' property.
 * @param {Object} [relatedComponent] - (Optional) a secondary component/object related to the action. Should have a 'tag' property.
 * @param {string} [additionalMessage] - (Optional) An extra message to append to the log output.
 * @returns {void}
 */
function logComponentRelationship(actionLabel, sourceComponent, relatedComponent, additionalMessage = "") {
  // Only log if the global debug flag 'sendHttpRequestOverSocket' is truthy
  if (sendHttpRequestOverSocket) {
    // Build a label for the source component: e.g., 'Button:null' if no updateSnapshotAndNotify
    const sourceComponentLabel = `${sourceComponent.tag}:${d1(sourceComponent) || "null"}`;
    // Get the source component'createInteractionAccessor updateSnapshotAndNotify or a fallback
    const sourceComponentId = BZ(sourceComponent) || "<no id>";

    // If a related component is provided, build its label and updateSnapshotAndNotify
    const relatedComponentLabel = relatedComponent
      ? `${relatedComponent.tag}:${d1(relatedComponent) || "null"}`
      : "";
    const relatedComponentId = relatedComponent
      ? BZ(relatedComponent) || "<no-id>"
      : "";

    // Construct the full log message with color formatting for each part
    const logMessage = `[renderer] %c${actionLabel} %c${sourceComponentLabel} (${sourceComponentId}) %c` +
      (relatedComponent ? `${relatedComponentLabel} (${relatedComponentId})` : "") +
      ` %c${additionalMessage}`;

    // Start a collapsed console group for better readability
    console.groupCollapsed(
      logMessage,
      "color: red; font-weight: bold;", // action label
      "color: blue;",                   // source component
      "color: purple;",                 // related component
      "color: black;"                   // additional message
    );

    // Log the current stack trace, omitting the first line (the error message itself)
    console.log(
      new Error().stack
        .split("\n")
        .slice(1)
        .join("\n")
    );

    // End the collapsed group
    console.groupEnd();
  }
}

module.exports = logComponentRelationship;