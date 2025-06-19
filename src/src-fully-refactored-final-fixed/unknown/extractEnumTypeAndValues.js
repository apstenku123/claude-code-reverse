/**
 * Extracts the type (string, number, or both) and the enum values from an object'createInteractionAccessor values property.
 *
 * @param {Object} options - The source object containing a 'values' property (an object mapping keys to values).
 * @returns {{ type: string | string[], enum: any[] }} An object with the detected type ("string", "number", or ["string", "number"]) and the enum values.
 */
function extractEnumTypeAndValues(options) {
  const enumValuesObject = options.values;

  // Get all keys from the values object where the value is NOT a number (i.e., skip numeric keys)
  const enumValues = Object.keys(enumValuesObject)
    .filter(key => typeof enumValuesObject[enumValuesObject[key]] !== "number")
    .map(key => enumValuesObject[key]);

  // Determine the unique types of the enum values (e.g., ["string"], ["number"], or ["string", "number"])
  const uniqueTypes = Array.from(new Set(enumValues.map(value => typeof value)));

  // Decide the type property: if all values are strings, return "string"; if all numbers, "number"; else both
  let type;
  if (uniqueTypes.length === 1) {
    type = uniqueTypes[0] === "string" ? "string" : "number";
  } else {
    type = ["string", "number"];
  }

  return {
    type,
    enum: enumValues
  };
}

module.exports = extractEnumTypeAndValues;