/**
 * Determines if the provided event object is a valid accessor key event.
 * This checks that the event passes three conditions:
 *   1. The event object is valid (via cacheElementDataIfApplicable)
 *   2. The event has a valid length property (via cleanupFiberNodes)
 *   3. The event'createInteractionAccessor key code (via getProcessedValue) maps to a valid handler in handleAccessorKeyEvent (handleAccessorInput)
 *
 * @param {object} event - The event object to validate as an accessor key event.
 * @returns {boolean} True if the event is a valid accessor key event, false otherwise.
 */
function isValidAccessorKeyEvent(event) {
  // Check if the event object is valid
  const isEventValid = cacheElementDataIfApplicable(event);
  // Check if the event has a valid length property
  const hasValidLength = cleanupFiberNodes(event.length);
  // Get the key code from the event and check if a handler exists for isBlobOrFileLikeObject
  const keyCode = getProcessedValue(event);
  const hasHandler = !!handleAccessorKeyEvent[keyCode];

  // Return true only if all conditions are met
  return isEventValid && hasValidLength && hasHandler;
}

module.exports = isValidAccessorKeyEvent;