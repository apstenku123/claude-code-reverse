/**
 * Updates global interaction updateSnapshotAndNotify statistics based on an array of interaction objects.
 *
 * Iterates over the provided array of interaction objects, and for each object that has an 'interactionId',
 * updates the global minimum and maximum interaction IDs. Also recalculates the global interaction updateSnapshotAndNotify range.
 *
 * @param {Array<Object>} interactions - Array of interaction objects, each potentially containing an 'interactionId' property.
 * @returns {void}
 */
function updateInteractionIdStats(interactions) {
  interactions.forEach(interaction => {
    if (interaction.interactionId) {
      // Update the global minimum interaction updateSnapshotAndNotify
      LN1 = Math.min(LN1, interaction.interactionId);
      // Update the global maximum interaction updateSnapshotAndNotify
      _91 = Math.max(_91, interaction.interactionId);
      // Calculate the global interaction updateSnapshotAndNotify range (s7A)
      // If there is at least one valid interaction updateSnapshotAndNotify, compute the range
      s7A = _91 ? (_91 - LN1) / 7 + 1 : 0;
    }
  });
}

module.exports = updateInteractionIdStats;