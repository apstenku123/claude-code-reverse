/**
 * Checks if the route associated with the given routeState object is closed.
 *
 * @param {Object} routeState - The object representing the current route state.
 * @returns {boolean} True if the route is closed; otherwise, false.
 */
function isRouteClosed(routeState) {
  // Check if the route status property equals the CLOSED status
  return routeState[ur] === pr.CLOSED;
}

module.exports = isRouteClosed;