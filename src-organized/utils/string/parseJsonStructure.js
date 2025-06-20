/**
 * Parses a JSON-like structure from the given source and builds a tree representation with metadata.
 *
 * @param {string} jsonString - The JSON string to parse.
 * @param {Array<Object>} [errors=[]] - An array to collect error objects encountered during parsing.
 * @param {string} [parseMode=$i.DEFAULT] - Optional parsing mode or configuration.
 * @returns {Object|undefined} The root node of the parsed structure tree, or undefined if parsing fails.
 */
function parseJsonStructure(jsonString, errors = [], parseMode = $i.DEFAULT) {
  /**
   * The current node in the tree being constructed.
   * @type {Object}
   */
  let currentNode = {
    type: "array",
    offset: -1,
    length: -1,
    children: [],
    parent: undefined
  };

  /**
   * Handles the end of a property node by updating its length and moving up to its parent.
   * @param {number} endOffset - The offset where the property ends.
   */
  function closePropertyNode(endOffset) {
    if (currentNode.type === "property") {
      currentNode.length = endOffset - currentNode.offset;
      currentNode = currentNode.parent;
    }
  }

  /**
   * Adds a child node to the current node and returns the child node.
   * @param {Object} childNode - The node to add as a child.
   * @returns {Object} The added child node.
   */
  function addChildNode(childNode) {
    currentNode.children.push(childNode);
    return childNode;
  }

  // Begin parsing using the external parseJsonWithCallbacks parser utility
  parseJsonWithCallbacks(jsonString, {
    /**
     * Called when an object begins in the JSON string.
     * @param {number} offset - The offset where the object begins.
     */
    onObjectBegin: offset => {
      currentNode = addChildNode({
        type: "object",
        offset: offset,
        length: -1,
        parent: currentNode,
        children: []
      });
    },
    /**
     * Called when a property is encountered in an object.
     * @param {string} propertyName - The property name.
     * @param {number} offset - The offset where the property begins.
     * @param {number} length - The length of the property name.
     */
    onObjectProperty: (propertyName, offset, length) => {
      currentNode = addChildNode({
        type: "property",
        offset: offset,
        length: -1,
        parent: currentNode,
        children: []
      });
      // Add the property name as a string node
      currentNode.children.push({
        type: "string",
        value: propertyName,
        offset: offset,
        length: length,
        parent: currentNode
      });
    },
    /**
     * Called when an object ends in the JSON string.
     * @param {number} offset - The offset where the object ends.
     * @param {number} length - The length of the object.
     */
    onObjectEnd: (offset, length) => {
      closePropertyNode(offset + length);
      currentNode.length = offset + length - currentNode.offset;
      currentNode = currentNode.parent;
      closePropertyNode(offset + length);
    },
    /**
     * Called when an array begins in the JSON string.
     * @param {number} offset - The offset where the array begins.
     * @param {number} length - The length of the array (not used here).
     */
    onArrayBegin: (offset, length) => {
      currentNode = addChildNode({
        type: "array",
        offset: offset,
        length: -1,
        parent: currentNode,
        children: []
      });
    },
    /**
     * Called when an array ends in the JSON string.
     * @param {number} offset - The offset where the array ends.
     * @param {number} length - The length of the array.
     */
    onArrayEnd: (offset, length) => {
      currentNode.length = offset + length - currentNode.offset;
      currentNode = currentNode.parent;
      closePropertyNode(offset + length);
    },
    /**
     * Called when a literal value (string, number, boolean, null) is encountered.
     * @param {any} value - The literal value.
     * @param {number} offset - The offset where the value begins.
     * @param {number} length - The length of the value.
     */
    onLiteralValue: (value, offset, length) => {
      addChildNode({
        type: getTypeAsString(value), // Determine the type of the literal value
        offset: offset,
        length: length,
        parent: currentNode,
        value: value
      });
      closePropertyNode(offset + length);
    },
    /**
     * Called when a separator (colon or comma) is encountered.
     * @param {string} separator - The separator character.
     * @param {number} offset - The offset where the separator is found.
     * @param {number} length - The length of the separator (not used here).
     */
    onSeparator: (separator, offset, length) => {
      if (currentNode.type === "property") {
        if (separator === ":") {
          currentNode.colonOffset = offset;
        } else if (separator === ",") {
          closePropertyNode(offset);
        }
      }
    },
    /**
     * Called when a parsing error occurs.
     * @param {string} error - The error message or code.
     * @param {number} offset - The offset where the error occurred.
     * @param {number} length - The length of the error region.
     */
    onError: (error, offset, length) => {
      errors.push({
        error: error,
        offset: offset,
        length: length
      });
    }
  }, parseMode);

  // The root node is the first child of the initial node
  const rootNode = currentNode.children[0];
  if (rootNode) {
    // Remove parent reference from root node for cleanliness
    delete rootNode.parent;
  }
  return rootNode;
}

module.exports = parseJsonStructure;
