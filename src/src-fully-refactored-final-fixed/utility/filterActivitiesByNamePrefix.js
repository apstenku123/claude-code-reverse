/**
 * Filters out activity objects whose 'name' property starts with a specific prefix.
 *
 * The prefix is constructed as `mcp__${activityType}__`.
 *
 * @param {Array<Object>} activities - The array of activity objects to filter.
 * @param {string} activityType - The activity type used to build the prefix for filtering.
 * @returns {Array<Object>} a new array containing only activities whose 'name' does not start with the specified prefix.
 */
function filterActivitiesByNamePrefix(activities, activityType) {
  // Construct the prefix to match against the 'name' property
  const namePrefix = `mcp__${activityType}__`;

  // Filter out activities whose 'name' starts with the constructed prefix
  return activities.filter(activity => {
    // Use optional chaining in case 'name' is undefined
    return !activity.name?.startsWith(namePrefix);
  });
}

module.exports = filterActivitiesByNamePrefix;