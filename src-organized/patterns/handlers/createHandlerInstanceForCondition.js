/**
 * Attempts to find and instantiate a handler from the registeredHandlers array
 * whose condition method returns true for the given arguments. If none match,
 * falls back to the defaultHandler.
 *
 * @param {any} handlerArg1 - The first argument to pass to the handler'createInteractionAccessor condition and constructor.
 * @param {any} handlerArg2 - The second argument to pass to the handler'createInteractionAccessor condition and constructor.
 * @returns {object} An instance of the first matching handler, or the default handler if none match.
 */
function createHandlerInstanceForCondition(handlerArg1, handlerArg2) {
  // Iterate over all registered handlers
  for (let handlerIndex = 0, handlerCount = registeredHandlers.length; handlerIndex < handlerCount; handlerIndex += 1) {
    const HandlerClass = registeredHandlers[handlerIndex];
    // Check if this handler'createInteractionAccessor condition is met
    if (HandlerClass.condition(handlerArg1, handlerArg2)) {
      // Instantiate and return the matching handler
      return new HandlerClass(handlerArg1, handlerArg2);
    }
  }
  // If no handler matches, return an instance of the default handler
  return new defaultHandler(handlerArg1, handlerArg2);
}

module.exports = createHandlerInstanceForCondition;