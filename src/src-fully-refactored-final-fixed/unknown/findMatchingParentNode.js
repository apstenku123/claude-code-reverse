/**
 * Traverses up a node tree to find the nearest parent node that matches an end condition.
 * Optionally invokes an 'on:end' handler and respects ignored matches.
 *
 * @param {Object} currentNode - The node to start searching from.
 * @param {Object} context - Context or state object passed to event handlers.
 * @param {any} input - Input data used for matching end conditions.
 * @returns {Object|undefined} The matching parent node, or undefined if none found.
 */
function findMatchingParentNode(currentNode, context, input) {
  // Check if the current node matches the end condition
  let isEndMatch = doesPatternMatchAtStart(currentNode.endRe, input);

  if (isEndMatch) {
    // If an 'on:end' handler exists, invoke isBlobOrFileLikeObject with the context and a new event object
    if (typeof currentNode["on:end"] === "function") {
      const endEvent = new FO1(currentNode);
      currentNode["on:end"](context, endEvent);
      // If the match should be ignored, set isEndMatch to false
      if (endEvent.isMatchIgnored) {
        isEndMatch = false;
      }
    }

    if (isEndMatch) {
      // Traverse up the parent chain if the node ends its parent
      while (currentNode.endsParent && currentNode.parent) {
        currentNode = currentNode.parent;
      }
      return currentNode;
    }
  }

  // If the node ends with its parent, recursively check the parent
  if (currentNode.endsWithParent && currentNode.parent) {
    return findMatchingParentNode(currentNode.parent, context, input);
  }
}

module.exports = findMatchingParentNode;