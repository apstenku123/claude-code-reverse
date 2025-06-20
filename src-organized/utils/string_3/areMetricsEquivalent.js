/**
 * Determines if two metric objects are equivalent by comparing their name (case-insensitive), unit, type, and valueType.
 *
 * @param {Object} metricA - The first metric object to compare.
 * @param {string} metricA.name - The name of the first metric.
 * @param {string} metricA.unit - The unit of the first metric.
 * @param {string} metricA.type - The type of the first metric.
 * @param {string} metricA.valueType - The value type of the first metric.
 * @param {Object} metricB - The second metric object to compare.
 * @param {string} metricB.name - The name of the second metric.
 * @param {string} metricB.unit - The unit of the second metric.
 * @param {string} metricB.type - The type of the second metric.
 * @param {string} metricB.valueType - The value type of the second metric.
 * @returns {boolean} Returns true if all compared properties are equal (name is compared case-insensitively), otherwise false.
 */
function areMetricsEquivalent(metricA, metricB) {
  // Compare metric names case-insensitively using external utility
  const isNameEqual = at4.equalsCaseInsensitive(metricA.name, metricB.name);

  // Compare unit, type, and valueType for strict equality
  const isUnitEqual = metricA.unit === metricB.unit;
  const isTypeEqual = metricA.type === metricB.type;
  const isValueTypeEqual = metricA.valueType === metricB.valueType;

  // Return true only if all properties match
  return isNameEqual && isUnitEqual && isTypeEqual && isValueTypeEqual;
}

module.exports = areMetricsEquivalent;
