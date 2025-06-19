/**
 * Checks whether the protocols of two URLs are equal.
 *
 * @param {string} firstUrl - The first URL to compare.
 * @param {string} secondUrl - The second URL to compare.
 * @returns {boolean} True if both URLs have the same protocol, false otherwise.
 */
function areProtocolsEqual(firstUrl, secondUrl) {
  // Create a new lt instance for each URL to extract the protocol
  const firstProtocol = new lt(firstUrl).protocol;
  const secondProtocol = new lt(secondUrl).protocol;

  // Compare the protocols for equality
  return firstProtocol === secondProtocol;
}

module.exports = areProtocolsEqual;