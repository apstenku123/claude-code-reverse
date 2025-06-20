/**
 * Applies an edit operation (insert, update, or delete) to an AST-like document structure.
 *
 * @param {string} documentText - The original document text to be modified.
 * @param {Array<string|number>} path - The path to the target node in the AST (array of property names or indices).
 * @param {any} value - The value to insert or update at the target location. If undefined, the operation is a delete.
 * @param {object} options - Additional options and helpers for the operation (e.g., formatting, insertion index helpers).
 * @returns {any} The result of the formatting operation, or an empty array if nothing is changed.
 * @throws {Error} If the operation cannot be performed (e.g., invalid path, malformed AST, or insufficient array length).
 */
function applyAstEditOperation(documentText, path, value, options) {
  // Clone the path to avoid mutating the original
  let remainingPath = path.slice();
  // Parse the document into an AST node structure
  const rootAstNode = delegateAsyncGenerator(documentText, []);
  let parentNode;
  let currentKeyOrIndex;

  // Traverse the path from the end, building up the value if needed
  while (remainingPath.length > 0) {
    currentKeyOrIndex = remainingPath.pop();
    parentNode = traverseAstByPath(rootAstNode, remainingPath);
    // If the parent node does not exist, and handleMissingDoctypeError have a value to insert, build up the value structure
    if (parentNode === undefined && value !== undefined) {
      if (typeof currentKeyOrIndex === "string") {
        value = { [currentKeyOrIndex]: value };
      } else {
        value = [value];
      }
    } else {
      break;
    }
  }

  // If parent node still not found, handle as root-level insert or delete
  if (!parentNode) {
    if (value === undefined) {
      throw new Error("Can not delete in empty document");
    }
    // Insert or replace at the root
    return processFormattingWithOptions(documentText, {
      offset: rootAstNode ? rootAstNode.offset : 0,
      length: rootAstNode ? rootAstNode.length : 0,
      content: JSON.stringify(value)
    }, options);
  }

  // Handle object property operations
  if (
    parentNode.type === "object" &&
    typeof currentKeyOrIndex === "string" &&
    Array.isArray(parentNode.children)
  ) {
    // Find the property node for the given key
    const propertyNode = traverseAstByPath(parentNode, [currentKeyOrIndex]);
    if (propertyNode !== undefined) {
      // Property exists
      if (value === undefined) {
        // Delete property
        if (!propertyNode.parent) {
          throw new Error("Malformed AST");
        }
        const parentIndex = parentNode.children.indexOf(propertyNode.parent);
        let deleteStartOffset;
        let deleteEndOffset = propertyNode.parent.offset + propertyNode.parent.length;
        if (parentIndex > 0) {
          // Remove comma before the property
          const previousProperty = parentNode.children[parentIndex - 1];
          deleteStartOffset = previousProperty.offset + previousProperty.length;
        } else {
          // Remove comma after the property (if any)
          deleteStartOffset = parentNode.offset + 1;
          if (parentNode.children.length > 1) {
            deleteEndOffset = parentNode.children[1].offset;
          }
        }
        return processFormattingWithOptions(documentText, {
          offset: deleteStartOffset,
          length: deleteEndOffset - deleteStartOffset,
          content: ""
        }, options);
      } else {
        // Update property value
        return processFormattingWithOptions(documentText, {
          offset: propertyNode.offset,
          length: propertyNode.length,
          content: JSON.stringify(value)
        }, options);
      }
    } else {
      // Property does not exist
      if (value === undefined) {
        // Nothing to delete
        return [];
      }
      // Insert new property
      const propertyString = `${JSON.stringify(currentKeyOrIndex)}: ${JSON.stringify(value)}`;
      // Determine insertion index
      const insertionIndex = options.getInsertionIndex
        ? options.getInsertionIndex(parentNode.children.map(child => child.children[0].value))
        : parentNode.children.length;
      let insertEdit;
      if (insertionIndex > 0) {
        // Insert after previous property with a comma
        const previousProperty = parentNode.children[insertionIndex - 1];
        insertEdit = {
          offset: previousProperty.offset + previousProperty.length,
          length: 0,
          content: "," + propertyString
        };
      } else if (parentNode.children.length === 0) {
        // Insert as the first property
        insertEdit = {
          offset: parentNode.offset + 1,
          length: 0,
          content: propertyString
        };
      } else {
        // Insert before the first property, with a comma after
        insertEdit = {
          offset: parentNode.offset + 1,
          length: 0,
          content: propertyString + ","
        };
      }
      return processFormattingWithOptions(documentText, insertEdit, options);
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
      const elementString = `${JSON.stringify(value)}`;
      let appendEdit;
      if (parentNode.children.length === 0) {
        // Insert as first element
        appendEdit = {
          offset: parentNode.offset + 1,
          length: 0,
          content: elementString
        };
      } else {
        // Insert after last element, with a comma
        const lastElement = parentNode.children[parentNode.children.length - 1];
        appendEdit = {
          offset: lastElement.offset + lastElement.length,
          length: 0,
          content: "," + elementString
        };
      }
      return processFormattingWithOptions(documentText, appendEdit, options);
    } else if (value === undefined && parentNode.children.length >= 0) {
      // Delete array element
      const elementToDeleteIndex = arrayIndex;
      const elementToDelete = parentNode.children[elementToDeleteIndex];
      let deleteEdit;
      if (parentNode.children.length === 1) {
        // Remove the only element
        deleteEdit = {
          offset: parentNode.offset + 1,
          length: parentNode.length - 2,
          content: ""
        };
      } else if (parentNode.children.length - 1 === elementToDeleteIndex) {
        // Remove last element (and comma before)
        const previousElement = parentNode.children[elementToDeleteIndex - 1];
        const previousEnd = previousElement.offset + previousElement.length;
        const arrayEnd = parentNode.offset + parentNode.length;
        deleteEdit = {
          offset: previousEnd,
          length: arrayEnd - 2 - previousEnd,
          content: ""
        };
      } else {
        // Remove element and comma after
        deleteEdit = {
          offset: elementToDelete.offset,
          length: parentNode.children[elementToDeleteIndex + 1].offset - elementToDelete.offset,
          content: ""
        };
      }
      return processFormattingWithOptions(documentText, deleteEdit, options);
    } else if (value !== undefined) {
      // Insert or update array element
      let edit;
      const elementString = `${JSON.stringify(value)}`;
      if (!options.isArrayInsertion && parentNode.children.length > arrayIndex) {
        // Update existing element
        const elementToUpdate = parentNode.children[arrayIndex];
        edit = {
          offset: elementToUpdate.offset,
          length: elementToUpdate.length,
          content: elementString
        };
      } else if (parentNode.children.length === 0 || arrayIndex === 0) {
        // Insert as first element
        edit = {
          offset: parentNode.offset + 1,
          length: 0,
          content: parentNode.children.length === 0 ? elementString : elementString + ","
        };
      } else {
        // Insert after previous element
        const insertAt = arrayIndex > parentNode.children.length
          ? parentNode.children.length
          : arrayIndex;
        const previousElement = parentNode.children[insertAt - 1];
        edit = {
          offset: previousElement.offset + previousElement.length,
          length: 0,
          content: "," + elementString
        };
      }
      return processFormattingWithOptions(documentText, edit, options);
    } else {
      throw new Error(`Can not ${value === undefined ? "remove" : options.isArrayInsertion ? "insert" : "modify"} Array index ${arrayIndex} as length is not sufficient`);
    }
  }

  // If none of the above, the operation is invalid for the parent node type
  throw new Error(`Can not add ${typeof currentKeyOrIndex !== "number" ? "index" : "property"} to parent of type ${parentNode.type}`);
}

module.exports = applyAstEditOperation;