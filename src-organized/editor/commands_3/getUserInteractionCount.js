/**
 * Retrieves the current count of user interactions from the AIA module.
 *
 * @returns {number} The total number of user interactions recorded.
 */
const getUserInteractionCount = () => {
  // Calls the external AIA module to get the current interaction count
  return AIA.getInteractionCount();
};

module.exports = getUserInteractionCount;
