/**
 * Maps user interaction entries to route names with associated metadata.
 *
 * This function processes an array of interaction entries, associates them with route names,
 * and stores relevant metadata such as duration, user, transaction, and replay updateSnapshotAndNotify. It ensures
 * that only a limited number of mappings are kept, and updates or replaces them based on duration.
 *
 * @param {Object} params - The parameters object.
 * @param {Array<Object>} params.entries - Array of interaction entries to process.
 * @returns {void}
 */
function mapInteractionsToRoutes({ entries }) {
  // Get the current client instance
  const client = sC.getClient();

  // Attempt to get the 'Replay' integration from the client
  const replayIntegration = (client && typeof client.getIntegrationByName === 'function')
    ? client.getIntegrationByName('Replay')
    : undefined;

  // Get the current replay updateSnapshotAndNotify if available
  const replayId = replayIntegration ? replayIntegration.getReplayId() : undefined;

  // Get the currently active transaction
  const activeTransaction = sC.getActiveTransaction();

  // Get the current scope and user if available
  const currentScope = sC.getCurrentScope();
  const currentUser = currentScope ? currentScope.getUser() : undefined;

  // Process each interaction entry
  entries.forEach((entry) => {
    // Only process entries that pass the hasDurationProperty check
    if (hasDurationProperty(entry)) {
      const interactionId = entry.interactionId;
      if (interactionId === undefined) return;

      // Get the existing mapping for this interactionId, if any
      const existingMapping = this._interactionIdToRouteNameMapping[interactionId];
      const entryDuration = entry.duration;
      const entryStartTime = entry.startTime;

      // Get all interaction IDs currently in the mapping
      const allInteractionIds = Object.keys(this._interactionIdToRouteNameMapping);

      // Find the interactionId with the minimum duration
      const minDurationInteractionId = allInteractionIds.length > 0
        ? allInteractionIds.reduce((minId, currentId) => {
            return this._interactionIdToRouteNameMapping[minId].duration < this._interactionIdToRouteNameMapping[currentId].duration
              ? minId
              : currentId;
          })
        : undefined;

      // For 'first-input' entries, skip if a mapping with the same duration and startTime already exists
      if (entry.entryType === 'first-input') {
        const hasDuplicate = allInteractionIds
          .map(id => this._interactionIdToRouteNameMapping[id])
          .some(mapping => mapping.duration === entryDuration && mapping.startTime === entryStartTime);
        if (hasDuplicate) return;
      }

      // If interactionId is missing, skip
      if (!interactionId) return;

      // If a mapping exists, update its duration to the maximum
      if (existingMapping) {
        existingMapping.duration = Math.max(existingMapping.duration, entryDuration);
      } else {
        // If handleMissingDoctypeError have room for more mappings, or this entry has a longer duration than the minimum
        if (
          allInteractionIds.length < bIA ||
          minDurationInteractionId === undefined ||
          entryDuration > this._interactionIdToRouteNameMapping[minDurationInteractionId].duration
        ) {
          const latestRouteName = this._latestRoute.name;
          const latestRouteContext = this._latestRoute.context;

          // Only proceed if both route name and context are available
          if (latestRouteName && latestRouteContext) {
            // If at capacity, remove the mapping with the minimum duration
            if (
              minDurationInteractionId &&
              Object.keys(this._interactionIdToRouteNameMapping).length >= bIA
            ) {
              delete this._interactionIdToRouteNameMapping[minDurationInteractionId];
            }

            // Add the new mapping
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

module.exports = mapInteractionsToRoutes;