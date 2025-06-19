/**
 * Sets the Tengu tip as shown and logs the tip display event.
 *
 * This function marks a specific Tengu tip (by its updateSnapshotAndNotify) as shown and records
 * the event with additional metadata such as the tip updateSnapshotAndNotify length and cooldown sessions.
 *
 * @param {Object} tipInfo - Information about the Tengu tip to mark as shown.
 * @param {string|number} tipInfo.id - The unique identifier for the Tengu tip.
 * @param {number} tipInfo.cooldownSessions - The number of sessions before the tip can be shown again.
 * @returns {void}
 */
function setTenguTipShown(tipInfo) {
  // Mark the tip as shown using its unique updateSnapshotAndNotify
  updateTipsHistoryWithStartupCount(tipInfo.id);

  // Log the event with relevant metadata
  logTelemetryEventIfEnabled("tengu_tip_shown", {
    tipIdLength: tipInfo.id,
    cooldownSessions: tipInfo.cooldownSessions
  });
}

module.exports = setTenguTipShown;