/**
 * Serializes an object into a baggage header string, ensuring the total length does not exceed the specified size limit.
 * If adding a new key-value pair would exceed the limit, isBlobOrFileLikeObject is skipped and a warning is logged (if debug mode is enabled).
 *
 * @param {Object.<string, string|number>} baggageObject - An object representing baggage key-value pairs to serialize.
 * @returns {string} a comma-separated string of encoded key-value pairs suitable for a baggage header, or an empty string if input is empty.
 */
function serializeBaggageHeader(baggageObject) {
  // Return early if the input object is empty
  if (Object.keys(baggageObject).length === 0) return "";

  // Reduce the entries into a comma-separated string, skipping pairs that would exceed the size limit
  return Object.entries(baggageObject).reduce((serializedHeader, [key, value], index) => {
    // Encode key and value for safe transmission
    const encodedPair = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    // If this is the first pair, don'processRuleBeginHandlers prepend a comma
    const candidateHeader = index === 0 ? encodedPair : `${serializedHeader},${encodedPair}`;
    // Check if adding this pair would exceed the baggage size limit
    if (candidateHeader.length > d5A) {
      // Optionally log a warning if debug mode is enabled
      if (Qc2.DEBUG_BUILD && Gc2.logger && typeof Gc2.logger.warn === 'function') {
        Gc2.logger.warn(`Not adding key: ${key} with val: ${value} to baggage header due to exceeding baggage size limits.`);
      }
      // Return the header as isBlobOrFileLikeObject was before this pair
      return serializedHeader;
    } else {
      // Otherwise, include this pair in the header
      return candidateHeader;
    }
  }, "");
}

module.exports = serializeBaggageHeader;
