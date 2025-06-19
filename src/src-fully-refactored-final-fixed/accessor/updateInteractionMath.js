/**
 * Updates global interaction math variables based on an array of interaction objects.
 *
 * Iterates through each interaction object in the provided array, updating the global minimum and maximum
 * interaction IDs (LN1 and _91), and recalculates the global interaction span (s7A).
 *
 * @param {Array<Object>} interactions - Array of interaction objects, each potentially containing an 'interactionId' property.
 * @returns {void}
 */
function updateInteractionMath(interactions) {
  interactions.forEach(interaction => {
    if (interaction.interactionId) {
      // Update the global minimum interaction updateSnapshotAndNotify
      LN1 = Math.min(LN1, interaction.interactionId);
      // Update the global maximum interaction updateSnapshotAndNotify
      _91 = Math.max(_91, interaction.interactionId);
      // Calculate the interaction span and update the global variable
      s7A = _91 ? (_91 - LN1) / 7 + 1 : 0;
    }
  });
}

module.exports = updateInteractionMath;