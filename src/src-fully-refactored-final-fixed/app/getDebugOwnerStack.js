/**
 * Traverses the debug owner chain of a React element and returns a stack of owners.
 *
 * @param {object} element - The React element or fiber node to extract the debug owner stack from.
 * @returns {Array<any>|null} An array representing the stack of debug owners, or null if input is invalid.
 */
function getDebugOwnerStack(element) {
  // Transform the input using findMountedFiberById(processInputWithTransform)
  const processedElement = findMountedFiberById(element);
  if (processedElement == null) return null;

  // Start the stack with the processed element'createInteractionAccessor Ay representation
  const debugOwnerStack = [Ay(processedElement)];
  let currentOwner = processedElement._debugOwner;

  // Traverse up the debug owner chain as long as the tag is a number (React Fiber node)
  while (currentOwner != null) {
    if (typeof currentOwner.tag === "number") {
      debugOwnerStack.unshift(Ay(currentOwner));
      currentOwner = currentOwner._debugOwner;
    } else {
      break;
    }
  }

  return debugOwnerStack;
}

module.exports = getDebugOwnerStack;