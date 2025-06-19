/**
 * Sets extra context information on the current hub for error tracking or logging purposes.
 *
 * @param {Object} extras - An object containing key-value pairs to be set as extras on the current hub.
 * @returns {void}
 */
function setCurrentHubExtras(extras) {
  // Retrieve the current hub from the KQ global and set the provided extras
  KQ.getCurrentHub().setExtras(extras);
}

module.exports = setCurrentHubExtras;