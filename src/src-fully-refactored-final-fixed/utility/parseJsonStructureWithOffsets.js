/**
 * Parses a JSON-like structure from a source string and constructs a tree representation
 * with detailed offset and length information for each node. Errors encountered during parsing
 * are collected in the provided errors array.
 *
 * @param {string} jsonSource - The JSON string to parse.
 * @param {Array<Object>} [errors=[]] - An array to collect error objects encountered during parsing.
 * @param {Object} [parseOptions=$i.DEFAULT] - Optional parsing options to customize the behavior.
 * @returns {Object|undefined} The root node of the parsed structure, or undefined if parsing fails.
 */
function parseJsonStructureWithOffsets(jsonSource, errors = [], parseOptions = $i.DEFAULT) {
  // The current node in the parse tree
  let currentNode = {
    type: "array",
    offset: -1,
    length: -1,
    children: [],
    parent: undefined
  };

  /**
   * Helper to close a property node and update its length.
   * @param {number} endOffset - The offset where the property ends.
   */
  function closePropertyNode(endOffset) {
    if (currentNode.type === "property") {
      currentNode.length = endOffset - currentNode.offset;
      currentNode = currentNode.parent;
    }
  }

  /**
   * Helper to add a child node to the current node and return the child.
   * @param {Object} childNode - The node to add as a child.
   * @returns {Object} The added child node.
   */
  function addChildNode(childNode) {
    currentNode.children.push(childNode);
    return childNode;
  }

  // Begin parsing using the provided callback-based parser
  parseJsonWithCallbacks(jsonSource, {
    onObjectBegin: (objectOffset) => {
      // Enter a new object node
      currentNode = addChildNode({
        type: "object",
        offset: objectOffset,
        length: -1,
        parent: currentNode,
        children: []
      });
    },
    onObjectProperty: (propertyName, propertyOffset, propertyLength) => {
      // Enter a new property node
      currentNode = addChildNode({
        type: "property",
        offset: propertyOffset,
        length: -1,
        parent: currentNode,
        children: []
      });
      // Add the property name as a string node
      currentNode.children.push({
        type: "string",
        value: propertyName,
        offset: propertyOffset,
        length: propertyLength,
        parent: currentNode
      });
    },
    onObjectEnd: (objectOffset, objectLength) => {
      // Close the current object node and update its length
      closePropertyNode(objectOffset + objectLength);
      currentNode.length = objectOffset + objectLength - currentNode.offset;
      currentNode = currentNode.parent;
      closePropertyNode(objectOffset + objectLength);
    },
    onArrayBegin: (arrayOffset, _arrayLength) => {
      // Enter a new array node
      currentNode = addChildNode({
        type: "array",
        offset: arrayOffset,
        length: -1,
        parent: currentNode,
        children: []
      });
    },
    onArrayEnd: (arrayOffset, arrayLength) => {
      // Close the current array node and update its length
      currentNode.length = arrayOffset + arrayLength - currentNode.offset;
      currentNode = currentNode.parent;
      closePropertyNode(arrayOffset + arrayLength);
    },
    onLiteralValue: (literalValue, valueOffset, valueLength) => {
      // Add a literal value node (string, number, boolean, null, etc.)
      addChildNode({
        type: getTypeAsString(literalValue),
        offset: valueOffset,
        length: valueLength,
        parent: currentNode,
        value: literalValue
      });
      closePropertyNode(valueOffset + valueLength);
    },
    onSeparator: (separatorChar, separatorOffset, _separatorLength) => {
      // Handle property separators (colon and comma)
      if (currentNode.type === "property") {
        if (separatorChar === ":") {
          currentNode.colonOffset = separatorOffset;
        } else if (separatorChar === ",") {
          closePropertyNode(separatorOffset);
        }
      }
    },
    onError: (errorMessage, errorOffset, errorLength) => {
      // Collect parsing errors
      errors.push({
        error: errorMessage,
        offset: errorOffset,
        length: errorLength
      });
    }
  }, parseOptions);

  // The root node is the first child of the initial dummy node
  const rootNode = currentNode.children[0];
  if (rootNode) {
    // Remove parent reference from the root node for cleanliness
    delete rootNode.parent;
  }
  return rootNode;
}

module.exports = parseJsonStructureWithOffsets;