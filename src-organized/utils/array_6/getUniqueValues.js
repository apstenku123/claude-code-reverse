/**
 * Returns a new array containing unique values from the input array, with optional transformation and comparison logic.
 *
 * Handles large arrays efficiently, supports custom iteratee and comparator functions, and preserves zero values.
 *
 * @param {Array} inputArray - The array to process for unique values.
 * @param {Function} [iteratee] - Optional function to transform each element before comparison.
 * @param {Function} [comparator] - Optional function to compare values for uniqueness.
 * @returns {Array} Array of unique values from the input array.
 */
function getUniqueValues(inputArray, iteratee, comparator) {
  let index = -1;
  let includes = defaultIncludes;
  const arrayLength = inputArray.length;
  let isCommon = true;
  const result = [];
  let seen = result;

  // If a comparator is provided, use a specialized includes function
  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWithComparator;
  } else if (arrayLength >= LARGE_ARRAY_SIZE) {
    // For large arrays, try to use a Set for performance
    const set = iteratee ? null : createSet(inputArray);
    if (set) return convertSetToArray(set);
    isCommon = false;
    includes = arrayIncludes;
    seen = new SetCache();
  } else {
    // For small arrays, use a new array if iteratee is provided
    seen = iteratee ? [] : result;
  }

  // Main loop: iterate over inputArray
  outer: while (++index < arrayLength) {
    let value = inputArray[index];
    // Apply iteratee if provided, otherwise use the value itself
    const computed = iteratee ? iteratee(value) : value;
    // Ensure 0 is preserved (handles -0 and +0)
    value = comparator || value !== 0 ? value : 0;

    if (isCommon && computed === computed) { // Exclude NaN
      let seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) continue outer;
      }
      if (iteratee) seen.push(computed);
      result.push(value);
    } else if (!includes(seen, computed, comparator)) {
      if (seen !== result) seen.push(computed);
      result.push(value);
    }
  }

  return result;
}

// --- Helper functions and constants ---

/**
 * Default includes function for arrays (strict equality).
 */
function defaultIncludes(array, value) {
  return array.indexOf(value) > -1;
}

/**
 * Includes function for arrays with a comparator.
 */
function arrayIncludesWithComparator(array, value, comparator) {
  for (let i = 0, len = array.length; i < len; i++) {
    if (comparator(value, array[i])) return true;
  }
  return false;
}

/**
 * Includes function for arrays (strict equality, used for large arrays).
 */
function arrayIncludes(array, value) {
  return array.indexOf(value) > -1;
}

/**
 * Converts a Set to an array.
 */
function convertSetToArray(set) {
  return Array.from(set);
}

/**
 * Creates a Set from an array, returns null if not supported.
 */
function createSet(array) {
  try {
    return new Set(array);
  } catch (e) {
    return null;
  }
}

/**
 * Simple SetCache implementation for storing seen values.
 */
function SetCache() {
  this.__data__ = [];
}
SetCache.prototype.push = function(value) {
  this.__data__.push(value);
};
SetCache.prototype.length = 0;
SetCache.prototype[Symbol.iterator] = function* () {
  yield* this.__data__;
};

// Constant for large array optimization threshold
const LARGE_ARRAY_SIZE = typeof Cg2 !== 'undefined' ? Cg2 : 200;

// Export the function
module.exports = getUniqueValues;
