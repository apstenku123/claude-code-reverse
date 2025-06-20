/**
 * Parses a colon-separated string, processes each entry with jB6, and flattens the result into a single array.
 *
 * @param {string} colonSeparatedEntries - a string containing entries separated by colons (":").
 * @returns {Array<any>} a flattened array resulting from processing each entry with jB6.
 */
function parseAndFlattenColonSeparatedEntries(colonSeparatedEntries) {
  // Return an empty array if the input string is empty
  if (colonSeparatedEntries === "") return [];

  // Split the input string by colon and process each entry with jB6
  const processedEntries = colonSeparatedEntries.split(":").map(entry => jB6(entry));

  // Flatten the array of arrays into a single array and return
  return [].concat(...processedEntries);
}

module.exports = parseAndFlattenColonSeparatedEntries;