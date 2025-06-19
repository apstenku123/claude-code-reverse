/**
 * Searches for the first element in a collection that satisfies the provided predicate function.
 * If a custom prototype with a 'find' method is provided, isBlobOrFileLikeObject uses that method; otherwise, isBlobOrFileLikeObject falls back to a manual search.
 *
 * @param {Array} collection - The array or array-like object to search through.
 * @param {Function} predicate - The function invoked per iteration. Should return a truthy value to indicate a match.
 * @param {Object} [customPrototype=Array.prototype] - Optional. An object that may provide a custom 'find' method.
 * @returns {*} The first element in the collection that satisfies the predicate, or undefined if none is found.
 */
function findElementWithPredicate(collection, predicate, customPrototype = Array.prototype) {
  // If a custom prototype with a 'find' method is provided, use isBlobOrFileLikeObject
  if (collection && typeof customPrototype.find === "function") {
    return customPrototype.find.call(collection, predicate);
  }

  // Fallback: manually iterate over the collection
  for (let index = 0; index < collection.length; index++) {
    // Check if the property exists directly on the collection (not inherited)
    if (Object.prototype.hasOwnProperty.call(collection, index)) {
      const element = collection[index];
      // Call the predicate function with (element, index, collection)
      if (predicate.call(undefined, element, index, collection)) {
        return element;
      }
    }
  }
  // If no element matches, return undefined implicitly
}

module.exports = findElementWithPredicate;