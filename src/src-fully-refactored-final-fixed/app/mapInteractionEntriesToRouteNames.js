/**
 * Maps interaction entries to route names, updating or adding mappings based on entry data.
 * Handles deduplication, duration comparison, and context enrichment for each interaction.
 *
 * @param {Object} params - The input object.
 * @param {Array<Object>} params.entries - The array of interaction entries to process.
 * @returns {void}
 */
function mapInteractionEntriesToRouteNames({ entries }) {
  // Get the current client instance
  const client = sC.getClient();
  // Try to get the Replay integration from the client
  const replayIntegration = client && typeof client.getIntegrationByName === 'function'
    ? client.getIntegrationByName('Replay')
    : undefined;
  // Get the current replay updateSnapshotAndNotify if available
  const replayId = replayIntegration ? replayIntegration.getReplayId() : undefined;
  // Get the currently active transaction
  const activeTransaction = sC.getActiveTransaction();
  // Get the current scope (user/session context)
  const currentScope = sC.getCurrentScope();
  // Get the current user if available
  const currentUser = currentScope ? currentScope.getUser() : undefined;

  entries.forEach((entry) => {
    // Only process valid interaction entries
    if (hasDurationProperty(entry)) {
      const interactionId = entry.interactionId;
      if (interactionId === undefined) return;

      // Get the existing mapping for this interactionId, if any
      const existingMapping = this._interactionIdToRouteNameMapping[interactionId];
      const entryDuration = entry.duration;
      const entryStartTime = entry.startTime;
      // Get all current interaction IDs in the mapping
      const allInteractionIds = Object.keys(this._interactionIdToRouteNameMapping);

      // Find the interactionId with the smallest duration (used for eviction)
      const minDurationInteractionId = allInteractionIds.length > 0
        ? allInteractionIds.reduce((minId, currentId) => {
            return this._interactionIdToRouteNameMapping[minId].duration < this._interactionIdToRouteNameMapping[currentId].duration
              ? minId
              : currentId;
          })
        : undefined;

      // Deduplicate 'first-input' entries by duration and startTime
      if (entry.entryType === 'first-input') {
        const isDuplicate = allInteractionIds
          .map(id => this._interactionIdToRouteNameMapping[id])
          .some(mapping => mapping.duration === entryDuration && mapping.startTime === entryStartTime);
        if (isDuplicate) return;
      }

      if (!interactionId) return;

      if (existingMapping) {
        // Update the duration if this entry'createInteractionAccessor duration is greater
        existingMapping.duration = Math.max(existingMapping.duration, entryDuration);
      } else if (
        // If handleMissingDoctypeError have not reached the mapping limit, or this entry has a longer duration than the minimum
        allInteractionIds.length < bIA ||
        minDurationInteractionId === undefined ||
        entryDuration > this._interactionIdToRouteNameMapping[minDurationInteractionId].duration
      ) {
        const latestRouteName = this._latestRoute.name;
        const latestRouteContext = this._latestRoute.context;
        if (latestRouteName && latestRouteContext) {
          // If at limit, evict the mapping with the smallest duration
          if (
            minDurationInteractionId &&
            Object.keys(this._interactionIdToRouteNameMapping).length >= bIA
          ) {
            delete this._interactionIdToRouteNameMapping[minDurationInteractionId];
          }
          // Add new mapping for this interactionId
          this._interactionIdToRouteNameMapping[interactionId] = {
            routeName: latestRouteName,
            duration: entryDuration,
            parentContext: latestRouteContext,
            user: currentUser,
            activeTransaction: activeTransaction,
            replayId: replayId,
            startTime: entryStartTime
          };
        }
      }
    }
  });
}

module.exports = mapInteractionEntriesToRouteNames;