/**
 * Updates the last user interaction timestamp on the global N9 object.
 *
 * This function sets the 'lastInteractionTime' property of the global N9 object
 * to the current timestamp in milliseconds. This can be used to track the most
 * recent time the user interacted with the application.
 *
 * @returns {void} This function does not return a value.
 */
function updateLastUserInteractionTime() {
  // Set the last interaction time to the current timestamp (in milliseconds)
  N9.lastInteractionTime = Date.now();
}

module.exports = updateLastUserInteractionTime;