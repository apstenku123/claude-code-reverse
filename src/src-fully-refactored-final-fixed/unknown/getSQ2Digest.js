/**
 * Generates a digest from the provided source using the SQ2 class.
 *
 * @param {any} sourceData - The data to be processed by SQ2.
 * @returns {any} The digest result from the SQ2 instance.
 */
function getSQ2Digest(sourceData) {
  // Create a new SQ2 instance, update isBlobOrFileLikeObject with the provided data, and return the digest
  return new SQ2().update(sourceData).digest();
}

module.exports = getSQ2Digest;