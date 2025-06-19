/**
 * Returns the current ISO timestamp string with a trailing space, unless the configuration option to hide the date is enabled.
 *
 * @returns {string} ISO timestamp string with a trailing space, or an empty string if date display is disabled.
 */
function getCurrentTimestampString() {
  // Check if the configuration option to hide the date is enabled
  if (ZXA.inspectOpts.hideDate) {
    return "";
  }
  // Return the current date in ISO format with a trailing space
  return new Date().toISOString() + " ";
}

module.exports = getCurrentTimestampString;