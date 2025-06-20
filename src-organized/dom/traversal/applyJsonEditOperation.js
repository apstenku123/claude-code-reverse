/**
 * Applies an edit operation (insert, update, or delete) to a JSON document represented as an AST.
 *
 * @param {string} jsonText - The original JSON document as a string.
 * @param {Array<string|number>} path - The path to the property or array index to edit (as a list of keys or indices).
 * @param {any} newValue - The value to insert or update. If undefined, the operation is a delete.
 * @param {object} options - Additional options and utility functions for the operation.
 * @returns {any} The result of the formatting operation, or an empty array if nothing was changed.
 * @throws {Error} If the operation is invalid (e.g., deleting from an empty document or malformed AST).
 */
function applyJsonEditOperation(jsonText, path, newValue, options) {
  // Clone the path array to avoid mutating the original
  let remainingPath = path.slice();
  // Parse the JSON text into an AST node
  const rootNode = eO1(jsonText, []);
  let parentNode = undefined;
  let currentKeyOrIndex = undefined;

  // Traverse the path from the end, building up the newValue object/array if necessary
  while (remainingPath.length > 0) {
    currentKeyOrIndex = remainingPath.pop();
    parentNode = traverseAstByPath(rootNode, remainingPath);
    if (parentNode === undefined && newValue !== undefined) {
      // If the parent node does not exist, build up the newValue structure
      if (typeof currentKeyOrIndex === "string") {
        newValue = { [currentKeyOrIndex]: newValue };
      } else {
        newValue = [newValue];
      }
    } else {
      // Found the parent node or no new value to insert
      break;
    }
  }

  // If parentNode is still undefined, handleMissingDoctypeError're inserting into an empty document
  if (!parentNode) {
    if (newValue === undefined) {
      throw new Error("Can not delete in empty document");
    }
    return processFormattingWithOptions(jsonText, {
      offset: rootNode ? rootNode.offset : 0,
      length: rootNode ? rootNode.length : 0,
      content: JSON.stringify(newValue)
    }, options);
  }

  // Handle object property operations
  if (
    parentNode.type === "object" &&
    typeof currentKeyOrIndex === "string" &&
    Array.isArray(parentNode.children)
  ) {
    const propertyNode = traverseAstByPath(parentNode, [currentKeyOrIndex]);
    if (propertyNode !== undefined) {
      // Property exists
      if (newValue === undefined) {
        // Delete property
        if (!propertyNode.parent) {
          throw new Error("Malformed AST");
        }
        const parentIndex = parentNode.children.indexOf(propertyNode.parent);
        let deleteOffset;
        let deleteEnd;
        if (parentIndex > 0) {
          // Remove property and preceding comma
          const previousProperty = parentNode.children[parentIndex - 1];
          deleteOffset = previousProperty.offset + previousProperty.length;
        } else {
          // Remove property and following comma (if any)
          deleteOffset = parentNode.offset + 1;
          if (parentNode.children.length > 1) {
            deleteEnd = parentNode.children[1].offset;
          } else {
            deleteEnd = propertyNode.parent.offset + propertyNode.parent.length;
          }
        }
        if (deleteEnd === undefined) {
          deleteEnd = propertyNode.parent.offset + propertyNode.parent.length;
        }
        return processFormattingWithOptions(jsonText, {
          offset: deleteOffset,
          length: deleteEnd - deleteOffset,
          content: ""
        }, options);
      } else {
        // Update property value
        return processFormattingWithOptions(jsonText, {
          offset: propertyNode.offset,
          length: propertyNode.length,
          content: JSON.stringify(newValue)
        }, options);
      }
    } else {
      // Property does not exist
      if (newValue === undefined) {
        // Nothing to delete
        return [];
      }
      // Insert new property
      const propertyString = `${JSON.stringify(currentKeyOrIndex)}: ${JSON.stringify(newValue)}`;
      const insertionIndex = options.getInsertionIndex
        ? options.getInsertionIndex(parentNode.children.map(child => child.children[0].value))
        : parentNode.children.length;
      let insertEdit;
      if (insertionIndex > 0) {
        // Insert after previous property, with comma
        const previousProperty = parentNode.children[insertionIndex - 1];
        insertEdit = {
          offset: previousProperty.offset + previousProperty.length,
          length: 0,
          content: "," + propertyString
        };
      } else if (parentNode.children.length === 0) {
        // Insert as first property in empty object
        insertEdit = {
          offset: parentNode.offset + 1,
          length: 0,
          content: propertyString
        };
      } else {
        // Insert as first property, with trailing comma
        insertEdit = {
          offset: parentNode.offset + 1,
          length: 0,
          content: propertyString + ","
        };
      }
      return processFormattingWithOptions(jsonText, insertEdit, options);
    }
  }

  // Handle array element operations
  if (
    parentNode.type === "array" &&
    typeof currentKeyOrIndex === "number" &&
    Array.isArray(parentNode.children)
  ) {
    const arrayIndex = currentKeyOrIndex;
    if (arrayIndex === -1) {
      // Append to array
      const elementString = `${JSON.stringify(newValue)}`;
      let appendEdit;
      if (parentNode.children.length === 0) {
        // Insert as first element
        appendEdit = {
          offset: parentNode.offset + 1,
          length: 0,
          content: elementString
        };
      } else {
        // Insert after last element, with comma
        const lastElement = parentNode.children[parentNode.children.length - 1];
        appendEdit = {
          offset: lastElement.offset + lastElement.length,
          length: 0,
          content: "," + elementString
        };
      }
      return processFormattingWithOptions(jsonText, appendEdit, options);
    } else if (newValue === undefined && parentNode.children.length >= 0) {
      // Remove array element
      const removeIndex = arrayIndex;
      const elementNode = parentNode.children[removeIndex];
      let removeEdit;
      if (parentNode.children.length === 1) {
        // Remove only element
        removeEdit = {
          offset: parentNode.offset + 1,
          length: parentNode.length - 2,
          content: ""
        };
      } else if (parentNode.children.length - 1 === removeIndex) {
        // Remove last element and preceding comma
        const previousElement = parentNode.children[removeIndex - 1];
        const previousEnd = previousElement.offset + previousElement.length;
        const arrayEnd = parentNode.offset + parentNode.length;
        removeEdit = {
          offset: previousEnd,
          length: arrayEnd - 2 - previousEnd,
          content: ""
        };
      } else {
        // Remove element and following comma
        removeEdit = {
          offset: elementNode.offset,
          length: parentNode.children[removeIndex + 1].offset - elementNode.offset,
          content: ""
        };
      }
      return processFormattingWithOptions(jsonText, removeEdit, options);
    } else if (newValue !== undefined) {
      // Insert or update array element
      let arrayEdit;
      const elementString = `${JSON.stringify(newValue)}`;
      if (!options.isArrayInsertion && parentNode.children.length > arrayIndex) {
        // Update existing element
        const elementNode = parentNode.children[arrayIndex];
        arrayEdit = {
          offset: elementNode.offset,
          length: elementNode.length,
          content: elementString
        };
      } else if (parentNode.children.length === 0 || arrayIndex === 0) {
        // Insert as first element
        arrayEdit = {
          offset: parentNode.offset + 1,
          length: 0,
          content: parentNode.children.length === 0 ? elementString : elementString + ","
        };
      } else {
        // Insert after previous element, with comma
        const insertIndex = arrayIndex > parentNode.children.length ? parentNode.children.length : arrayIndex;
        const previousElement = parentNode.children[insertIndex - 1];
        arrayEdit = {
          offset: previousElement.offset + previousElement.length,
          length: 0,
          content: "," + elementString
        };
      }
      return processFormattingWithOptions(jsonText, arrayEdit, options);
    } else {
      throw new Error(`Can not ${newValue === undefined ? "remove" : options.isArrayInsertion ? "insert" : "modify"} Array index ${arrayIndex} as length is not sufficient`);
    }
  }

  // If none of the above, the operation is invalid for the parent node type
  throw new Error(`Can not add ${typeof currentKeyOrIndex !== "number" ? "index" : "property"} to parent of type ${parentNode.type}`);
}

module.exports = applyJsonEditOperation;