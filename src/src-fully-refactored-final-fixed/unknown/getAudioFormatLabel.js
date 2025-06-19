/**
 * Returns a human-readable label for a given audio format identifier.
 *
 * @param {any} audioFormatId - The identifier to check against known audio formats.
 * @returns {string} The corresponding label for the audio format.
 */
function getAudioFormatLabel(audioFormatId) {
  // Retrieve the getProcessedInteractionEntries object, which contains known audio format identifiers
  const audioFormats = getProcessedInteractionEntries();

  // Check if the identifier matches the 'opus40' format
  if (audioFormatId === audioFormats.opus40) {
    return "Opus 4";
  }

  // Check if the identifier matches the 'sonnet40' format
  if (audioFormatId === audioFormats.sonnet40) {
    return "Sonnet 4";
  }

  // Default label if no known format matches
  return "Sonnet 3.7";
}

module.exports = getAudioFormatLabel;
