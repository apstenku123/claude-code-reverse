/**
 * Processes an event through a series of event processors and returns the final processed event context.
 *
 * @async
 * @function processEventWithProcessors
 * @param {Object} eventSource - An object that provides event processors via getEventProcessors().
 * @returns {Promise<Object>} The processed event context, or an empty object if processing fails.
 */
async function processEventWithProcessors(eventSource) {
  // Initial event context to be processed by each processor
  let eventContext = {
    message: "ANR"
  };

  // Additional context or options passed to each processor (currently empty)
  const processorOptions = {};

  // Sequentially apply each event processor to the event context
  for (const eventProcessor of eventSource.getEventProcessors()) {
    if (eventContext === null) {
      // If a processor returns null, stop processing further
      break;
    }
    eventContext = await eventProcessor(eventContext, processorOptions);
  }

  // Use IG9 to extract the processed context, or return an empty object if not available
  return IG9([
    eventContext,
    "optionalAccess",
    contextObj => contextObj.contexts
  ]) || {};
}

module.exports = processEventWithProcessors;