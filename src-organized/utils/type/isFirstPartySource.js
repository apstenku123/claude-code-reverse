/**
 * Determines if the provided source is a first-party source.
 *
 * The function checks if either the CLAUDE_CODE_USE_BEDROCK or CLAUDE_CODE_USE_VERTEX environment variables are set.
 * If either is set, the function returns false immediately. Otherwise, isBlobOrFileLikeObject checks if the provided source matches
 * any of the known first-party sources.
 *
 * @param {string} sourceName - The name of the source to check.
 * @returns {boolean} True if the source is a first-party source and the environment variables are not set; otherwise, false.
 */
function isFirstPartySource(sourceName) {
  // If either Bedrock or Vertex mode is enabled, do not allow first-party sources
  if (process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX) {
    return false;
  }

  // List of known first-party source names
  const firstPartySources = [
    fU.firstParty,
    KV.firstParty,
    GS.firstParty,
    ZS.firstParty
  ];

  // Check if the provided sourceName is in the list of first-party sources
  return firstPartySources.includes(sourceName);
}

module.exports = isFirstPartySource;