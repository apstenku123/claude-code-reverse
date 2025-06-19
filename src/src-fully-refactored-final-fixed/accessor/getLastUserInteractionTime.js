/**
 * Retrieves the timestamp of the user'createInteractionAccessor last interaction.
 *
 * This function accesses the global N9 object and returns the value of its
 * lastInteractionTime property, which represents the most recent time the user interacted
 * with the application. Useful for tracking user activity or implementing inactivity timeouts.
 *
 * @returns {number} The timestamp (in milliseconds since the UNIX epoch) of the user'createInteractionAccessor last interaction.
 */
function getLastUserInteractionTime() {
  // Access the global N9 object and return the lastInteractionTime property
  return N9.lastInteractionTime;
}

module.exports = getLastUserInteractionTime;