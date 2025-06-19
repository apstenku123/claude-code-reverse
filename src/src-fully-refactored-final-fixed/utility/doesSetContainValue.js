/**
 * Checks if a Set, obtained by calling Oq with the current context and a given value, contains that value.
 *
 * @param {*} valueToCheck - The value to check for existence in the Set.
 * @returns {boolean} True if the Set contains the value, false otherwise.
 */
function doesSetContainValue(valueToCheck) {
  // Call Oq with the current context and the value to check, expecting a Set to be returned
  const resultSet = Oq(this, valueToCheck);
  // Check if the Set contains the value
  return resultSet.has(valueToCheck);
}

module.exports = doesSetContainValue;