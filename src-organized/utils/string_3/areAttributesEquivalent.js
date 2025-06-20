/**
 * Determines if two attribute objects are equivalent by comparing their name (case-insensitive), unit, type, and valueType.
 *
 * @param {Object} firstAttribute - The first attribute object to compare.
 * @param {string} firstAttribute.name - The name of the attribute.
 * @param {string} firstAttribute.unit - The unit of the attribute.
 * @param {string} firstAttribute.type - The type of the attribute.
 * @param {string} firstAttribute.valueType - The value type of the attribute.
 * @param {Object} secondAttribute - The second attribute object to compare.
 * @param {string} secondAttribute.name - The name of the attribute.
 * @param {string} secondAttribute.unit - The unit of the attribute.
 * @param {string} secondAttribute.type - The type of the attribute.
 * @param {string} secondAttribute.valueType - The value type of the attribute.
 * @returns {boolean} True if both attributes are equivalent; otherwise, false.
 */
function areAttributesEquivalent(firstAttribute, secondAttribute) {
  // Compare names case-insensitively using external utility
  const isNameEqual = at4.equalsCaseInsensitive(firstAttribute.name, secondAttribute.name);

  // Compare unit, type, and valueType strictly
  const isUnitEqual = firstAttribute.unit === secondAttribute.unit;
  const isTypeEqual = firstAttribute.type === secondAttribute.type;
  const isValueTypeEqual = firstAttribute.valueType === secondAttribute.valueType;

  // All conditions must be true for attributes to be considered equivalent
  return isNameEqual && isUnitEqual && isTypeEqual && isValueTypeEqual;
}

module.exports = areAttributesEquivalent;