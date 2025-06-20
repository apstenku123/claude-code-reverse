/**
 * Sets the global applicationEnabled flag to true.
 *
 * This utility function is used to enable the application or a specific feature
 * by setting the global variable `applicationEnabled` to true. It does not take
 * any parameters and does not return a value.
 *
 * @function
 * @returns {void}
 */
function enableGlobalFlag() {
  // Set the global flag to indicate the application/feature is enabled
  applicationEnabled = true;
}

module.exports = enableGlobalFlag;