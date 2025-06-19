/**
 * Parses a baggage string into an object of key-value pairs.
 *
 * The function splits the input string using the defined separator, parses each item using the parseBaggageEntry parser,
 * filters out invalid or empty values, and constructs an object mapping keys to their corresponding values.
 *
 * @param {string} baggageString - The string containing baggage items, separated by eS.BAGGAGE_ITEMS_SEPARATOR.
 * @returns {Object} An object mapping baggage item keys to their values. Returns an empty object if input is not a non-empty string.
 */
function parseBaggageItems(baggageString) {
  // Return empty object if input is not a non-empty string
  if (typeof baggageString !== "string" || baggageString.length === 0) {
    return {};
  }

  // Split the string into individual baggage items
  const baggageItems = baggageString.split(eS.BAGGAGE_ITEMS_SEPARATOR);

  // Parse each baggage item, filter out invalid/empty, and reduce to an object
  const baggageObject = baggageItems
    .map(itemString => {
      // Parse the item string into an object with key and value
      return parseBaggageEntry(itemString);
    })
    .filter(parsedItem => {
      // Keep only items that are defined and have a non-empty value
      return parsedItem !== undefined && parsedItem.value.length > 0;
    })
    .reduce((result, parsedItem) => {
      // Add the key-value pair to the result object
      result[parsedItem.key] = parsedItem.value;
      return result;
    }, {});

  return baggageObject;
}

module.exports = parseBaggageItems;