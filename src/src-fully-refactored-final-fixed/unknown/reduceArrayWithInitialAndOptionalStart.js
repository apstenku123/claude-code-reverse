/**
 * Reduces an array to a single value using a reducer function, with support for an optional initial value and optional starting logic.
 *
 * @param {Array} array - The array to reduce.
 * @param {Function} reducer - The function to execute on each element in the array. Receives (accumulator, currentValue, currentIndex, array).
 * @param {*} initialValue - The initial value to use as the first argument to the first call of the reducer. If not provided, the first element of the array is used.
 * @param {boolean} useInitialValue - If true and the array is not empty, the initial value is used as the accumulator for the first iteration; otherwise, the first array element is used.
 * @returns {*} The single value that results from the reduction.
 */
function reduceArrayWithInitialAndOptionalStart(array, reducer, initialValue, useInitialValue) {
  let currentIndex = -1;
  const arrayLength = array ? array.length : 0;

  // If useInitialValue is true and array is not empty, start with initialValue as accumulator
  if (useInitialValue && arrayLength) {
    initialValue = array[++currentIndex];
  }

  // Iterate through the array, applying the reducer
  while (++currentIndex < arrayLength) {
    initialValue = reducer(initialValue, array[currentIndex], currentIndex, array);
  }

  return initialValue;
}

module.exports = reduceArrayWithInitialAndOptionalStart;