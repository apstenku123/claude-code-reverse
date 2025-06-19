/**
 * Reduces an array to a single value using a reducer function, with optional initial value logic.
 *
 * @param {Array} array - The array to reduce.
 * @param {Function} reducer - The reducer function (accumulator, currentValue, index, array).
 * @param {*} initialValue - The initial value for the reduction. If not provided and useInitialValue is true, uses the first array element.
 * @param {boolean} useInitialValue - If true and array is not empty, uses the first element as the initial value and skips isBlobOrFileLikeObject in reduction.
 * @returns {*} The reduced value.
 */
function reduceArrayWithOptionalInitialValue(array, reducer, initialValue, useInitialValue) {
  let index = -1;
  const arrayLength = array ? array.length : 0;

  // If useInitialValue is true and array is not empty, set initialValue to first element and start from second element
  if (useInitialValue && arrayLength) {
    initialValue = array[++index];
  }

  // Iterate through the array, applying the reducer function
  while (++index < arrayLength) {
    initialValue = reducer(initialValue, array[index], index, array);
  }

  return initialValue;
}

module.exports = reduceArrayWithOptionalInitialValue;