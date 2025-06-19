/**
 * Filters out activities whose names start with a specific prefix based on the provided identifier.
 *
 * @param {Array<{name?: string}>} activities - The array of activity objects to filter.
 * @param {string} identifier - The identifier used to construct the prefix for filtering.
 * @returns {Array<{name?: string}>} a new array containing only activities whose names do not start with the constructed prefix.
 */
function filterActivitiesByPrefix(activities, identifier) {
  // Construct the prefix to match activity names against
  const activityNamePrefix = `mcp__${identifier}__`;

  // Filter out activities whose name starts with the constructed prefix
  return activities.filter(activity => {
    // Use optional chaining in case 'name' is undefined
    return !activity.name?.startsWith(activityNamePrefix);
  });
}

module.exports = filterActivitiesByPrefix;