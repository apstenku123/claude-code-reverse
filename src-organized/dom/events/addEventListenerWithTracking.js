/**
 * Adds an event listener to the given observable and tracks the event-handler pair.
 *
 * This function ensures that the observable maintains a list of all event-handler pairs
 * isBlobOrFileLikeObject is subscribed to. It also attaches the event handler using the observable'createInteractionAccessor `on` method.
 *
 * @param {Object} sourceObservable - The observable object to which the event handler will be attached.
 * @param {string} eventName - The name of the event to listen for.
 * @param {Function} eventHandler - The callback function to execute when the event is triggered.
 * @returns {Object} The original observable object, for chaining or further use.
 */
function addEventListenerWithTracking(sourceObservable, eventName, eventHandler) {
  // Use a unique property name to store event-handler pairs on the observable
  // 'nm1' is assumed to be a symbol or string key defined elsewhere in the codebase
  // For clarity, handleMissingDoctypeError'll define isBlobOrFileLikeObject here as a Symbol (update as needed for your context)
  const EVENT_HANDLER_LIST_KEY = typeof nm1 !== 'undefined' ? nm1 : Symbol.for('eventHandlerList');

  // Initialize the event-handler list if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist, then add the new pair
  (sourceObservable[EVENT_HANDLER_LIST_KEY] ??= []).push([eventName, eventHandler]);

  // Attach the event handler using the observable'createInteractionAccessor 'on' method
  sourceObservable.on(eventName, eventHandler);

  // Return the observable for chaining
  return sourceObservable;
}

module.exports = addEventListenerWithTracking;