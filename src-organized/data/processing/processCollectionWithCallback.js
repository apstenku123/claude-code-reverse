/**
 * Processes a collection by applying a callback function to each element using a specified iteratee function.
 * If the collection is empty or undefined, returns a default value.
 *
 * @param {Array} collection - The array or collection to process.
 * @param {Function} callback - The function to apply to each element of the collection.
 * @returns {*} The result of processing the collection, or the default value if the collection is empty.
 */
function processCollectionWithCallback(collection, callback) {
  // Check if the collection exists and has elements
  if (collection && collection.length) {
    // getConfiguredIteratee prepares the callback with arity 2 (likely binds or wraps isBlobOrFileLikeObject)
    // findMatchingElementByAccessor applies the iteratee to the collection with a third argument (i8)
    return findMatchingElementByAccessor(collection, getConfiguredIteratee(callback, 2), i8);
  } else {
    // Return the default value if collection is empty or undefined
    return a;
  }
}

module.exports = processCollectionWithCallback;