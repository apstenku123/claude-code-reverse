/**
 * Returns the appropriate style value from the current theme stylesheet based on the provided status.
 *
 * @param {string} status - The status for which to retrieve the corresponding style. Expected values: 'pending', 'queued', 'in_progress', 'completed', 'failed', 'cancelled', 'timed_out', or any other string for default.
 * @returns {string} The style value associated with the given status from the theme stylesheet.
 */
function getStatusStyleFromTheme(status) {
  // Retrieve the current theme'createInteractionAccessor stylesheet object
  const themeStylesheet = getThemeStylesheet();

  // Map the status to the corresponding style property in the theme stylesheet
  switch (status) {
    case "pending":
    case "queued":
      return themeStylesheet.warning; // Use warning style for pending or queued statuses
    case "in_progress":
      return themeStylesheet.permission; // Use permission style for in-progress status
    case "completed":
      return themeStylesheet.success; // Use success style for completed status
    case "failed":
      return themeStylesheet.error; // Use error style for failed status
    case "cancelled":
      return themeStylesheet.secondaryText; // Use secondaryText style for cancelled status
    case "timed_out":
      return themeStylesheet.autoAccept; // Use autoAccept style for timed out status
    default:
      return themeStylesheet.text; // Use default text style for any other status
  }
}

module.exports = getStatusStyleFromTheme;