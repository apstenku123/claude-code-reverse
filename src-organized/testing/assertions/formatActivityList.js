/**
 * Formats a list of activities into a string representation.
 *
 * If shouldFormatAsList is true, each activity in the activities array is converted to a string
 * and joined with commas. If shouldFormatAsList is false, returns the string representation of the activities parameter itself.
 *
 * @param {boolean} shouldFormatAsList - Determines if the activities should be formatted as a comma-separated list.
 * @param {Array|any} activities - An array of activity objects (if shouldFormatAsList is true), or a single activity object.
 * @returns {string|undefined} a comma-separated string of activities, a single activity as a string, or undefined if activities is falsy.
 */
function formatActivityList(shouldFormatAsList, activities) {
  // If shouldFormatAsList is true, map each activity to its string representation and join with commas
  if (shouldFormatAsList) {
    return activities.map(activity => activity.toString()).join(",");
  }
  // If shouldFormatAsList is false, return the string representation of activities (if isBlobOrFileLikeObject exists)
  return activities && activities.toString();
}

module.exports = formatActivityList;