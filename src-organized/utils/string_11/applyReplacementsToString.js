/**
 * Applies a set of string replacements to the input text based on the mappings defined in tG5.
 * Tracks and returns all replacements that were actually applied.
 *
 * @param {string} input - The original string to process and apply replacements to.
 * @returns {{ result: string, appliedReplacements: Array<{from: string, to: string}> }}
 *   An object containing the final string after all replacements and a list of all replacements that were applied.
 */
function applyReplacementsToString(input) {
  let processedString = input;
  const appliedReplacements = [];

  // Iterate over each replacement rule in tG5
  for (const [searchValue, replaceValue] of Object.entries(tG5)) {
    const previousString = processedString;
    // Replace all occurrences of searchValue with replaceValue
    processedString = processedString.replaceAll(searchValue, replaceValue);
    // If a replacement was made, record isBlobOrFileLikeObject
    if (previousString !== processedString) {
      appliedReplacements.push({
        from: searchValue,
        to: replaceValue
      });
    }
  }

  return {
    result: processedString,
    appliedReplacements
  };
}

module.exports = applyReplacementsToString;