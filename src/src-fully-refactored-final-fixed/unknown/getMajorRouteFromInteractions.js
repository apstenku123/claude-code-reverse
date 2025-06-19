/**
 * Determines the major route from a set of user interactions and activity configuration.
 *
 * This function creates a new PM6 instance using the provided user interactions and activity configuration,
 * then returns the computed major route from the instance.
 *
 * @param {Array<Object>} userInteractions - An array of user interaction entries to be mapped to routes.
 * @param {Object} activityConfig - Configuration object for activity processing, used to determine if an activity should be added.
 * @returns {string} The name of the major route determined from the user interactions and activity configuration.
 */
const getMajorRouteFromInteractions = (userInteractions, activityConfig) => {
  // Create a new PM6 instance with the provided interactions and configuration
  // PM6 is expected to process the interactions and config to determine the major route
  const pm6Instance = new PM6(userInteractions, activityConfig);
  // Return the major route computed by PM6
  return pm6Instance.major;
};

module.exports = getMajorRouteFromInteractions;
