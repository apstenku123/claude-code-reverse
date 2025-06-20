/**
 * Compares two value objects and determines the first property that differs between them.
 * If a difference is found, delegates to the appropriate handler function for that property.
 * If all compared properties are equal, returns an empty string.
 *
 * @param {Object} firstValueObject - The first value object to compare. Should have properties: valueType, unit, type, description.
 * @param {Object} secondValueObject - The second value object to compare. Should have properties: valueType, unit, type, description.
 * @returns {any} The result of the handler function for the first differing property, or an empty string if all properties match.
 */
function compareValueObjects(firstValueObject, secondValueObject) {
  // Compare valueType property first
  if (firstValueObject.valueType !== secondValueObject.valueType) {
    // Delegate to handler for valueType difference
    return getInstrumentValueTypeErrorMessage(firstValueObject, secondValueObject);
  }
  // Compare unit property next
  if (firstValueObject.unit !== secondValueObject.unit) {
    // Delegate to handler for unit difference
    return getUnitUsageErrorMessage(firstValueObject, secondValueObject);
  }
  // Compare type property next
  if (firstValueObject.type !== secondValueObject.type) {
    // Delegate to handler for type difference
    return generateViewCreationInstruction(firstValueObject, secondValueObject);
  }
  // Compare description property last
  if (firstValueObject.description !== secondValueObject.description) {
    // Delegate to handler for description difference
    return generateViewCreationInstructions(firstValueObject, secondValueObject);
  }
  // All properties are equal
  return "";
}

module.exports = compareValueObjects;