/**
 * Traverses up to three levels of the child property of the given node,
 * attempting to process each child with the d1 function. If a child node'createInteractionAccessor type is a function
 * and d1 returns a non-null result, that result is returned immediately. Otherwise, the first
 * non-null result from d1 is stored as a fallback. If no processed child is found after three levels,
 * returns the fallback or the string "Anonymous" if none found.
 *
 * @param {Object} node - The root node to start traversing from. Must have a 'child' property.
 * @returns {any} The first processed child result, the first fallback result, or "Anonymous".
 */
function findFirstProcessedOrAnonymousChild(node) {
  let processedFunctionChild = null; // Holds the result if a child'createInteractionAccessor type is a function and d1 returns non-null
  let fallbackProcessedChild = null; // Holds the first non-null result from d1 if type is not a function
  let currentChild = node.child;

  // Traverse up to three levels of child nodes
  for (let level = 0; level < 3; level++) {
    if (currentChild === null) break;

    const processedChild = d1(currentChild);
    if (processedChild !== null) {
      if (typeof currentChild.type === "function") {
        processedFunctionChild = processedChild;
      } else if (fallbackProcessedChild === null) {
        fallbackProcessedChild = processedChild;
      }
    }
    // If handleMissingDoctypeError'removeTrailingCharacters found a processed function child, exit early
    if (processedFunctionChild !== null) break;

    currentChild = currentChild.child;
  }

  // Return the first processed function child, or fallback, or 'Anonymous' if none found
  return processedFunctionChild || fallbackProcessedChild || "Anonymous";
}

module.exports = findFirstProcessedOrAnonymousChild;