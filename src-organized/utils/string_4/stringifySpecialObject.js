/**
 * Converts an input value to a string representation, handling special cases for objects with 'ref' or 'fn' properties.
 *
 * - If the input is not an object or is null, returns the input as-is.
 * - If the object has a 'ref' property, returns a string in the format `$<refValue>`, recursively processing the 'ref' property.
 * - If the object has a 'fn' property, returns a string in the format `<fnName>(<args>)`, recursively processing each argument in the 'argv' array.
 * - Otherwise, returns a pretty-printed JSON string of the object.
 *
 * @param {any} value - The value to convert to a string representation.
 * @returns {string} The stringified representation of the input value.
 */
function stringifySpecialObject(value) {
  // Return primitive values or null as-is
  if (typeof value !== "object" || value === null) {
    return value;
  }

  // Handle objects with a 'ref' property by recursively stringifying the reference
  if ("ref" in value) {
    return `$${stringifySpecialObject(value.ref)}`;
  }

  // Handle objects with a 'fn' property by formatting as a function call with arguments
  if ("fn" in value) {
    const functionName = value.fn;
    const functionArgs = Array.isArray(value.argv) ? value.argv : [];
    const stringifiedArgs = functionArgs.map(stringifySpecialObject).join(", ");
    return `${functionName}(${stringifiedArgs})`;
  }

  // For all other objects, return a pretty-printed JSON string
  return JSON.stringify(value, null, 2);
}

module.exports = stringifySpecialObject;