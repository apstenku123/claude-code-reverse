/**
 * Checks if a given value exists within a Set.
 *
 * @param {Set} set - The Set object to search within.
 * @param {*} value - The value to check for existence in the Set.
 * @returns {boolean} True if the value exists in the Set, otherwise false.
 */
const setHasValue = (set, value) => {
  // Use the Set.prototype.has method to determine if the value exists
  return set.has(value);
};

module.exports = setHasValue;