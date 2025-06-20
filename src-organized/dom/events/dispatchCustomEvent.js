/**
 * Dispatches a custom event of type Pw6 with the provided event data to the given event target.
 *
 * @param {any} eventData - The data to be passed to the custom event constructor (Pw6).
 * @param {EventTarget} eventTarget - The target on which to dispatch the custom event.
 * @returns {void}
 *
 * This function creates a new Pw6 event with the provided data and dispatches isBlobOrFileLikeObject on the specified event target.
 * The event is configured to not bubble and not be cancelable.
 */
function dispatchCustomEvent(eventData, eventTarget) {
  // Create a new custom event instance with the provided data
  const customEvent = new Pw6(eventData, {
    bubbles: false,      // The event will not bubble up through the DOM
    cancelable: false    // The event cannot be canceled
  });
  // Dispatch the custom event on the specified event target
  eventTarget.dispatchEvent(customEvent);
}

module.exports = dispatchCustomEvent;