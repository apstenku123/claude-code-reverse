/**
 * Searches up to 5 levels of the DOM tree, starting from the given element,
 * to find an ancestor HTMLElement with a 'data-sentry-component' attribute.
 * Returns the value of that attribute if found, otherwise returns null.
 *
 * @param {HTMLElement|null} startElement - The DOM element to start searching from.
 * @returns {string|null} The value of the 'data-sentry-component' attribute if found, otherwise null.
 */
function findSentryComponentInAncestors(startElement) {
  // Ensure the environment supports HTMLElement (e.g., not running in a non-DOM context)
  if (!xy.HTMLElement) return null;

  let currentElement = startElement;
  const maxAncestorLevels = 5;

  // Traverse up to 5 ancestor levels
  for (let level = 0; level < maxAncestorLevels; level++) {
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

  // No ancestor with the sentry component attribute was found
  return null;
}

module.exports = findSentryComponentInAncestors;