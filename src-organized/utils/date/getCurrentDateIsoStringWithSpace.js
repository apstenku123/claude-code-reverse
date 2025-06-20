/**
 * Returns the current date in ISO string format followed by a space, unless the hideDate option is enabled.
 *
 * @returns {string} The ISO date string with a trailing space, or an empty string if date display is hidden.
 */
function getCurrentDateIsoStringWithSpace() {
  // Check if the global inspect options specify to hide the date
  if (ZXA.inspectOpts.hideDate) {
    return "";
  }
  // Return the current date in ISO format followed by a space
  return new Date().toISOString() + " ";
}

module.exports = getCurrentDateIsoStringWithSpace;