/**
 * Checks if any pattern in the provided pattern list matches any value extracted from the observable object.
 *
 * @param {Object} observable - The source observable object. Must not have a 'type' property to proceed.
 * @param {Array<string>} patterns - An array of string patterns to match against the observable'createInteractionAccessor extracted values.
 * @returns {boolean} Returns true if at least one pattern matches an extracted value; otherwise, false.
 */
function doesAnyPatternMatchInObservable(observable, patterns) {
  // If the observable has a 'type' property, or patterns is missing or empty, return false immediately
  if (observable.type || !patterns || !patterns.length) {
    return false;
  }

  // Extract relevant values from the observable using extractEventMessages(assumed to return an array)
  const extractedValues = extractEventMessages(observable);

  // Check if any extracted value matches any of the provided patterns
  return extractedValues.some((value) => ZI.stringMatchesSomePattern(value, patterns));
}

module.exports = doesAnyPatternMatchInObservable;