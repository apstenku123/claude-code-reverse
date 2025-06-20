/**
 * Checks if the string representation of an observable matches any pattern from a given list.
 *
 * @param {any} sourceObservable - The observable or value to be checked.
 * @param {string[]} patterns - An array of string patterns to match against the observable'createInteractionAccessor string representation.
 * @returns {boolean} Returns true if patterns is empty or undefined, or if the observable'createInteractionAccessor string representation matches any pattern; otherwise, false.
 */
function doesObservableMatchAnyPattern(sourceObservable, patterns) {
  // If no patterns are provided, always return true
  if (!patterns || !patterns.length) {
    return true;
  }

  // Get the string representation of the observable
  const observableString = extractStackFramesFromEvent(sourceObservable);

  // If the string representation is falsy, return true
  if (!observableString) {
    return true;
  }

  // Check if the string representation matches any of the provided patterns
  return ZI.stringMatchesSomePattern(observableString, patterns);
}

module.exports = doesObservableMatchAnyPattern;