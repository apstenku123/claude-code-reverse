/**
 * Updates an existing item in the collection with new properties, or adds the item if isBlobOrFileLikeObject does not exist.
 *
 * @param {Object} itemToAdd - The item to add or update, must have a 'name' property for identification.
 * @param {Array<Object>} collection - The array of items to search and update.
 * @param {Object} propertiesToUpdate - An object containing key-value pairs to update on the found item.
 * @returns {Array<Object>} The updated collection, with the item updated or added.
 */
function updateOrAddItemWithProperties(itemToAdd, collection, propertiesToUpdate) {
  // Try to find an existing item in the collection with the same name
  const existingItem = collection.find(item => item.name === itemToAdd.name);

  if (existingItem) {
    // If found, update its properties using the provided key-value pairs
    for (const [propertyKey, propertyValue] of Object.entries(propertiesToUpdate)) {
      setNestedPropertyValue(existingItem, propertyKey, propertyValue); // External function to update the property
    }
    return collection;
  }

  // If not found, add the new item to the collection
  return [...collection, itemToAdd];
}

module.exports = updateOrAddItemWithProperties;