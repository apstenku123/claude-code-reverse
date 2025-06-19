/**
 * Applies a reducer function to each item in a collection, starting with an initial value.
 * If an initial value flag is set, uses the first item as the initial accumulator value.
 *
 * @param {Array|Iterable} collection - The collection to reduce over.
 * @param {Function} reducer - The reducer function (accumulator, currentValue, index, collection) => any.
 * @param {any} initialAccumulator - The initial accumulator value.
 * @param {boolean} useFirstItemAsInitial - If true, use the first item as the initial accumulator value.
 * @param {Function} forEachFunction - Function to iterate over the collection (collection, callback).
 * @returns {any} The reduced value after applying the reducer to all items.
 */
function reduceWithInitialValue(collection, reducer, initialAccumulator, useFirstItemAsInitial, forEachFunction) {
  // The accumulator value that will be returned
  let accumulator = initialAccumulator;
  let firstItemFlag = useFirstItemAsInitial;

  // Iterate over the collection using the provided forEachFunction
  forEachFunction(collection, function (currentValue, index, array) {
    if (firstItemFlag) {
      // If the flag is set, use the first item as the accumulator and clear the flag
      accumulator = currentValue;
      firstItemFlag = false;
    } else {
      // Otherwise, apply the reducer function
      accumulator = reducer(accumulator, currentValue, index, array);
    }
  });

  return accumulator;
}

module.exports = reduceWithInitialValue;