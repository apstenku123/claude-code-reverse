/**
 * Traverses up to three levels of the child property of a given node,
 * attempting to extract a component name using the d1 helper function.
 * Prefers function-type components; otherwise, returns the first found name.
 * If no name is found, returns "Anonymous".
 *
 * @param {Object} node - The starting node to search for a component name.
 * @returns {string} The found component name, or "Anonymous" if none found.
 */
function findFirstOrAnonymousComponentName(node) {
  let functionComponentName = null;
  let firstComponentName = null;
  let currentChild = node.child;

  // Traverse up to three levels deep into the child property
  for (let depth = 0; depth < 3; depth++) {
    if (currentChild === null) break;

    // Attempt to extract a component name using d1
    const componentName = d1(currentChild);
    if (componentName !== null) {
      // Prefer function-type components
      if (typeof currentChild.type === "function") {
        functionComponentName = componentName;
      } else if (firstComponentName === null) {
        firstComponentName = componentName;
      }
    }

    // If a function component name is found, stop searching
    if (functionComponentName !== null) break;
    currentChild = currentChild.child;
  }

  // Return the best found name, or "Anonymous" if none found
  return functionComponentName || firstComponentName || "Anonymous";
}

module.exports = findFirstOrAnonymousComponentName;