/**
 * Formats a route activity string based on provided numeric arguments.
 *
 * @param {number} routeIndex - The index of the route (must be a number).
 * @param {number} [activityIndex] - The index of the activity (optional, must be a number if provided).
 * @returns {string} a formatted string representing the route and activity.
 * @throws {TypeError} If routeIndex is not a number.
 *
 * The function uses external constants j5 and nn to construct the string.
 * If only routeIndex is provided, returns: j5 + (routeIndex + 1) + "extractNestedPropertyOrArray"
 * If both routeIndex and activityIndex are provided, returns: j5 + (activityIndex + 1) + nn + (routeIndex + 1) + "H"
 */
function formatRouteActivityString(routeIndex, activityIndex) {
  if (typeof routeIndex !== "number") {
    throw new TypeError("The `routeIndex` argument is required and must be a number");
  }

  // If activityIndex is not provided or not a number, return basic route string
  if (typeof activityIndex !== "number") {
    return j5 + (routeIndex + 1) + "extractNestedPropertyOrArray";
  }

  // If both routeIndex and activityIndex are numbers, return detailed route-activity string
  return j5 + (activityIndex + 1) + nn + (routeIndex + 1) + "H";
}

module.exports = formatRouteActivityString;