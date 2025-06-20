/**
 * Traverses up to 5 levels of the DOM tree from the given element to find an ancestor
 * that is an HTMLElement and has a 'data-sentry-component' attribute. Returns the value
 * of that attribute if found, otherwise returns null.
 *
 * @param {HTMLElement|null|undefined} startElement - The DOM element to start searching from.
 * @returns {string|null} The value of the 'data-sentry-component' attribute if found, otherwise null.
 */
function findSentryComponentFromElement(startElement) {
  // Ensure the environment supports HTMLElement
  if (!xy.HTMLElement) return null;

  let currentElement = startElement;
  const maxTraversalDepth = 5;

  // Traverse up to 5 ancestors in the DOM tree
  for (let depth = 0; depth < maxTraversalDepth; depth++) {
    if (!currentElement) return null;
    // Check if the current node is an HTMLElement and has the sentry component data attribute
    if (
      currentElement instanceof HTMLElement &&
      currentElement.dataset.sentryComponent
    ) {
      return currentElement.dataset.sentryComponent;
    }
    // Move up to the parent node
    currentElement = currentElement.parentNode;
  }
  // No matching element found within the traversal depth
  return null;
}

module.exports = findSentryComponentFromElement;