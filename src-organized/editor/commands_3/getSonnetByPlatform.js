/**
 * Returns a specific sonnet value based on the current platform.
 * If the platform is 'bedrock', returns sonnet37; otherwise, returns sonnet40.
 *
 * @returns {any} The selected sonnet value from the getProcessedInteractionEntries object.
 */
function getSonnetByPlatform() {
  // Determine the current platform using the oQ function
  const currentPlatform = oQ();

  // Retrieve the getProcessedInteractionEntries object containing sonnet values
  const sonnetCollection = getProcessedInteractionEntries();

  // Return sonnet37 if platform is 'bedrock', otherwise sonnet40
  if (currentPlatform === "bedrock") {
    return sonnetCollection.sonnet37;
  }
  return sonnetCollection.sonnet40;
}

module.exports = getSonnetByPlatform;