/**
 * Determines if the given event object represents a 'TAB_CLOSED' result event.
 *
 * @param {object} event - The event object to check. Expected to have a 'type' property and a 'data' array.
 * @returns {boolean} True if the event is a 'result' type with a first data entry indicating a closed tab; otherwise, false.
 */
function isTabClosedResultEvent(event) {
  // Check if the event type is 'result'
  const isResultType = event.type === "result";

  // Ensure event.data is an array
  const hasDataArray = Array.isArray(event.data);

  // Check if the first item in data exists and is a non-null object
  const hasFirstDataObject =
    hasDataArray && typeof event.data[0] === "object" && event.data[0] !== null;

  // Check if the first data object has a 'type' property equal to 'text'
  const hasTextType =
    hasFirstDataObject && "type" in event.data[0] && event.data[0].type === "text";

  // Check if the first data object has a 'text' property equal to 'TAB_CLOSED'
  const hasTabClosedText =
    hasTextType && "text" in event.data[0] && event.data[0].text === "TAB_CLOSED";

  // Return true only if all conditions are met
  return isResultType && hasDataArray && hasFirstDataObject && hasTextType && hasTabClosedText;
}

module.exports = isTabClosedResultEvent;
