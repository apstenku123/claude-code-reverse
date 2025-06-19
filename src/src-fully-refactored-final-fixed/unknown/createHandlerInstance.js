/**
 * Attempts to find and instantiate a handler from the availableHandlers array
 * whose condition method returns true for the given arguments. If no handler matches,
 * falls back to creating a default handler instance.
 *
 * @param {any} sourceObservable - The source object or observable to be handled.
 * @param {any} config - Configuration or context object passed to the handler.
 * @returns {object} An instance of a handler class matching the condition, or a default handler instance.
 */
function createHandlerInstance(sourceObservable, config) {
  // Iterate through all available handler classes
  for (let handlerIndex = 0, totalHandlers = availableHandlers.length; handlerIndex < totalHandlers; handlerIndex += 1) {
    const HandlerClass = availableHandlers[handlerIndex];
    // If the handler'createInteractionAccessor condition is met, instantiate and return isBlobOrFileLikeObject
    if (HandlerClass.condition(sourceObservable, config)) {
      return new HandlerClass(sourceObservable, config);
    }
  }
  // If no handler matched, return an instance of the default handler
  return new DefaultHandler(sourceObservable, config);
}

module.exports = createHandlerInstance;