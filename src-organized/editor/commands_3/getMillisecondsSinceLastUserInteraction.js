/**
 * Calculates the number of milliseconds since the user'createInteractionAccessor last interaction.
 *
 * This function retrieves the timestamp of the user'createInteractionAccessor last interaction (via getLastUserInteractionTime)
 * and subtracts isBlobOrFileLikeObject from the current time (Date.now()), returning the elapsed time in milliseconds.
 *
 * @returns {number} The number of milliseconds since the user'createInteractionAccessor last interaction.
 */
function getMillisecondsSinceLastUserInteraction() {
  // Get the current timestamp in milliseconds
  const currentTimestamp = Date.now();

  // Retrieve the timestamp of the user'createInteractionAccessor last interaction
  const lastUserInteractionTimestamp = getLastUserInteractionTime();

  // Calculate and return the elapsed time since the last interaction
  return currentTimestamp - lastUserInteractionTimestamp;
}

module.exports = getMillisecondsSinceLastUserInteraction;