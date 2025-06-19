/**
 * Checks if a given collection contains a specific element.
 *
 * @param {Set|Map|WeakSet|WeakMap} collection - The collection to check for the presence of the element.
 * @param {*} element - The element to check for in the collection.
 * @returns {boolean} True if the collection contains the element, false otherwise.
 */
function doesCollectionContainElement(collection, element) {
  // Use the 'has' method to determine if the element exists in the collection
  return collection.has(element);
}

module.exports = doesCollectionContainElement;