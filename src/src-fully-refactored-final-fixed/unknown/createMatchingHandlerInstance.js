/**
 * Iterates through a list of handler classes and returns an instance of the first handler
 * whose static condition method returns true for the provided arguments. If no handler matches,
 * returns an instance of the default handler class.
 *
 * @param {any} sourceObservable - The source observable or input to be processed by the handler.
 * @param {any} config - Configuration or context object passed to the handler.
 * @returns {object} Instance of the matching handler class, or the default handler if none match.
 */
function createMatchingHandlerInstance(sourceObservable, config) {
  // Iterate through all registered handler classes
  for (let handlerIndex = 0, handlerCount = q1A.length; handlerIndex < handlerCount; handlerIndex += 1) {
    const HandlerClass = q1A[handlerIndex];
    // Check if this handler'createInteractionAccessor condition matches the input
    if (HandlerClass.condition(sourceObservable, config)) {
      // Return a new instance of the matching handler
      return new HandlerClass(sourceObservable, config);
    }
  }
  // If no handler matches, return an instance of the default handler
  return new O1A(sourceObservable, config);
}

module.exports = createMatchingHandlerInstance;