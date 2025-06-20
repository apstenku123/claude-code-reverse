/**
 * Parses interaction attributes from a string, array, or object and returns a mapping of attribute names
 * to their associated namespace and processed metadata. Handles nested objects recursively and supports
 * optional lowercasing of attribute names.
 *
 * @param {string | string[] | Object} attributes - The attributes to parse. Can be a space-delimited string, an array of strings, or a nested object.
 * @param {boolean} [shouldLowercase=false] - Whether to lowercase attribute names.
 * @param {string} [namespace=zd9] - The namespace to associate with the attributes. Used for recursion.
 * @returns {Object} a mapping of attribute names to an array containing the namespace and processed metadata.
 */
function parseInteractionAttributes(attributes, shouldLowercase = false, namespace = zd9) {
  const attributeMap = {};

  // Helper function to process a list of attribute strings
  function processAttributes(currentNamespace, attributeList) {
    // Lowercase attribute names if requested
    const processedList = shouldLowercase
      ? attributeList.map(attribute => attribute.toLowerCase())
      : attributeList;

    processedList.forEach(attributeEntry => {
      // Split attribute entry into name and optional metadata (e.g., 'foo|bar')
      const [attributeName, attributeMeta] = attributeEntry.split("|");
      // Map attribute name to [namespace, processed metadata]
      attributeMap[attributeName] = [currentNamespace, getConfigOrObservableStatus(attributeName, attributeMeta)];
    });
  }

  if (typeof attributes === "string") {
    // If input is a string, split by spaces and process
    processAttributes(namespace, attributes.split(" "));
  } else if (Array.isArray(attributes)) {
    // If input is an array, process directly
    processAttributes(namespace, attributes);
  } else if (typeof attributes === "object" && attributes !== null) {
    // If input is an object, recursively process each key/value pair
    Object.keys(attributes).forEach(key => {
      Object.assign(
        attributeMap,
        parseInteractionAttributes(attributes[key], shouldLowercase, key)
      );
    });
  }

  return attributeMap;
}

module.exports = parseInteractionAttributes;