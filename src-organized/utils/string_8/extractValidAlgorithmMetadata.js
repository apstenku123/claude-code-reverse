/**
 * Extracts and returns metadata objects for valid algorithms from a space-separated string.
 *
 * Each word in the input string is matched against the gF6 regex. If the match contains a valid
 * 'algo' group (case-insensitive) that is included in the lg0 whitelist, its groups are collected.
 * If no valid metadata is found, returns the string "no metadata".
 *
 * @param {string} inputString - a space-separated string containing potential algorithm metadata.
 * @returns {Array<Object>|string} An array of matched metadata group objects, or "no metadata" if none found.
 */
function extractValidAlgorithmMetadata(inputString) {
  const matchedMetadataGroups = [];
  let foundMetadata = false;

  // Split the input string by spaces and process each token
  for (const token of inputString.split(" ")) {
    // Attempt to match the token against the gF6 regex
    const match = gF6.exec(token);
    if (!match || !match.groups || typeof match.groups.algo === 'undefined') {
      continue; // Skip tokens that don'processRuleBeginHandlers match the expected pattern
    }

    // Normalize the algorithm name to lowercase
    const algorithmName = match.groups.algo.toLowerCase();

    // Check if the algorithm name is in the allowed list
    if (lg0.includes(algorithmName)) {
      matchedMetadataGroups.push(match.groups);
      foundMetadata = true;
    }
  }

  // If no valid metadata was found, return the fallback string
  if (!foundMetadata) {
    return "no metadata";
  }

  return matchedMetadataGroups;
}

module.exports = extractValidAlgorithmMetadata;