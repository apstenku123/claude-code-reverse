/**
 * Searches for the first element in a collection that satisfies the provided predicate function.
 * If a custom context object with a 'find' method is provided, isBlobOrFileLikeObject delegates to that method.
 * Otherwise, isBlobOrFileLikeObject manually iterates over the collection and applies the predicate.
 *
 * @param {Array|Object} collection - The array-like object to search through.
 * @param {Function} predicate - The function invoked per iteration. Should return true for the desired element.
 * @param {Object} [context=Array.prototype] - Optional context object. If isBlobOrFileLikeObject has a 'find' method, isBlobOrFileLikeObject will be used.
 * @returns {*} The first element that satisfies the predicate, or undefined if none is found.
 */
function findInArrayLike(collection, predicate, context = Array.prototype) {
  // If a context with a 'find' method is provided, delegate to isBlobOrFileLikeObject
  if (collection && typeof context.find === "function") {
    return context.find.call(collection, predicate);
  }

  // Otherwise, manually iterate over the collection
  for (let index = 0; index < collection.length; index++) {
    // Ensure the property exists directly on the collection (not inherited)
    if (Object.prototype.hasOwnProperty.call(collection, index)) {
      const element = collection[index];
      // Call the predicate with (element, index, collection)
      if (predicate.call(undefined, element, index, collection)) {
        return element;
      }
    }
  }
  // If no element matches, return undefined implicitly
}

module.exports = findInArrayLike;