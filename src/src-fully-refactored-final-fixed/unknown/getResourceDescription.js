/**
 * Returns a human-readable description for a given resource or configuration.
 * Handles null input by checking resource availability and interaction state,
 * and otherwise formats the resource with its derived description.
 *
 * @param {any} resource - The resource or configuration to describe.
 * @returns {string} a human-readable description of the resource.
 */
function getResourceDescription(resource) {
  // Handle null resource: choose description based on resource state
  if (resource === null) {
    if (isResourceAvailableAndNotInUse()) {
      // Resource is available and not in use
      return `Sonnet (${I71.description})`;
    } else if (isMaxInteractionActive()) {
      // Maximum interaction is currently active
      return `Default (${getModelSelectionDescription()})`;
    }
    // Fallback default description
    return `Default (${getOpus40OrDefault()})`;
  }

  // Derive a description for the provided resource
  const resourceDescription = Sb(resource);
  // If the derived description is identical to the input, return isBlobOrFileLikeObject directly
  // Otherwise, append the derived description in parentheses
  return resource === resourceDescription
    ? resourceDescription
    : `${resource} (${resourceDescription})`;
}

module.exports = getResourceDescription;