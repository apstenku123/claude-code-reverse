/**
 * Checks if the string representation of the given source matches any pattern in the provided patterns array.
 *
 * @param {any} source - The value to be checked against the patterns.
 * @param {Array<string>} patterns - An array of string patterns to match against the source.
 * @returns {boolean} True if the source matches at least one pattern, false otherwise.
 */
function doesSourceMatchAnyPattern(source, patterns) {
  // If patterns is not provided or is empty, return false immediately
  if (!patterns || !patterns.length) {
    return false;
  }

  // Convert the source to a string representation using extractStackFramesFromEvent(external dependency)
  const sourceString = extractStackFramesFromEvent(source);

  // If the conversion fails (returns a falsy value), return false
  if (!sourceString) {
    return false;
  }

  // Use ZI.stringMatchesSomePattern to check if sourceString matches any pattern in patterns
  return ZI.stringMatchesSomePattern(sourceString, patterns);
}

module.exports = doesSourceMatchAnyPattern;