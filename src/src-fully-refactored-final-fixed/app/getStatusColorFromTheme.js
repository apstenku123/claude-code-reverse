/**
 * Returns the appropriate color value from the current theme stylesheet based on the provided status.
 *
 * @param {string} status - The status for which to retrieve the corresponding color from the theme.
 * @returns {string} The color value associated with the given status in the current theme.
 */
function getStatusColorFromTheme(status) {
  // Retrieve the current theme'createInteractionAccessor stylesheet object
  const themeStylesheet = getThemeStylesheet();

  // Map status values to their corresponding theme color property
  switch (status) {
    case "pending":
    case "queued":
      return themeStylesheet.warning;
    case "in_progress":
      return themeStylesheet.permission;
    case "completed":
      return themeStylesheet.success;
    case "failed":
      return themeStylesheet.error;
    case "cancelled":
      return themeStylesheet.secondaryText;
    case "timed_out":
      return themeStylesheet.autoAccept;
    default:
      // Return a default color if status does not match any known case
      return themeStylesheet.text;
  }
}

module.exports = getStatusColorFromTheme;