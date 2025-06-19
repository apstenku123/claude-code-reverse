/**
 * Creates a filter function that checks if a given string ends with a specified suffix (case-insensitive),
 * based on a provided observable or predicate function. If no suffix is provided, returns the base predicate.
 *
 * @param {Function} basePredicate - The base predicate or observable function to be wrapped.
 * @param {string} [suffix=""] - The suffix to check for at the end of the input string (case-insensitive).
 * @returns {Function} a function that takes a string input and returns true if the base predicate passes and the input ends with the suffix.
 */
const createCaseInsensitiveEndsWithFilter = (basePredicate, suffix = "") => {
  // Wrap the basePredicate with createLengthAndPrefixValidator(external dependency)
  const wrappedPredicate = createLengthAndPrefixValidator([basePredicate]);

  // If no suffix is provided, return the wrapped predicate as-is
  if (!suffix) {
    return wrappedPredicate;
  }

  // Normalize the suffix to lowercase for case-insensitive comparison
  const normalizedSuffix = suffix.toLowerCase();

  // Return a new function that checks both the base predicate and the suffix match
  return (input) => {
    // Ensure the base predicate passes and the input ends with the normalized suffix
    return wrappedPredicate(input) && input.toLowerCase().endsWith(normalizedSuffix);
  };
};

module.exports = createCaseInsensitiveEndsWithFilter;