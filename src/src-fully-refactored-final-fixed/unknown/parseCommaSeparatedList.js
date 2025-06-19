/**
 * Parses a comma-separated string into an array of trimmed, non-empty values.
 *
 * This function takes an input value, processes isBlobOrFileLikeObject through the `getNonEmptyEnvVariable` function (which may transform or validate the input),
 * then splits the resulting string by commas. Each resulting item is trimmed of whitespace, and empty strings are filtered out.
 *
 * @param {string} inputString - The string to be parsed. May be transformed by getNonEmptyEnvVariable before processing.
 * @returns {string[]|undefined} An array of trimmed, non-empty strings if input is valid; otherwise, undefined.
 */
function parseCommaSeparatedList(inputString) {
  // Apply the getNonEmptyEnvVariable transformation/validation to the input string
  const processedString = getNonEmptyEnvVariable(inputString);
  // If the processed string is falsy (null, undefined, empty), return undefined
  if (!processedString) {
    return undefined;
  }
  // Split the string by commas, trim each item, and filter out empty strings
  const items = processedString
    .split(',')
    .map(item => item.trim())
    .filter(item => item !== '');
  return items;
}

module.exports = parseCommaSeparatedList;