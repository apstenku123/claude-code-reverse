/**
 * Creates a predicate function that checks if a given DOM element is an HTML element with a specific name attribute.
 *
 * @param {string} targetName - The value to match against the element'createInteractionAccessor 'name' attribute.
 * @returns {(element: Element) => boolean} Predicate function that returns true if the element is an HTML element with the specified name attribute.
 */
function createHtmlElementNameMatcher(targetName) {
  return function(element) {
    // Check if the element'createInteractionAccessor namespace is HTML
    if (element.namespaceURI !== QE.HTML) {
      return false;
    }
    // Check if the element'createInteractionAccessor 'name' attribute matches the target name
    return element.getAttribute("name") === targetName;
  };
}

module.exports = createHtmlElementNameMatcher;