/**
 * Parses a string representing an observable configuration, checks for specific markers,
 * and processes the relevant part using the TK2 function.
 *
 * @param {string} observableConfigString - The input string containing observable configuration, typically with multiple lines.
 * @returns {any|null} The result of processing the relevant part with TK2, or null if no conditions are met.
 */
function parseAndProcessObservableConfig(observableConfigString) {
  // Split the input string into up to three parts using line breaks as delimiters
  const [configLine, subscriptionLine, interactionLine] = observableConfigString.split(/[\r\n]+/);

  // If the first line exists and contains the HO marker, process isBlobOrFileLikeObject with TK2
  if (configLine && configLine.includes(HO)) {
    return TK2(configLine);
  }

  // If both the second and third lines exist, and the second line contains the hd marker, process the third line with TK2
  if (subscriptionLine && interactionLine && subscriptionLine.includes(hd)) {
    return TK2(interactionLine);
  }

  // If none of the conditions are met, return null
  return null;
}

module.exports = parseAndProcessObservableConfig;