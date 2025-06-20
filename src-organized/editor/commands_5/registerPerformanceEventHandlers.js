/**
 * Registers performance instrumentation handlers for event and first-input events.
 * Processes performance entries, updating or adding interaction data to the provided interactionMap.
 *
 * @param {Object} interactionMap - a map of interaction IDs to their data objects.
 * @param {Object} routeConfig - Configuration object containing route name and context.
 */
function registerPerformanceEventHandlers(interactionMap, routeConfig) {
  /**
   * Handler for processing performance entries.
   *
   * @param {Object} param0
   * @param {Array} param0.entries - Array of performance entry objects.
   */
  const performanceEntryHandler = ({ entries }) => {
    // Get the current client from HQ
    const client = HQ.getClient();
    // Try to get the Replay integration if available
    const replayIntegration = client && typeof client.getIntegrationByName === 'function'
      ? client.getIntegrationByName('Replay')
      : undefined;
    // Get the current replay updateSnapshotAndNotify if available
    const replayId = replayIntegration ? replayIntegration.getReplayId() : undefined;
    // Get the currently active transaction from HQ
    const activeTransaction = HQ.getActiveTransaction();
    // Get the current scope and user if available
    const currentScope = HQ.getCurrentScope();
    const currentUser = currentScope ? currentScope.getUser() : undefined;

    entries.forEach(performanceEntry => {
      // Only process entries that pass the hasDurationProperty check
      if (hasDurationProperty(performanceEntry)) {
        const interactionId = performanceEntry.interactionId;
        if (interactionId === undefined) return;

        const existingInteraction = interactionMap[interactionId];
        const entryDuration = performanceEntry.duration;
        const entryStartTime = performanceEntry.startTime;
        const interactionIds = Object.keys(interactionMap);

        // Find the interaction with the shortest duration
        const shortestDurationId = interactionIds.length > 0
          ? interactionIds.reduce((shortestId, currentId) => {
              return interactionMap[shortestId].duration < interactionMap[currentId].duration
                ? shortestId
                : currentId;
            })
          : undefined;

        // Prevent duplicate first-input entries with same duration and startTime
        if (performanceEntry.entryType === 'first-input') {
          const isDuplicate = interactionIds
            .map(id => interactionMap[id])
            .some(interaction => interaction.duration === entryDuration && interaction.startTime === entryStartTime);
          if (isDuplicate) return;
        }

        if (!interactionId) return;

        if (existingInteraction) {
          // Update the duration if the new duration is greater
          existingInteraction.duration = Math.max(existingInteraction.duration, entryDuration);
        } else if (
          interactionIds.length < cIA ||
          shortestDurationId === undefined ||
          entryDuration > interactionMap[shortestDurationId].duration
        ) {
          // Add a new interaction if under the limit, or if this entry has a longer duration
          const { name: routeName, context: parentContext } = routeConfig;
          if (routeName && parentContext) {
            // If at the limit, remove the interaction with the shortest duration
            if (shortestDurationId && Object.keys(interactionMap).length >= cIA) {
              delete interactionMap[shortestDurationId];
            }
            // Store the new interaction data
            interactionMap[interactionId] = {
              routeName,
              duration: entryDuration,
              parentContext,
              user: currentUser,
              activeTransaction,
              replayId,
              startTime: entryStartTime
            };
          }
        }
      }
    });
  };

  // Register the handler for both 'event' and 'first-input' performance events
  pIA.addPerformanceInstrumentationHandler('event', performanceEntryHandler);
  pIA.addPerformanceInstrumentationHandler('first-input', performanceEntryHandler);
}

module.exports = registerPerformanceEventHandlers;