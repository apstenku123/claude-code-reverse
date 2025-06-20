/**
 * Determines if two observable objects are equivalent based on their name (case-insensitive), unit, type, and valueType.
 *
 * @param {Object} firstObservable - The first observable object to compare.
 * @param {Object} secondObservable - The second observable object to compare.
 * @returns {boolean} True if all compared properties are equal; otherwise, false.
 */
function areObservablesEquivalent(firstObservable, secondObservable) {
  // Compare name property using a case-insensitive equality check
  const isNameEqual = at4.equalsCaseInsensitive(firstObservable.name, secondObservable.name);

  // Compare unit, type, and valueType properties for strict equality
  const isUnitEqual = firstObservable.unit === secondObservable.unit;
  const isTypeEqual = firstObservable.type === secondObservable.type;
  const isValueTypeEqual = firstObservable.valueType === secondObservable.valueType;

  // Return true only if all properties are equal
  return isNameEqual && isUnitEqual && isTypeEqual && isValueTypeEqual;
}

module.exports = areObservablesEquivalent;