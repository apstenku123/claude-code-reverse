/**
 * Maps user interaction entries to route names, updating or creating mappings as needed.
 * Associates interaction data with route, user, transaction, and replay context.
 *
 * @param {Object} params - The function parameter object.
 * @param {Array<Object>} params.entries - Array of interaction entries to process.
 * @returns {void}
 */
function mapInteractionsToRouteNames({ entries }) {
  // Get the current Sentry client
  const sentryClient = sC.getClient();
  // Try to get the Replay integration from the client
  const replayIntegration = (sentryClient && typeof sentryClient.getIntegrationByName === 'function')
    ? sentryClient.getIntegrationByName('Replay')
    : undefined;
  // Get the current replay updateSnapshotAndNotify if available
  const replayId = replayIntegration ? replayIntegration.getReplayId() : undefined;
  // Get the current active transaction
  const activeTransaction = sC.getActiveTransaction();
  // Get the current user from the Sentry scope
  const currentScope = sC.getCurrentScope();
  const user = currentScope ? currentScope.getUser() : undefined;

  entries.forEach((entry) => {
    // Only process entries that pass the hasDurationProperty check (likely a type guard)
    if (hasDurationProperty(entry)) {
      const interactionId = entry.interactionId;
      if (interactionId === undefined) return;

      // Get the existing mapping for this interactionId, if any
      const existingMapping = this._interactionIdToRouteNameMapping[interactionId];
      const entryDuration = entry.duration;
      const entryStartTime = entry.startTime;
      // Get all interaction IDs currently mapped
      const allInteractionIds = Object.keys(this._interactionIdToRouteNameMapping);

      // Find the interactionId with the smallest duration (used for eviction)
      const interactionIdWithMinDuration = allInteractionIds.length > 0
        ? allInteractionIds.reduce((minId, currentId) => {
            return this._interactionIdToRouteNameMapping[minId].duration < this._interactionIdToRouteNameMapping[currentId].duration
              ? minId
              : currentId;
          })
        : undefined;

      // Prevent duplicate mapping for 'first-input' entries with same duration and startTime
      if (entry.entryType === 'first-input') {
        const hasDuplicate = allInteractionIds
          .map(id => this._interactionIdToRouteNameMapping[id])
          .some(mapping => mapping.duration === entryDuration && mapping.startTime === entryStartTime);
        if (hasDuplicate) return;
      }

      if (!interactionId) return;

      if (existingMapping) {
        // Update the duration if the new duration is greater
        existingMapping.duration = Math.max(existingMapping.duration, entryDuration);
      } else if (
        allInteractionIds.length < bIA ||
        interactionIdWithMinDuration === undefined ||
        entryDuration > this._interactionIdToRouteNameMapping[interactionIdWithMinDuration].duration
      ) {
        // If mapping limit not reached, or this entry has a longer duration than the smallest, add/replace mapping
        const latestRouteName = this._latestRoute.name;
        const latestRouteContext = this._latestRoute.context;
        if (latestRouteName && latestRouteContext) {
          // If at mapping limit, remove the mapping with the smallest duration
          if (
            interactionIdWithMinDuration &&
            Object.keys(this._interactionIdToRouteNameMapping).length >= bIA
          ) {
            delete this._interactionIdToRouteNameMapping[interactionIdWithMinDuration];
          }
          // Create new mapping for this interaction
          this._interactionIdToRouteNameMapping[interactionId] = {
            routeName: latestRouteName,
            duration: entryDuration,
            parentContext: latestRouteContext,
            user: user,
            activeTransaction: activeTransaction,
            replayId: replayId,
            startTime: entryStartTime
          };
        }
      }
    }
  });
}

module.exports = mapInteractionsToRouteNames;