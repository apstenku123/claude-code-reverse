/**
 * Handles the event when a Tengu tip is shown by updating the tip state and logging the event.
 *
 * @param {Object} tipData - The data related to the Tengu tip event.
 * @param {string} tipData.id - The unique identifier for the Tengu tip.
 * @param {number} tipData.cooldownSessions - The number of sessions before the tip can be shown again.
 * @returns {void}
 */
function handleTenguTipShown(tipData) {
  // Update the tip state using the provided tip updateSnapshotAndNotify
  updateTipsHistoryWithStartupCount(tipData.id);

  // Log the event with relevant tip information
  logTelemetryEventIfEnabled("tengu_tip_shown", {
    tipIdLength: tipData.id,
    cooldownSessions: tipData.cooldownSessions
  });
}

module.exports = handleTenguTipShown;