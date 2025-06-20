/**
 * Generates a formatted route interaction identifier string based on provided numeric arguments.
 *
 * @param {number} routeIndex - The index of the route interaction (required).
 * @param {number} [interactionIndex] - The index of the interaction (optional).
 * @returns {string} a formatted identifier string representing the route interaction.
 * @throws {TypeError} Throws if routeIndex is not a number.
 */
function formatRouteInteractionIdentifier(routeIndex, interactionIndex) {
  // Validate that routeIndex is a number
  if (typeof routeIndex !== "number") {
    throw new TypeError("The `routeIndex` argument is required and must be a number");
  }

  // If interactionIndex is not provided or not a number, return a simple identifier
  if (typeof interactionIndex !== "number") {
    // j5 is assumed to be an external string prefix constant
    return j5 + (routeIndex + 1) + "extractNestedPropertyOrArray";
  }

  // If both routeIndex and interactionIndex are numbers, return a detailed identifier
  // j5 and nn are assumed to be external string constants
  return j5 + (interactionIndex + 1) + nn + (routeIndex + 1) + "H";
}

module.exports = formatRouteInteractionIdentifier;
