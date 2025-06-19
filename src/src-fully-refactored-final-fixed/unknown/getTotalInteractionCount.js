/**
 * Retrieves the total number of user interactions recorded by the application.
 *
 * @returns {number} The current total interaction count.
 */
const getTotalInteractionCount = () => {
  // Calls the external AIA module to get the current interaction count
  return AIA.getInteractionCount();
};

module.exports = getTotalInteractionCount;