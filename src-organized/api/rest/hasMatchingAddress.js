/**
 * Checks if any address in the given source object matches the target endpoint.
 *
 * Iterates through all addresses in the source object'createInteractionAccessor `addresses` array and uses
 * the `areEndpointsEquivalent` function to determine if any address is equivalent
 * to the provided target endpoint. Returns true on the first match, otherwise false.
 *
 * @param {Object} sourceObject - The object containing an array of address endpoints under the `addresses` property.
 * @param {Object} targetEndpoint - The endpoint object to compare against each address.
 * @returns {boolean} True if any address matches the target endpoint; otherwise, false.
 */
function hasMatchingAddress(sourceObject, targetEndpoint) {
  // Iterate through each address in the source object'createInteractionAccessor addresses array
  for (const address of sourceObject.addresses) {
    // Use areEndpointsEquivalent to check for a match
    if (areEndpointsEquivalent(address, targetEndpoint)) {
      return true; // Return true immediately on first match
    }
  }
  // No matches found
  return false;
}

module.exports = hasMatchingAddress;