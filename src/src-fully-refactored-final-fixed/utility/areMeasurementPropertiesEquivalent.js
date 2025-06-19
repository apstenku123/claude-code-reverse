/**
 * Determines if two measurement property objects are equivalent.
 *
 * Compares the 'name' property case-insensitively, and checks for strict equality
 * of 'unit', 'type', and 'valueType' properties.
 *
 * @param {Object} firstMeasurement - The first measurement property object to compare.
 * @param {Object} secondMeasurement - The second measurement property object to compare.
 * @returns {boolean} True if all compared properties are equivalent, false otherwise.
 */
function areMeasurementPropertiesEquivalent(firstMeasurement, secondMeasurement) {
  // Compare 'name' properties case-insensitively using external utility
  const isNameEqual = at4.equalsCaseInsensitive(firstMeasurement.name, secondMeasurement.name);
  // Compare 'unit', 'type', and 'valueType' properties for strict equality
  const isUnitEqual = firstMeasurement.unit === secondMeasurement.unit;
  const isTypeEqual = firstMeasurement.type === secondMeasurement.type;
  const isValueTypeEqual = firstMeasurement.valueType === secondMeasurement.valueType;

  // All properties must match for the measurements to be considered equivalent
  return isNameEqual && isUnitEqual && isTypeEqual && isValueTypeEqual;
}

module.exports = areMeasurementPropertiesEquivalent;