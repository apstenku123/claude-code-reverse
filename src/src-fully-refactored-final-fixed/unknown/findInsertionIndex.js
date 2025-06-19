/**
 * Determines the index at which a given value should be inserted into a sorted array to maintain sort order.
 * Handles special cases for NaN, null, undefined, and custom comparison logic.
 *
 * @param {Array} array - The sorted array to search.
 * @param {*} value - The value to evaluate for insertion.
 * @param {Function} iteratee - Function to transform array values and the target value for comparison.
 * @param {boolean} [retHighest=false] - If true, returns the highest qualified index; otherwise, the lowest.
 * @returns {number} The index at which the value should be inserted.
 */
function findInsertionIndex(array, value, iteratee, retHighest = false) {
  let low = 0;
  const highInitial = array == null ? 0 : array.length;
  let high = highInitial;
  if (high === 0) return 0;

  // Transform the value for comparison
  const transformedValue = iteratee(value);

  // Special value checks
  const isValueNaN = transformedValue !== transformedValue;
  const isValueNull = transformedValue === null;
  const isValueSymbol = O7(transformedValue); // O7: checks if value is a Symbol
  const isValueUndefined = transformedValue === a; // a: external undefined-like value

  while (low < high) {
    // Find midpoint
    const mid = FJ((low + high) / 2); // FJ: floor function
    const midTransformed = iteratee(array[mid]);

    // Special checks for mid value
    const isMidDefined = midTransformed !== a;
    const isMidNull = midTransformed === null;
    const isMidReflexive = midTransformed === midTransformed;
    const isMidSymbol = O7(midTransformed);

    let shouldMoveLow;
    // Handle all special cases for comparison
    if (isValueNaN) {
      // NaN is always greater than any number except itself
      shouldMoveLow = retHighest || isMidReflexive;
    } else if (isValueUndefined) {
      // undefined is considered greater than any defined value
      shouldMoveLow = isMidReflexive && (retHighest || isMidDefined);
    } else if (isValueNull) {
      // null is considered greater than undefined but less than any defined value
      shouldMoveLow = isMidReflexive && isMidDefined && (retHighest || !isMidNull);
    } else if (isValueSymbol) {
      // Symbols are compared after all primitives
      shouldMoveLow = isMidReflexive && isMidDefined && !isMidNull && (retHighest || !isMidSymbol);
    } else if (isMidNull || isMidSymbol) {
      // If mid value is null or symbol, always move high
      shouldMoveLow = false;
    } else {
      // Standard comparison
      shouldMoveLow = retHighest ? midTransformed <= transformedValue : midTransformed < transformedValue;
    }

    if (shouldMoveLow) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return isClassHandleValid(high, mA); // isClassHandleValid: validates the index, mA: context or options
}

module.exports = findInsertionIndex;