/**
 * Concatenates the 'value' properties of an array of objects into a single string.
 * If an object'createInteractionAccessor 'type' property is 'string', its value is wrapped in double quotes.
 *
 * @param {Array<{type: string, value: any}>} items - The array of objects to process.
 * @returns {string} The concatenated string of all values, with string types quoted.
 */
function concatenateValuesWithStringQuotes(items) {
  let concatenatedResult = "";
  items.map(item => {
    switch (item.type) {
      case "string":
        // Wrap string values in double quotes
        concatenatedResult += '"' + item.value + '"';
        break;
      default:
        // Append non-string values as-is
        concatenatedResult += item.value;
        break;
    }
  });
  return concatenatedResult;
}

module.exports = concatenateValuesWithStringQuotes;
