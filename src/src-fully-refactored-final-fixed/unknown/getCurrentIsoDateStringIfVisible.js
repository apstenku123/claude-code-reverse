/**
 * Returns the current date and time as an ISO string with a trailing space, unless the configuration option to hide the date is enabled.
 *
 * @returns {string} The ISO date string with a trailing space, or an empty string if the date should be hidden.
 */
function getCurrentIsoDateStringIfVisible() {
  // Check if the global inspect options specify to hide the date
  if (ZXA.inspectOpts.hideDate) {
    return "";
  }
  // Return the current date in ISO format with a trailing space
  return new Date().toISOString() + " ";
}

module.exports = getCurrentIsoDateStringIfVisible;