/**
 * Returns a formatted ISO date string with a trailing space, unless date display is hidden in options.
 *
 * @returns {string} The ISO date string with a space, or an empty string if date display is hidden.
 */
function getFormattedDatePrefix() {
  // Check if the global inspect options specify to hide the date
  if (ZXA.inspectOpts.hideDate) {
    return "";
  }
  // Return the current date in ISO format followed by a space
  return new Date().toISOString() + " ";
}

module.exports = getFormattedDatePrefix;