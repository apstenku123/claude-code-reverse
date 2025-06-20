/**
 * Converts an object'createInteractionAccessor key-value pairs into an observable using na.FromAttributeList.
 *
 * @param {Object} attributeObject - The object containing attribute key-value pairs to convert.
 * @returns {any} An observable created from the object'createInteractionAccessor entries.
 */
function convertAttributeObjectToObservable(attributeObject) {
  // Convert the attribute object into an array of [key, value] pairs
  const attributeEntries = Object.entries(attributeObject);
  // Pass the entries to na.FromAttributeList to create an observable
  return na.FromAttributeList(attributeEntries);
}

module.exports = convertAttributeObjectToObservable;