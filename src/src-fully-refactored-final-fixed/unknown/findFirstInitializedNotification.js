/**
 * Searches up to three levels deep in the child chain of the given node for an initialized notification.
 * Returns the first initialized notification found where the node'createInteractionAccessor type is a function, otherwise returns the first found notification,
 * or the string 'Anonymous' if none are found.
 *
 * @param {Object} node - The root node to start searching from. Must have a 'child' property.
 * @returns {any} The first initialized notification found (with function type),
 *                or the first notification found, or the string 'Anonymous' if none are found.
 */
function findFirstInitializedNotification(node) {
  let functionNotification = null; // Stores the first notification with a function type
  let firstNotification = null;    // Stores the first notification found (any type)
  let currentChild = node.child;   // Start with the first child node

  // Search up to three levels deep in the child chain
  for (let depth = 0; depth < 3; depth++) {
    if (currentChild === null) break;
    const initializedNotification = initializeNotification(currentChild);
    if (initializedNotification !== null) {
      // If the child node'createInteractionAccessor type is a function, prioritize this notification
      if (typeof currentChild.type === "function") {
        functionNotification = initializedNotification;
      } else if (firstNotification === null) {
        // Otherwise, store the first notification found
        firstNotification = initializedNotification;
      }
    }
    // If a function notification has been found, stop searching
    if (functionNotification !== null) break;
    // Move to the next child in the chain
    currentChild = currentChild.child;
  }
  // Return the prioritized notification, or fallback to the first found, or 'Anonymous' if none found
  return functionNotification || firstNotification || "Anonymous";
}

module.exports = findFirstInitializedNotification;