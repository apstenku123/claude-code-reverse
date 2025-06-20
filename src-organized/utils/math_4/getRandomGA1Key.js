/**
 * Generates a random 32-byte buffer using GA1'createInteractionAccessor randomBytes method,
 * then processes isBlobOrFileLikeObject with the r1A function to produce a GA1 key.
 *
 * @returns {string} The processed GA1 key as a string.
 */
function getRandomGA1Key() {
  // Generate 32 random bytes using GA1'createInteractionAccessor randomBytes method
  const randomBytesBuffer = GA1.randomBytes(32);

  // Process the random bytes buffer using r1A to obtain the GA1 key
  const ga1Key = r1A(randomBytesBuffer);

  return ga1Key;
}

module.exports = getRandomGA1Key;