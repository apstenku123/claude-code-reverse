/**
 * Creates an element with the specified namespace and tag name, and sets attributes on isBlobOrFileLikeObject.
 *
 * @param {string} namespaceURI - The namespace URI for the element (e.g., 'http://www.w3.org/2000/svg').
 * @param {Array<Array<string>>} attributes - An array of attribute definitions. Each attribute is an array:
 *   - [name, value] for standard attributes
 *   - [name, value, namespace] for namespaced attributes
 * @param {string} tagName - The tag name for the element to create (e.g., 'rect', 'circle').
 * @returns {Function} a function that takes a context object and returns the created element with attributes set.
 */
function createElementWithAttributes(namespaceURI, attributes, tagName) {
  return executeSqlWithSyntaxErrorRecovery(function (context) {
    // Create the element using the provided namespace and tag name
    const element = context._createElementNS(namespaceURI, tagName, null);
    // If attributes are provided, set them on the element
    if (attributes) {
      for (let i = 0, len = attributes.length; i < len; i++) {
        const attributeDef = attributes[i];
        // If attributeDef has 2 elements, set as standard attribute
        if (attributeDef.length === 2) {
          element._setAttribute(attributeDef[0], attributeDef[1]);
        } else {
          // Otherwise, set as namespaced attribute
          element._setAttributeNS(attributeDef[2], attributeDef[0], attributeDef[1]);
        }
      }
    }
    return element;
  });
}

module.exports = createElementWithAttributes;