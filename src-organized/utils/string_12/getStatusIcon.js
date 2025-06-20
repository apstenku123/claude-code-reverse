/**
 * Returns the corresponding icon for a given status string.
 *
 * @param {string} status - The status for which to retrieve the icon. Expected values: 'pending', 'queued', 'in_progress', 'completed', 'failed', 'cancelled', 'timed_out', or any other string.
 * @returns {any} The icon associated with the provided status. If the status is not recognized, returns the question mark icon.
 */
function getStatusIcon(status) {
  switch (status) {
    case "pending":
      // Icon for a pending status
      return y0.circle;
    case "queued":
      // Icon for a queued status
      return y0.circleDotted;
    case "in_progress":
      // Icon for an in-progress status
      return y0.circleFilled;
    case "completed":
      // Icon for a completed status
      return y0.tick;
    case "failed":
      // Icon for a failed status
      return y0.cross;
    case "cancelled":
      // Icon for a cancelled status
      return y0.circleCircle;
    case "timed_out":
      // Icon for a timed out status
      return y0.warning;
    default:
      // Default icon for unknown status
      return y0.questionMarkPrefix;
  }
}

module.exports = getStatusIcon;