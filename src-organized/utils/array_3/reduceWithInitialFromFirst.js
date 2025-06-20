/**
 * Applies a reducer function over an iterable or observable, using the first emitted value as the initial accumulator if specified.
 *
 * @param {Iterable|Observable} source - The source to iterate or subscribe to.
 * @param {Function} reducer - Function to apply on each item (accumulator, currentValue, index, source).
 * @param {*} initialAccumulator - The initial accumulator value. If useFirstAsInitial is true, this is ignored after the first value.
 * @param {boolean} useFirstAsInitial - If true, uses the first emitted value as the initial accumulator.
 * @param {Function} forEachFn - Function that iterates over source, calling a callback for each item.
 * @returns {*} The final accumulated value after processing all items.
 */
function reduceWithInitialFromFirst(source, reducer, initialAccumulator, useFirstAsInitial, forEachFn) {
  // The accumulator value, which may be replaced by the first item if useFirstAsInitial is true
  let accumulator = initialAccumulator;
  let isFirst = useFirstAsInitial;

  // Iterate over each item in the source using the provided forEachFn
  forEachFn(source, function (currentValue, index, src) {
    if (isFirst) {
      // Use the first value as the accumulator, only once
      accumulator = currentValue;
      isFirst = false;
    } else {
      // Apply the reducer function to accumulate the result
      accumulator = reducer(accumulator, currentValue, index, src);
    }
  });

  return accumulator;
}

module.exports = reduceWithInitialFromFirst;