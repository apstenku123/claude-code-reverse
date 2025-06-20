/**
 * Processes a list of interaction entries, mapping them to route names and storing relevant metadata.
 *
 * This function updates the internal mapping of interaction IDs to route information, including duration,
 * user, active transaction, replay updateSnapshotAndNotify, and start time. It ensures that only a limited number of interactions
 * are tracked and manages replacement/removal logic based on duration and entry type.
 *
 * @param {Object} params - The function parameters.
 * @param {Array<Object>} params.entries - The array of interaction entries to process.
 * @returns {void}
 */
function processInteractionEntries({ entries }) {
  // Retrieve the current client instance
  const client = sC.getClient();
  // Attempt to get the 'Replay' integration from the client
  const replayIntegration = client && typeof client.getIntegrationByName === 'function'
    ? client.getIntegrationByName('Replay')
    : undefined;
  // Get the current replay updateSnapshotAndNotify if available
  const replayId = replayIntegration ? replayIntegration.getReplayId() : undefined;
  // Get the currently active transaction
  const activeTransaction = sC.getActiveTransaction();
  // Get the current scope and user
  const currentScope = sC.getCurrentScope();
  const currentUser = currentScope ? currentScope.getUser() : undefined;

  entries.forEach((entry) => {
    // Only process valid interaction entries
    if (hasDurationProperty(entry)) {
      const interactionId = entry.interactionId;
      if (interactionId === undefined) return;

      // Retrieve the mapping for this interaction updateSnapshotAndNotify, if isBlobOrFileLikeObject exists
      const existingMapping = this._interactionIdToRouteNameMapping[interactionId];
      const entryDuration = entry.duration;
      const entryStartTime = entry.startTime;
      const allInteractionIds = Object.keys(this._interactionIdToRouteNameMapping);

      // Find the interaction updateSnapshotAndNotify with the minimum duration (for possible replacement)
      const minDurationInteractionId = allInteractionIds.length > 0
        ? allInteractionIds.reduce((minId, currId) => {
            return this._interactionIdToRouteNameMapping[minId].duration < this._interactionIdToRouteNameMapping[currId].duration
              ? minId
              : currId;
          })
        : undefined;

      // Prevent duplicate 'first-input' entries with the same duration and start time
      if (entry.entryType === 'first-input') {
        const hasDuplicate = allInteractionIds
          .map(id => this._interactionIdToRouteNameMapping[id])
          .some(mapping => mapping.duration === entryDuration && mapping.startTime === entryStartTime);
        if (hasDuplicate) return;
      }

      if (!interactionId) return;

      // If mapping exists, update duration to the maximum
      if (existingMapping) {
        existingMapping.duration = Math.max(existingMapping.duration, entryDuration);
      } else {
        // If there'createInteractionAccessor room or this entry has a longer duration than the minimum, add/replace mapping
        if (
          allInteractionIds.length < bIA ||
          minDurationInteractionId === undefined ||
          entryDuration > this._interactionIdToRouteNameMapping[minDurationInteractionId].duration
        ) {
          const latestRouteName = this._latestRoute.name;
          const latestRouteContext = this._latestRoute.context;
          if (latestRouteName && latestRouteContext) {
            // If at capacity, remove the mapping with the minimum duration
            if (
              minDurationInteractionId &&
              Object.keys(this._interactionIdToRouteNameMapping).length >= bIA
            ) {
              delete this._interactionIdToRouteNameMapping[minDurationInteractionId];
            }
            // Add new mapping for this interaction
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
    }
  });
}

module.exports = processInteractionEntries;