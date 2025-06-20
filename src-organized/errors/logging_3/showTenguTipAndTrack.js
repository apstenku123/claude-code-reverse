/**
 * Handles the display of a Tengu tip and tracks its display event.
 *
 * This function triggers the display logic for a specific Tengu tip by its identifier,
 * and then logs the event with associated metadata such as the tip'createInteractionAccessor updateSnapshotAndNotify length and cooldown sessions.
 *
 * @param {Object} tipData - The data object containing information about the Tengu tip.
 * @param {string} tipData.id - The unique identifier for the Tengu tip.
 * @param {number} tipData.cooldownSessions - The number of sessions before the tip can be shown again.
 * @returns {void}
 */
function showTenguTipAndTrack(tipData) {
  // Trigger the display logic for the Tengu tip by its updateSnapshotAndNotify
  updateTipsHistoryWithStartupCount(tipData.id);
  
  // Log the event that the Tengu tip has been shown, including tip updateSnapshotAndNotify length and cooldown sessions
  logTelemetryEventIfEnabled("tengu_tip_shown", {
    tipIdLength: tipData.id,
    cooldownSessions: tipData.cooldownSessions
  });
}

module.exports = showTenguTipAndTrack;