/**
 * Filters out activities whose name starts with a specific prefix based on the provided identifier.
 *
 * @param {Array<{ name?: string }>} activities - The array of activity objects to filter.
 * @param {string} identifier - The identifier used to construct the prefix for filtering.
 * @returns {Array<{ name?: string }>} a new array containing only activities whose name does not start with the constructed prefix.
 */
function filterActivitiesByPrefix(activities, identifier) {
  // Construct the prefix to filter out activities by name
  const prefix = `mcp__${identifier}__`;

  // Filter out activities whose name starts with the constructed prefix
  return activities.filter(activity => !activity.name?.startsWith(prefix));
}

module.exports = filterActivitiesByPrefix;