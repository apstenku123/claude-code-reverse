/**
 * Handles performance event instrumentation for replay authentication, tracking user interactions and associating them with relevant context.
 *
 * @function authenticateReplay
 * @category security
 * @param {Object} interactionStore - An object mapping interaction IDs to their metadata (duration, startTime, etc).
 * @param {Object} routeConfig - Configuration object containing route name and context.
 * @returns {void}
 */
function authenticateReplay(interactionStore, routeConfig) {
  /**
   * Event handler for performance entries, updating the interactionStore with relevant data.
   * @param {Object} param0
   * @param {Array} param0.entries - Array of performance entry objects.
   */
  const handlePerformanceEntries = ({ entries }) => {
    // Retrieve the current client and its Replay integration (if available)
    const client = HQ.getClient();
    const replayIntegration = client && typeof client.getIntegrationByName === 'function'
      ? client.getIntegrationByName('Replay')
      : undefined;
    const replayId = replayIntegration ? replayIntegration.getReplayId() : undefined;

    // Get the current active transaction and user context
    const activeTransaction = HQ.getActiveTransaction();
    const currentScope = HQ.getCurrentScope();
    const currentUser = currentScope ? currentScope.getUser() : undefined;

    entries.forEach((entry) => {
      // Only process entries that pass the hasDurationProperty check (likely a type/validation check)
      if (hasDurationProperty(entry)) {
        const interactionId = entry.interactionId;
        if (interactionId === undefined) return;

        const existingInteraction = interactionStore[interactionId];
        const entryDuration = entry.duration;
        const entryStartTime = entry.startTime;
        const interactionIds = Object.keys(interactionStore);

        // Find the interaction with the minimum duration (for possible eviction)
        const minDurationInteractionId = interactionIds.length > 0
          ? interactionIds.reduce((minId, currentId) => {
              return interactionStore[minId].duration < interactionStore[currentId].duration
                ? minId
                : currentId;
            })
          : undefined;

        // Prevent duplicate 'first-input' entries with the same duration and startTime
        if (entry.entryType === 'first-input') {
          const isDuplicate = interactionIds
            .map(id => interactionStore[id])
            .some(interaction => interaction.duration === entryDuration && interaction.startTime === entryStartTime);
          if (isDuplicate) return;
        }

        if (!interactionId) return;

        if (existingInteraction) {
          // Update the duration if the new entry is longer
          existingInteraction.duration = Math.max(existingInteraction.duration, entryDuration);
        } else if (
          // Only add a new interaction if there'createInteractionAccessor room, or if this entry is longer than the shortest
          interactionIds.length < cIA ||
          minDurationInteractionId === undefined ||
          entryDuration > interactionStore[minDurationInteractionId].duration
        ) {
          const { name: routeName, context: parentContext } = routeConfig;
          if (routeName && parentContext) {
            // Evict the shortest interaction if at capacity
            if (minDurationInteractionId && Object.keys(interactionStore).length >= cIA) {
              delete interactionStore[minDurationInteractionId];
            }
            // Store the new interaction with all relevant context
            interactionStore[interactionId] = {
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

  // Register the handler for both 'event' and 'first-input' performance entry types
  pIA.addPerformanceInstrumentationHandler('event', handlePerformanceEntries);
  pIA.addPerformanceInstrumentationHandler('first-input', handlePerformanceEntries);
}

module.exports = authenticateReplay;