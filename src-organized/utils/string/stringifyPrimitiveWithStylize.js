/**
 * Converts a primitive value (undefined, string, number, boolean, or null) to a stylized string representation.
 * Uses the provided stylize function to format the output according to the value type.
 *
 * @param {object} stylizer - An object with a stylize method for formatting output strings by type.
 * @param {*} value - The value to stringify and stylize. Only primitive types are handled.
 * @returns {string|undefined} The stylized string representation of the value, or undefined if the value is not a handled primitive.
 */
function stringifyPrimitiveWithStylize(stylizer, value) {
  // Check for undefined
  if (E1(value)) {
    return stylizer.stylize("undefined", "undefined");
  }

  // Check for string
  if (invokeHandlerWithArguments(value)) {
    // Safely stringify the string, escaping single quotes and unescaping double quotes
    const jsonString = JSON.stringify(value)
      .replace(/^"|"$/g, "") // Remove surrounding double quotes
      .replace(/'/g, "\\'")  // Escape single quotes
      .replace(/\"/g, '"'); // Unescape double quotes
    const quotedString = `'${jsonString}'`;
    return stylizer.stylize(quotedString, "string");
  }

  // Check for number
  if (I1(value)) {
    return stylizer.stylize(String(value), "number");
  }

  // Check for boolean
  if (b(value)) {
    return stylizer.stylize(String(value), "boolean");
  }

  // Check for null
  if (a(value)) {
    return stylizer.stylize("null", "null");
  }
}

module.exports = stringifyPrimitiveWithStylize;