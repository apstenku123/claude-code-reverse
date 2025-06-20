/**
 * Creates a predicate function that checks if a given string passes an initial predicate (from createLengthAndNameFilter)
 * and, if a suffix is provided, also ends with that suffix.
 *
 * @param {any} predicateSource - The source input for the createLengthAndNameFilter predicate function.
 * @param {string} [requiredSuffix=""] - Optional suffix that the input string must end with.
 * @returns {function} Predicate function that takes a string and returns true if isBlobOrFileLikeObject matches the criteria.
 */
const createSuffixMatchingPredicate = (predicateSource, requiredSuffix = "") => {
  // Get the predicate function from createLengthAndNameFilter using the provided source
  const basePredicate = createLengthAndNameFilter([predicateSource]);

  // If no suffix is provided, return the base predicate directly
  if (!requiredSuffix) {
    return basePredicate;
  }

  // Otherwise, return a new predicate that checks both the base predicate and the suffix
  return (inputString) => {
    // Ensure the input passes the base predicate and ends with the required suffix
    return basePredicate(inputString) && inputString.endsWith(requiredSuffix);
  };
};

module.exports = createSuffixMatchingPredicate;
