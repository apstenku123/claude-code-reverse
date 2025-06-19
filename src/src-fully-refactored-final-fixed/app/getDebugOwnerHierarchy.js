/**
 * Traverses the debug owner chain of a React element and returns an array of debug owner representations.
 *
 * @param {object} element - The React element or fiber node to extract the debug owner hierarchy from.
 * @returns {Array<any>|null} An array of debug owner representations (via Ay), or null if input is invalid.
 */
function getDebugOwnerHierarchy(element) {
  // Process the input element to obtain the fiber node (or similar structure)
  const fiberNode = findMountedFiberById(element);
  if (fiberNode == null) return null;

  // Start the hierarchy array with the current fiber node'createInteractionAccessor debug representation
  const debugOwnerHierarchy = [Ay(fiberNode)];
  let currentOwner = fiberNode._debugOwner;

  // Traverse up the debug owner chain
  while (currentOwner != null) {
    // Only process owners with a numeric 'tag' property (likely a React Fiber node)
    if (typeof currentOwner.tag === "number") {
      debugOwnerHierarchy.unshift(Ay(currentOwner));
      currentOwner = currentOwner._debugOwner;
    } else {
      // Stop if the owner is not a valid fiber node
      break;
    }
  }

  return debugOwnerHierarchy;
}

module.exports = getDebugOwnerHierarchy;