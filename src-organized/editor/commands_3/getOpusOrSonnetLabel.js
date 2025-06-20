/**
 * Returns a human-readable label based on the provided source value.
 *
 * This function compares the given source value to specific properties
 * (opus40 and sonnet40) from the getProcessedInteractionEntries() object, and returns a corresponding
 * label string. If the source value does not match any known property,
 * a default label is returned.
 *
 * @param {any} sourceValue - The value to be checked against getProcessedInteractionEntries().opus40 and getProcessedInteractionEntries().sonnet40.
 * @returns {string} The corresponding label: "Opus 4", "Sonnet 4", or "Sonnet 3.7".
 */
function getOpusOrSonnetLabel(sourceValue) {
  // Retrieve the getProcessedInteractionEntries object once to avoid multiple calls
  const fxObject = getProcessedInteractionEntries();

  // Check if the source value matches opus40
  if (sourceValue === fxObject.opus40) {
    return "Opus 4";
  }

  // Check if the source value matches sonnet40
  if (sourceValue === fxObject.sonnet40) {
    return "Sonnet 4";
  }

  // Default label if no match is found
  return "Sonnet 3.7";
}

module.exports = getOpusOrSonnetLabel;