/**
 * Converts an object'createInteractionAccessor key-value pairs into an attribute list using na.FromAttributeList.
 *
 * @param {Object} attributesObject - The object whose entries will be converted into an attribute list.
 * @returns {any} The result of na.FromAttributeList called with the object'createInteractionAccessor entries.
 */
function convertObjectToAttributeList(attributesObject) {
  // Convert the object into an array of [key, value] pairs
  const attributeEntries = Object.entries(attributesObject);
  // Pass the entries to na.FromAttributeList to create the attribute list
  return na.FromAttributeList(attributeEntries);
}

module.exports = convertObjectToAttributeList;