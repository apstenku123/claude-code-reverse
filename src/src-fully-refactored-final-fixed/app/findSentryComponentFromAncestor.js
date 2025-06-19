/**
 * Traverses up to 5 levels of the DOM tree from the given element to find an ancestor
 * HTMLElement that has a 'data-sentry-component' attribute. Returns the value of that attribute if found.
 *
 * @param {HTMLElement|null} startElement - The DOM element to start searching from.
 * @returns {string|null} The value of the 'data-sentry-component' attribute if found, otherwise null.
 */
function findSentryComponentFromAncestor(startElement) {
  // Ensure the environment supports HTMLElement
  if (!xy.HTMLElement) return null;

  let currentElement = startElement;
  const maxAncestorLevels = 5;

  // Traverse up to 5 ancestors
  for (let level = 0; level < maxAncestorLevels; level++) {
    if (!currentElement) return null;
    // Check if current element is an HTMLElement and has the sentry component data attribute
    if (
      currentElement instanceof HTMLElement &&
      currentElement.dataset.sentryComponent
    ) {
      return currentElement.dataset.sentryComponent;
    }
    // Move up to the parent node
    currentElement = currentElement.parentNode;
  }
  // If not found after traversing, return null
  return null;
}

module.exports = findSentryComponentFromAncestor;