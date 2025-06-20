/**
 * Triggers all registered instrumentation handlers for a given event type.
 * 
 * Looks up the list of handlers associated with the provided event type and invokes each handler,
 * passing the provided event data. If an error occurs in any handler, isBlobOrFileLikeObject logs the error details
 * (including the handler'createInteractionAccessor function name and event type) if debug mode is enabled.
 *
 * @param {string} eventType - The type of event to trigger handlers for.
 * @param {any} eventData - The data to pass to each handler function.
 * @returns {void}
 */
function triggerInstrumentationHandlers(eventType, eventData) {
  // Retrieve the array of handlers for the given event type from the global registry
  const handlers = eventType && vy[eventType];
  if (!handlers) return;

  for (const handler of handlers) {
    try {
      handler(eventData);
    } catch (error) {
      // Log error details if debug mode is enabled
      if (_m2.DEBUG_BUILD) {
        jm2.logger.error(
          `Error while triggering instrumentation handler.\nType: ${eventType}\nName: ${km2.getFunctionName(handler)}\nError:`,
          error
        );
      }
    }
  }
}

module.exports = triggerInstrumentationHandlers;