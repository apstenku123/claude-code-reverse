/**
 * Creates an element with a specified namespace and sets its attributes.
 *
 * @param {string} namespaceURI - The namespace URI for the element.
 * @param {Array<Array<string>>} attributes - An array of attribute definitions. Each attribute is an array:
 *   - [name, value] for standard attributes
 *   - [name, value, namespace] for namespaced attributes
 * @param {string} tagName - The tag name of the element to create.
 * @returns {Function} - a function that takes a context object and returns the created element with attributes set.
 *
 * The context object is expected to have a `_createElementNS` method for element creation.
 */
function createElementWithAttributesNS(namespaceURI, attributes, tagName) {
  return executeSqlWithSyntaxErrorRecovery(function (context) {
    // Create the element with the specified namespace and tag name
    const element = context._createElementNS(namespaceURI, tagName, null);

    // If attributes are provided, set them on the element
    if (attributes) {
      for (let i = 0, len = attributes.length; i < len; i++) {
        const attributeDef = attributes[i];
        if (attributeDef.length === 2) {
          // Standard attribute: [name, value]
          element._setAttribute(attributeDef[0], attributeDef[1]);
        } else {
          // Namespaced attribute: [name, value, namespace]
          element._setAttributeNS(attributeDef[2], attributeDef[0], attributeDef[1]);
        }
      }
    }
    return element;
  });
}

module.exports = createElementWithAttributesNS;