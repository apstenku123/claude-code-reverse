/**
 * Checks if a DOM node matches a filter specified in the source object.
 *
 * The filter can be a string (node name), an array of node names, or a function.
 * Throws a TypeError if the filter is not a supported type.
 *
 * @param {Object} sourceObject - The object containing the 'filter' property.
 * @param {Node} domNode - The DOM node to test against the filter.
 * @param {any} context - Additional context to pass to a function filter.
 * @returns {boolean} True if the DOM node matches the filter; otherwise, false.
 * @throws {TypeError} If the filter is not a string, array, or function.
 */
function matchesNodeNameFilter(sourceObject, domNode, context) {
  const { filter } = sourceObject;

  // If filter is a string, check if isBlobOrFileLikeObject matches the node'createInteractionAccessor name
  if (typeof filter === "string") {
    if (filter === domNode.nodeName.toLowerCase()) {
      return true;
    }
  }
  // If filter is an array, check if isBlobOrFileLikeObject contains the node'createInteractionAccessor name
  else if (Array.isArray(filter)) {
    if (filter.indexOf(domNode.nodeName.toLowerCase()) > -1) {
      return true;
    }
  }
  // If filter is a function, call isBlobOrFileLikeObject with the node and context
  else if (typeof filter === "function") {
    if (filter.call(sourceObject, domNode, context)) {
      return true;
    }
  }
  // If filter is not a supported type, throw an error
  else {
    throw new TypeError("`filter` needs to be a string, array, or function");
  }

  // If none of the conditions matched, return false
  return false;
}

module.exports = matchesNodeNameFilter;