/**
 * Registers an event handler for a given event on the source object, stores the handler entry,
 * and returns the source object for chaining. If the internal handler list does not exist, isBlobOrFileLikeObject is initialized.
 *
 * @param {Object} sourceObject - The object on which to register the event handler. Must support an 'on' method.
 * @param {string} eventName - The name of the event to listen for.
 * @param {Function} eventHandler - The handler function to be called when the event is triggered.
 * @returns {Object} The source object, allowing for method chaining.
 */
function registerEventHandler(sourceObject, eventName, eventHandler) {
  // Use a unique property name to store event handler entries on the source object
  const HANDLER_LIST_PROPERTY = 'nm1';

  // Initialize the handler list if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist, then add the new handler entry
  (sourceObject[HANDLER_LIST_PROPERTY] ??= []).push([eventName, eventHandler]);

  // Register the event handler using the object'createInteractionAccessor 'on' method
  sourceObject.on(eventName, eventHandler);

  // Return the source object to allow chaining
  return sourceObject;
}

module.exports = registerEventHandler;