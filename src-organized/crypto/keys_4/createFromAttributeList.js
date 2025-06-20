/**
 * Converts an object'createInteractionAccessor own enumerable string-keyed property [key, value] pairs
 * into an attribute list using the na.FromAttributeList utility.
 *
 * @param {Object} attributeObject - The object containing attributes as key-value pairs.
 * @returns {any} The result of na.FromAttributeList called with the object'createInteractionAccessor entries.
 */
function createFromAttributeList(attributeObject) {
  // Convert the object into an array of [key, value] pairs
  const attributeEntries = Object.entries(attributeObject);
  // Pass the entries to na.FromAttributeList to process them
  return na.FromAttributeList(attributeEntries);
}

module.exports = createFromAttributeList;
