/**
 * Creates a baggage metadata object from a given string value.
 * If the input is not a string, logs an error and uses an empty string instead.
 *
 * @param {string} metadataValue - The string value to be used as baggage metadata.
 * @returns {object} An object representing the baggage metadata, containing a type symbol and a toString method.
 */
function createBaggageMetadata(metadataValue) {
  // Check if the input is a string; if not, log an error and use an empty string
  if (typeof metadataValue !== "string") {
    Wf4.error(
      `Cannot create baggage metadata from unknown type: ${typeof metadataValue}`
    );
    metadataValue = "";
  }

  return {
    // Attach a unique symbol to identify this as baggage metadata
    __TYPE__: Yf4.baggageEntryMetadataSymbol,
    // Provide a string representation of the metadata
    toString() {
      return metadataValue;
    }
  };
}

module.exports = createBaggageMetadata;