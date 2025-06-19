/**
 * Converts a primitive value (undefined, string, number, boolean, or null) to a stylized string representation.
 *
 * @param {Object} stylizer - An object with a stylize method for formatting output.
 * @param {*} value - The value to stringify and stylize.
 * @returns {string} The stylized string representation of the value.
 */
function stringifyPrimitiveValue(stylizer, value) {
  // Check if value is undefined
  if (E1(value)) {
    return stylizer.stylize("undefined", "undefined");
  }

  // Check if value is a string
  if (invokeHandlerWithArguments(value)) {
    // Safely stringify the string, escaping single quotes and handling double quotes
    const jsonString = JSON.stringify(value)
      .replace(/^"|"$/g, "") // Remove surrounding double quotes
      .replace(/'/g, "\\'") // Escape single quotes
      .replace(/\"/g, '"'); // Unescape double quotes
    const quotedString = `'${jsonString}'`;
    return stylizer.stylize(quotedString, "string");
  }

  // Check if value is a number
  if (I1(value)) {
    return stylizer.stylize(String(value), "number");
  }

  // Check if value is a boolean
  if (b(value)) {
    return stylizer.stylize(String(value), "boolean");
  }

  // Check if value is null
  if (a(value)) {
    return stylizer.stylize("null", "null");
  }
}

module.exports = stringifyPrimitiveValue;