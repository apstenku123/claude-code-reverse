/**
 * Parses a JSON-like input string and constructs an Abstract Syntax Tree (AST) representing the structure of the JSON.
 * Collects any parsing errors encountered during the process.
 *
 * @param {string} jsonString - The JSON-like string to parse.
 * @param {Array<Object>} [errors=[]] - An array to collect error objects encountered during parsing.
 * @param {Object} [options=$i.DEFAULT] - Optional parsing options for comment handling, trailing commas, etc.
 * @returns {Object|undefined} The root AST node representing the parsed JSON structure, or undefined if parsing fails.
 */
function parseJsonAstWithErrorCollection(jsonString, errors = [], options = $i.DEFAULT) {
  // The current node being constructed in the AST
  let currentNode = {
    type: "array",
    offset: -1,
    length: -1,
    children: [],
    parent: undefined
  };

  /**
   * Handles the completion of a property node by setting its length and moving up to its parent node.
   * @param {number} endOffset - The offset where the property ends.
   */
  function completePropertyNode(endOffset) {
    if (currentNode.type === "property") {
      currentNode.length = endOffset - currentNode.offset;
      currentNode = currentNode.parent;
    }
  }

  /**
   * Adds a child node to the current node'createInteractionAccessor children array and returns the child node.
   * @param {Object} childNode - The child AST node to add.
   * @returns {Object} The added child node.
   */
  function addChildNode(childNode) {
    currentNode.children.push(childNode);
    return childNode;
  }

  // Begin parsing using the provided callback-based parser
  parseJsonWithCallbacks(jsonString, {
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
      // Add the property key as a string node
      currentNode.children.push({
        type: "string",
        value: propertyName,
        offset: propertyOffset,
        length: propertyLength,
        parent: currentNode
      });
    },
    onObjectEnd: (objectOffset, objectLength) => {
      // Complete the current property node if needed, then complete the object node
      completePropertyNode(objectOffset + objectLength);
      currentNode.length = objectOffset + objectLength - currentNode.offset;
      currentNode = currentNode.parent;
      completePropertyNode(objectOffset + objectLength);
    },
    onArrayBegin: (arrayOffset, arrayLength) => {
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
      // Complete the array node
      currentNode.length = arrayOffset + arrayLength - currentNode.offset;
      currentNode = currentNode.parent;
      completePropertyNode(arrayOffset + arrayLength);
    },
    onLiteralValue: (value, valueOffset, valueLength) => {
      // Add a literal value node (string, number, boolean, null)
      addChildNode({
        type: getTypeOfValue(value),
        offset: valueOffset,
        length: valueLength,
        parent: currentNode,
        value: value
      });
      completePropertyNode(valueOffset + valueLength);
    },
    onSeparator: (separator, separatorOffset, separatorLength) => {
      // Handle property separators (colon and comma)
      if (currentNode.type === "property") {
        if (separator === ":") {
          currentNode.colonOffset = separatorOffset;
        } else if (separator === ",") {
          completePropertyNode(separatorOffset);
        }
      }
    },
    onError: (errorCode, errorOffset, errorLength) => {
      // Collect parsing errors
      errors.push({
        error: errorCode,
        offset: errorOffset,
        length: errorLength
      });
    }
  }, options);

  // The root AST node is the first child of the initial node
  const rootAstNode = currentNode.children[0];
  if (rootAstNode) {
    // Remove parent reference from root node for cleanliness
    delete rootAstNode.parent;
  }
  return rootAstNode;
}

module.exports = parseJsonAstWithErrorCollection;