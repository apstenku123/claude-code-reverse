/**
 * Checks if every element in the provided array-like object passes the given predicate function.
 *
 * @param {Array|Object} collection - The array or array-like object to iterate over.
 * @param {Function} predicate - The function invoked per iteration. Receives (element, index, collection).
 * @returns {boolean} Returns true if all elements pass the predicate check, otherwise false.
 */
function everyElementPassesPredicate(collection, predicate) {
  // If collection is null or undefined, treat as empty
  const length = collection == null ? 0 : collection.length;
  // Iterate over each element in the collection
  for (let index = 0; index < length; index++) {
    // If predicate returns false for any element, return false immediately
    if (!predicate(collection[index], index, collection)) {
      return false;
    }
  }
  // All elements passed the predicate
  return true;
}

module.exports = everyElementPassesPredicate;